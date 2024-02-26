import React, { useState } from "react";
import { Modal, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./styles";
import MapView, { Marker } from "react-native-maps";
import { textInput as TextInput } from "../../TextInput";
import { MaterialCommunityIcons } from "../../../Assets/icon";
import TextTicker from 'react-native-text-ticker'
import color from "../../../Assets/color";

const inforModal = ({
    address,
    name,
    phone,
    visible,
    onHide,
    title,
    latitude,
    longitude,
    calculateDelta,
    region
}) => {
    const [homeNumber, setHomeNumber] = useState('')
    const [userName, setName] = useState(name)
    const [phoneNumber, setPhone] = useState(phone)
    const [note, setNote] = useState('')
    const [save, setSave] = useState(false)
    const onChangeHomeNumber = (input) => {
        setHomeNumber(input)
    }
    const onChangeName = (input) => {
        setName(input)
    }
    const onChangePhone = (input) => {
        setPhone(input)
    }
    const onChangeNote = (input) => {
        setNote(input)
    }
    const handleSavedLocate = () => {
        setSave(!save)
    }

    console.log('lang: ', latitude)
    console.log('name: ', name)

    const validate = userName.length > 0 && phoneNumber.length > 0

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modal}>
                <View style={styles.map}>
                    {latitude && longitude && (
                        <MapView
                            style={{ flex: 1 }}
                            initialRegion={{
                                latitude,
                                longitude,
                                ...calculateDelta(),
                            }}
                            region={region}
                        >
                            <Marker coordinate={{ latitude, longitude }} />
                        </MapView>
                    )}
                </View>
                <Text style={styles.message}>Thông tin {title}</Text>

                <View style={styles.body}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.label_title} >Địa chỉ</Text>
                        <View style={styles.message_body}>
                            <TextTicker
                                style={{ fontSize: 16 }}
                                duration={8000}
                                animationType="scroll"
                                repeatSpacer={100}
                                marqueeDelay={3000}
                            >
                                {address}
                            </TextTicker>
                        </View>
                        <TextInput
                            label={'Số tầng, số nhà'}
                            placeholder={'Thêm số tầng hoặc số căn hộ'}
                            star={''}
                            keyboardType={'default'}
                            value={homeNumber}
                            onChangeText={onChangeHomeNumber} />
                        <TextInput
                            label={'Tên người liên lạc'}
                            placeholder={'Tên'}
                            star={'*'}
                            keyboardType={'default'}
                            value={userName}
                            onChangeText={onChangeName} />
                        <TextInput
                            label={'Số điện thoại'}
                            placeholder={'Số điện thoại'}
                            star={'*'}
                            keyboardType={'numeric'}
                            value={phoneNumber}
                            onChangeText={onChangePhone} />
                        <TextInput
                            label={'Ghi chú cho tài xế'}
                            placeholder={'Ghi chú cho tài xế'}
                            star={''}
                            keyboardType={'default'}
                            value={note}
                            onChangeText={onChangeNote} />

                        <View style={styles.save}>
                            <View>
                                <Text style={styles.saveTitle}>Lưu địa điểm này</Text>
                                <Text style={{ fontSize: 13 }}>Lưu thông tin người nhận cho các lần giao hàng sau</Text>
                            </View>
                            <TouchableOpacity onPress={handleSavedLocate}>
                                <MaterialCommunityIcons
                                    name={save ? 'checkbox-marked' : 'checkbox-blank-outline'}
                                    size={25}
                                    color={save ? color.orange : color.silver}
                                />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={onHide}
                        style={[styles.bt_ok, { backgroundColor: validate ? color.orange : color.silver }]}
                        disabled={!validate}
                    >
                        <Text style={styles.bt_title}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default inforModal