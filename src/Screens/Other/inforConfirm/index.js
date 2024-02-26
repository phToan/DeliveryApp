import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./styles";
import { textInput as TextInput } from "../../../Components/TextInput";
import { MaterialCommunityIcons } from "../../../Assets/icon";
import color from "../../../Assets/color";
import { Map } from "../../../Components/MapView";
import { TextTickerItem } from "../../../Components/TextTicker";
import { ButtonConfirm } from "../../../Components/ButtonConfirm";
import { useDispatch } from "react-redux";
import { senderName, senderPhone, homeNumber as homeSenderNumber, note as senderNote } from "../../../Redux/Reducers/senderSlice";
import { receiverName, receiverPhone, homeNumber as homeReceiverNumber, note as receiverNote } from "../../../Redux/Reducers/receiverSlice";
import { CHANGE_ADDRESS } from "../../../Constants/NameScreen";

const InforConfirm = ({ route, navigation }) => {
    const {
        id,
        title,
        address,
        name,
        phone,
        latitude,
        longitude,
    } = route.params
    const lat = parseFloat(latitude)
    const lng = parseFloat(longitude)
    const [homeNumber, setHomeNumber] = useState('')
    const [userName, setName] = useState(name)
    const [phoneNumber, setPhone] = useState(phone)
    const [note, setNote] = useState('')
    const [save, setSave] = useState(false)
    const dispatch = useDispatch()
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
    const handleAddress = () => {
        navigation.navigate(CHANGE_ADDRESS, {
            id: id
        })
    }
    const onPressExit = () => {
        if (id == 1) {
            dispatch(senderName(userName))
            dispatch(senderPhone(phoneNumber))
            dispatch(homeSenderNumber(homeNumber))
            dispatch(senderNote(note))
        } else {
            dispatch(receiverName(userName))
            dispatch(receiverPhone(phoneNumber))
            dispatch(homeReceiverNumber(homeNumber))
            dispatch(receiverNote(note))
        }
        navigation.goBack()
    }
    const validate = userName.length > 0 && phoneNumber.length > 0
    return (
        <View style={styles.modal}>
            <View style={styles.map}>
                <Map lat={lat} lng={lng} />
            </View>
            <Text style={styles.message}>Thông tin {title}</Text>
            <View style={styles.body}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.label_title} >Địa chỉ</Text>
                    <TouchableOpacity
                        style={styles.message_body}
                        onPress={handleAddress}>
                        <TextTickerItem message={address} />
                    </TouchableOpacity>
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
            <ButtonConfirm
                footerStyle={styles.footer}
                onPress={onPressExit}
                validate={validate}
                title={'Xác nhận'} />

        </View >
    )
}

export default InforConfirm