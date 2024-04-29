import { changeID, changeName, changeDob, changeGender, changePhone, changePoint } from "../Redux/Reducers/userInforSlice"
import { senderName, senderPhone } from '../Redux/Reducers/senderSlice'
import { instance } from "./instance"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const getData = async (dispatch) => {
    const accessToken = await AsyncStorage.getItem('access_token')
    const data = {
        headers: {
            'Authorization': accessToken
        }
    }
    await instance.get('/customer', data)
        .then(async (res) => {
            dispatch(changeID(res.data.userData.id))
            dispatch(changeName(res.data.userData.name))
            dispatch(changeDob(res.data.userData.dob))
            dispatch(changeGender(res.data.userData.gender))
            dispatch(changePhone(res.data.userData.phone))
            dispatch(changePoint(res.data.userData.point))
            dispatch(senderName(res.data.userData.name))
            dispatch(senderPhone(res.data.userData.phone))
        })
        .catch((err) => {
            console.log(err)
        })
}

export const updateData = async (data) => {
    try {
        const response = await instance.put('/customer', data)
        const status = response.data.err
        return status
    } catch (error) {
        console.log(error)
    }
}

export const updatePassword = async (data) => {
    try {
        const res = await instance.put('/customer/password', data)
        return res.data.err
    } catch (error) {
        console.log(error)
    }
}