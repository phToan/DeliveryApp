import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native'
import color from '../../../Assets/color'
import AppContext from '../../../Context/AppContext'
import { useContext } from 'react'
import { CHANGE_ADDRESS } from '../../../Constants/NameScreen'
import { Map } from '../../../Components/MapView'
import { useDispatch, useSelector } from 'react-redux'
import { senderName, senderPhone, senderAddress } from '../../../Redux/Reducers/senderSlice'
import { ButtonConfirm } from '../../../Components/ButtonConfirm'
import { styles } from './styles'
import { Header } from '../../../Components/Header'

const DetailedAddress = ({ navigation }) => {
   const { setAddress } = useContext(AppContext)
   const senderInfor = useSelector((state) => state.senderSlice)
   const [addressDetail, setAddressDetail] = useState(senderInfor.address)
   const [nameSender, setNameSender] = useState(senderInfor.name)
   const [phoneSender, setPhoneSender] = useState(senderInfor.phone)
   const [isValidPhone, setValidPhone] = useState(true);
   const dispatch = useDispatch()

   const onClickReturn = () => {
      navigation.navigate('Trang chủ')
   }
   const onClickChageAddress = () => {
      navigation.navigate(CHANGE_ADDRESS, {
         id: 1,
         latitude: senderInfor.latitude,
         longitude: senderInfor.longitude,
         address: addressDetail
      })
   }
   const onClickConfirm = async () => {
      setAddress(addressDetail)
      navigation.navigate('Trang chủ')
      dispatch(senderName(nameSender))
      dispatch(senderPhone(phoneSender))
      dispatch(senderAddress(addressDetail))
   }

   const verifyPhone = (phone) => {
      let phoneNumberRegex = /^(03[2-9]|05[6-9]|07[0-9]|08[1-9]|09[0-9])+([0-9]{7})$/; // Biểu thức chính quy kiểm tra đầu số Việt Nam
      if (phoneNumberRegex.test(phone)) {
         return true
      }
      return false
   }
   const setLenghtPhone = (text) => {
      if (text.length == 0) {
         setValidPhone(true)
      }
   }

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <Header onClickReturn={onClickReturn} title={'Thông tin lấy hàng'} />
         <View style={styles.body}>
            <ScrollView>
               <View style={{ padding: 10 }}>
                  <View style={{ borderBottomWidth: 0.2 }}>
                     <Text style={styles.t_address}>Lấy hàng tại</Text>
                  </View>
                  <View style={styles.map}>
                     <Map
                        lat={parseFloat(senderInfor.latitude)}
                        lng={parseFloat(senderInfor.longitude)}
                        delta={0.003} />
                  </View>
                  <View style={styles._body_address}>
                     <View style={{ flex: 3 }}>
                        <Text style={styles.address}>{addressDetail}</Text>
                     </View>
                     <TouchableOpacity style={styles.b_change} onPress={onClickChageAddress}>
                        <Text style={styles.t_change}>Thay đổi</Text>
                     </TouchableOpacity>
                  </View>
               </View>
               <View style={styles._body_sender}>
                  <Text style={styles.t_infor}>Thông tin người gửi</Text>
                  <View style={styles.textInput}>
                     <TextInput
                        placeholder='Tên người gửi'
                        defaultValue={nameSender}
                        placeholderTextColor={color.black}
                        onChangeText={(text) => {
                           setNameSender(text)
                        }}
                     />
                  </View>
                  <View style={[styles._input_pass, {
                     borderColor: isValidPhone ? color.black : color.red
                  }]}>
                     <TextInput
                        keyboardType='numeric'
                        placeholder='Số điện thoại'
                        defaultValue={phoneSender}
                        placeholderTextColor={color.black}
                        onChangeText={(text) => {
                           setPhoneSender(text)
                           const isvalid = verifyPhone(text)
                           isvalid ? setValidPhone(true) : setValidPhone(false)
                           setLenghtPhone(text)
                        }}
                     />
                  </View>
               </View>
            </ScrollView>
         </View>
         <ButtonConfirm
            footerStyle={styles.footer}
            onPress={onClickConfirm}
            title={'Xác nhận'}
            validate={true} />
      </SafeAreaView>
   )
}

export default DetailedAddress

