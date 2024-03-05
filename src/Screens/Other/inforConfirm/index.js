import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./styles";
import { textInput as TextInput } from "../../../Components/TextInput";
import { MaterialCommunityIcons } from "../../../Assets/icon";
import color from "../../../Assets/color";
import { Map } from "../../../Components/MapView";
import { TextTickerItem } from "../../../Components/TextTicker";
import { ButtonConfirm } from "../../../Components/ButtonConfirm";
import { useDispatch, useSelector } from "react-redux";
import { senderName, senderPhone, homeNumber as homeSenderNumber, note as senderNote } from "../../../Redux/Reducers/senderSlice";
import { receiverName, receiverPhone, homeNumber as homeReceiverNumber, note as receiverNote } from "../../../Redux/Reducers/receiverSlice";
import { CHANGE_ADDRESS } from "../../../Constants/NameScreen";
import { ExitButtonCircle } from "../../../Components/ExitButton";
import { CheckSavedAddress } from "../../../Components/CheckBox_Saved_Address";
import { validatePhone } from '../../../Helper/validate'

const InforConfirm = ({ route, navigation }) => {
    const {
        id,
        title,
        name,
        phone
    } = route.params
    const lat = useSelector((state) =>
        id == 1 ? state.senderSlice.latitude : state.receiverSlice.latitude
    )
    const lng = useSelector((state) =>
        id == 1 ? state.senderSlice.longitude : state.receiverSlice.longitude
    )
    const address = useSelector((state) =>
        id == 1 ? state.senderSlice.address : state.receiverSlice.address
    )
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
            id: id,
            latitude: lat,
            longitude: lng,
            address: address
        })
    }
    const onPressConfirm = () => {
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
    const onPressExit = () => {
        navigation.goBack()
    }
    const validate = userName.length > 0 && phoneNumber.length > 0
        && validatePhone(phoneNumber) == null
    return (
        <View style={styles.modal}>
            <View style={styles.map}>
                <Map
                    lat={parseFloat(lat)}
                    lng={parseFloat(lng)}
                    delta={0.001}
                />
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
                        onChangeText={onChangeHomeNumber}
                        validate={true} />
                    <TextInput
                        label={'Tên người liên lạc'}
                        placeholder={'Tên'}
                        star={'*'}
                        keyboardType={'default'}
                        value={userName}
                        onChangeText={onChangeName}
                        validate={true} />
                    <TextInput
                        label={'Số điện thoại'}
                        placeholder={'Số điện thoại'}
                        star={'*'}
                        keyboardType={'numeric'}
                        value={phoneNumber}
                        onChangeText={onChangePhone}
                        validate={validatePhone(phoneNumber) == null} />

                    {validatePhone(phoneNumber) != null &&
                        <Text style={styles.validate}>Số điện thoại chưa hợp lệ</Text>}

                    <TextInput
                        label={'Ghi chú cho tài xế'}
                        placeholder={'Ghi chú cho tài xế'}
                        star={''}
                        keyboardType={'default'}
                        value={note}
                        onChangeText={onChangeNote}
                        validate={true} />
                    <CheckSavedAddress
                        handleSavedLocate={handleSavedLocate}
                        save={save} />
                </ScrollView>
            </View>
            <ButtonConfirm
                footerStyle={styles.footer}
                onPress={onPressConfirm}
                validate={validate}
                title={'Xác nhận'} />
            <ExitButtonCircle onPressExit={onPressExit} />
        </View >
    )
}

export default InforConfirm