import { View, SafeAreaView, Text, Image, TouchableOpacity, TextInput, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Entypo'
import color from '../../Assets/color'
import SysModal from '../../Components/Modal/SysModal'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AppContext from '../../Context/AppContext'
import { styles } from './styles'
import { senderName, senderPhone } from '../../Redux/Reducers/senderSlice'
import { useDispatch } from 'react-redux'

import * as NameScreen from '../../Constants/NameScreen'

const Login = () => {
   const dispatch = useDispatch()
   const { getSocket } = React.useContext(AppContext)
   const navigation = useNavigation()
   const [hidePass, setHidePass] = useState(true)
   const [showModal, setShowModal] = useState(false)
   const [errorMessage, setErrorMessage] = useState('')
   const [isValidPhone, setValidPhone] = useState(true);
   const [isValidPass, setValidPass] = useState(true);
   const [phoneNumber, setPhoneNumber] = useState('');
   const [password, setPassword] = useState('');

   let messagePhone, messagePass
   if (!isValidPhone) {
      messagePhone = (
         <Text style={styles.textMessage}>Số điện thoại chưa hợp lệ</Text>
      )
   }
   if (!isValidPass) {
      messagePass = (
         <Text style={styles.textMessage}>Mật khẩu phải có tối thiểu 8 ký tự</Text>
      )
   }
   const setLenghtPhone = (text) => {
      if (text.length == 0) {
         setValidPhone(true)
      }
   }
   const setLenghtPass = (text) => {
      if (text.length == 0) {
         setValidPass(true)
      }
   }
   const onHideModal = () => {
      setShowModal(false)
   }

   const data = {
      phone: phoneNumber,
      password: password
   }

   const getData = async () => {
      const accessToken = await AsyncStorage.getItem('access_token')
      const data = {
         headers: {
            'Authorization': accessToken
         }
      }
      await axios.get('http://192.168.23.197:3306/customer', data)
         // await axios.get(`${process.env.URL}/customer`, data)
         .then(async (res) => {
            await AsyncStorage.setItem('id', res.data.userData.id.toString())
            await AsyncStorage.setItem('name', res.data.userData.name)
            await AsyncStorage.setItem('dob', res.data.userData.dob)
            await AsyncStorage.setItem('gender', JSON.stringify(res.data.userData.gender))
            await AsyncStorage.setItem('phone', res.data.userData.phone)
            await AsyncStorage.setItem('point', JSON.stringify(res.data.userData.point))
            dispatch(senderName(res.data.userData.name))
            dispatch(senderPhone(res.data.userData.phone))
         })
         .catch((err) => {
            console.log(err)
         })
   }
   const onClickLogin = async () => {
      await axios.post('http://192.168.23.197:3306/customer/login', data)
         // await axios.post(`${process.env.URL}/customer/login`, data)
         .then(async (res) => {
            // console.log(res.data.err)
            if (res.data.err == 0) {
               await AsyncStorage.setItem('access_token', res.data.access_token)
               await AsyncStorage.setItem('refresh_token', res.data.refresh_token)
               navigation.navigate(NameScreen.TAB_SCREEN)
               setPassword('')
               setHidePass(true)
               getData()
               getSocket()
            } else {
               setErrorMessage('Đăng nhập thất bại. Số điện thoại hoặc mật khẩu không chính xác')
               setShowModal(true)
               setPassword('')
               setHidePass(true)
            }
         })
         .catch((err) => {
            console.log(err)
         })
   }

   const onClickEye = () => {
      console.log('display password')
      setHidePass(!hidePass)
   }

   const verifyPhone = (phone) => {
      let phoneNumberRegex = /^(03[2-9]|05[6-9]|07[0-9]|08[1-9]|09[0-9])+([0-9]{7})$/; // Biểu thức chính quy kiểm tra đầu số Việt Nam
      if (phoneNumberRegex.test(phone)) {
         return true
      }
      return false
   }
   const verifyPassword = (password) => {
      if (password.length < 8) {
         return false
      }
      return true
   }

   const onClickRegister = () => {
      navigation.navigate(NameScreen.REGISTER_SCREEN)
   }

   const isValidLogin = () => phoneNumber.length > 0 && password.length > 0
      && isValidPhone == true && isValidPass == true

   return (
      <SafeAreaView style={{ backgroundColor: 'white' }}>
         <SysModal onHide={onHideModal} Visible={showModal} Message={errorMessage} />
         <ScrollView>
            <Image source={require('../../Assets/Image/ghn1.jpg')} style={styles.header} />
            <Text style={styles.t_header}>ĐĂNG NHẬP</Text>

            <View style={[styles._input, {
               borderColor: isValidPhone ? color.black : color.red
            }]}>
               <Icon name="user" color='lightslategray' size={30} />
               <TextInput
                  keyboardType='numeric'
                  style={styles.TextInput}
                  placeholder='Nhập số điện thoại'
                  placeholderTextColor={color.black}
                  value={phoneNumber}
                  onChangeText={(text) => {
                     setPhoneNumber(text)
                     const isvalid = verifyPhone(text)
                     isvalid ? setValidPhone(true) : setValidPhone(false)
                     setLenghtPhone(text)
                  }}
               />
            </View>
            {messagePhone}
            <View style={[styles._input, {
               borderColor: isValidPass ? color.black : color.red
            }]}>
               <Icon name="lock" color='lightslategray' size={30} />
               <TextInput
                  style={styles.TextInput}
                  secureTextEntry={hidePass ? true : false}
                  placeholder='Nhập mật khẩu'
                  placeholderTextColor={color.black}
                  value={password}
                  onChangeText={(text) => {
                     setPassword(text)
                     const invalid = verifyPassword(text)
                     invalid ? setValidPass(true) : setValidPass(false)
                     setLenghtPass(text)
                  }}
               />
               <TouchableOpacity onPress={onClickEye}>
                  <Icon name={hidePass ? 'eye-slash' : 'eye'} color='lightslategray' size={20} />
               </TouchableOpacity>
            </View>
            {messagePass}

            <TouchableOpacity>
               <Text style={styles.t_forgot_pass}>Quên mật khẩu ?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.b_login, {
               backgroundColor: isValidLogin() == true ? color.orange : color.silver,
            }]} activeOpacity={0.5} onPress={onClickLogin} disabled={isValidLogin() == false}>
               <Text style={{ fontSize: 18, color: color.white }}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>

            <Text style={styles.t_or}>Hoặc</Text>
            <View style={styles.other_login}>
               <TouchableOpacity>
                  <View style={{ marginHorizontal: 10 }}>
                     <Icon2 name='facebook-with-circle' size={47} color={"blue"} />
                  </View>
               </TouchableOpacity>
               <TouchableOpacity>
                  <Image source={require('../../Assets/Image/google.png')} style={styles.image} />
               </TouchableOpacity>
            </View>

            <Text style={styles.t_question}>Bạn đã có tài khoản chưa ?</Text>

            <TouchableOpacity style={styles.footer} onPress={onClickRegister} >
               <Text style={{ fontSize: 20, textAlign: 'center', color: color.orange }}>Đăng ký</Text>
            </TouchableOpacity>
         </ScrollView>
      </SafeAreaView>
   )
}

export default Login

