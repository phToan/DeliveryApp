import React, { useState, useEffect, useContext } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../Context/AppContext'
import * as NameScreen from '../../Constants/NameScreen'

const UserAccount = ({ navigation }) => {
    const { isUpdate, setUpdate } = useContext(AppContext)
    const [nameUser, setNameUser] = useState('jjjjjj')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [id, setID] = useState('')

    const onClickReturn = () => {
        navigation.navigate('Tài khoản')
    }
    const data = {
        name: nameUser,
        dob: dateOfBirth,
        phone: phone,
        gender: gender,
        id: id
    }
    const onClickChangePass = () => {
        navigation.navigate(NameScreen.EDIT_PASSWORD, { id })
        setUpdate(false)
    }
    const onClickChangeInforUser = () => {
        navigation.navigate(NameScreen.EDIT_PROFILE, { data })
    }
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                if (isUpdate) {
                    await getToken()
                    await getDatabase()
                    await getData()
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [isUpdate])

    const getToken = async () => {
        const refreshToken = await AsyncStorage.getItem('refresh_token')
        const data = {
            refresh_token: refreshToken
        }
        await axios.post('http://192.168.23.197:3306/customer/refresh_token', data)
            .then(async (res) => {
                if (res.data.err == 0) {
                    await AsyncStorage.setItem('access_token', res.data.access_token)
                    // console.log(await AsyncStorage.getItem('access_token'))
                } else if (res.data.err == 2) {
                    setErrorMessage('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại')
                    setShowModal(true)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const getDatabase = async () => {
        const accessToken = await AsyncStorage.getItem('access_token')
        const data = {
            headers: {
                'Authorization': accessToken
            }
        }
        await axios.get('http://192.168.23.197:3306/customer', data)
            .then(async (res) => {
                await AsyncStorage.setItem('name', res.data.userData.name)
                await AsyncStorage.setItem('dob', res.data.userData.dob)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const getData = async () => {
        setNameUser(await AsyncStorage.getItem('name'))
        setPhone(await AsyncStorage.getItem('phone'))
        setGender(await AsyncStorage.getItem('gender'))
        setDateOfBirth(await AsyncStorage.getItem('dob'))
        setID(await AsyncStorage.getItem('id'))
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getData()
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    })
    return (
        <SafeAreaView>
            <View style={styles.header}>
                <TouchableOpacity onPress={onClickReturn} style={{ flex: 1, alignItems: 'center' }}>
                    <Icon name='arrowleft' color={'black'} size={25} />
                </TouchableOpacity>
                <View style={{ flex: 7, alignItems: 'center', }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Tài khoản của tôi</Text>
                </View>
                <View style={{ flex: 1 }} />
            </View>
            <View style={{
                marginTop: 10,
                backgroundColor: 'white'
            }}>
                <View style={styles.layoutItem}>
                    <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>Thông tin cá nhân</Text>
                    <TouchableOpacity onPress={onClickChangeInforUser} style={styles.touchableOpacity} >
                        <Icon1 name='pencil' color={'darkorange'} size={25} />
                    </TouchableOpacity>
                </View>
                <View style={styles.layoutItem}>
                    <Text style={styles.textItem}>Họ và tên</Text>
                    <Text>{nameUser}</Text>
                </View>
                <View style={styles.layoutItem}>
                    <Text style={styles.textItem}>Ngày sinh</Text>
                    <Text>{dateOfBirth}</Text>
                </View>
                <View style={styles.layoutItem}>
                    <Text style={styles.textItem}>Số điện thoại</Text>
                    <Text>{phone}</Text>
                </View>
                <View style={styles.layoutItem}>
                    <Text style={styles.textItem}>Password</Text>
                    <TouchableOpacity onPress={onClickChangePass} style={styles.touchableOpacity}>
                        <Icon1 name='pencil' color={'darkorange'} size={25} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default UserAccount

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
        paddingBottom: 20
    },
    layoutItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderBottomWidth: .2,
        borderColor: 'silver'
    },
    textItem: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black'
    },
    touchableOpacity: {
        padding: 3
    },
})