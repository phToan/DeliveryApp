import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native'
import color from '../../Assets/color'
import Icon from 'react-native-vector-icons/AntDesign'
import AppContext from '../../Context/AppContext'
import { useContext } from 'react'
import { CHANGE_ADDRESS } from '../../Constants/NameScreen'
import { Map } from '../../Components/MapView'
import { useDispatch, useSelector } from 'react-redux'
import { senderName, senderPhone, senderAddress } from '../../Redux/Reducers/senderSlice'

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
         <View style={styles.header}>
            <TouchableOpacity onPress={onClickReturn} style={{ flex: 1, alignItems: 'center' }}>
               <Icon name='arrowleft' color={color.black} size={25} />
            </TouchableOpacity>
            <Text style={styles.t_header}>Thông tin lấy hàng</Text>
            <View style={{ flex: 1 }} />
         </View>

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
                        style={{}}
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

         <View style={styles.footer}>
            <TouchableOpacity style={styles.b_confirm} onPress={onClickConfirm}>
               <Text style={styles.t_confirm}>Xác nhận</Text>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   )
}

export default DetailedAddress

const styles = StyleSheet.create({
   header: {
      height: 80,
      backgroundColor: 'white',
      flexDirection: "row",
      alignItems: 'flex-end',
      borderBottomWidth: 0.2,
      borderColor: 'orange',
      paddingBottom: 15
   },
   t_header: {
      flex: 7,
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black'
   },
   body: {
      flex: 14,
      backgroundColor: 'white',
      marginTop: 10
   },
   footer: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      padding: 10
   },
   b_confirm: {
      backgroundColor: '#ff6e23',
      flex: 1,
      justifyContent: 'center'
   },
   t_address: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10
   },
   address: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5
   },
   map: {
      height: 150,
      backgroundColor: 'blue',
      marginTop: 10,
      borderColor: 'darkorange',
      borderWidth: 0.5
   },
   _body_address: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   b_change: {
      backgroundColor: '#fff0db',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      flex: 1,
      paddingVertical: 8
   },
   t_change: {
      fontSize: 16,
      color: '#ff6833',
      fontWeight: 'bold'
   },
   _body_sender: {
      marginTop: 10,
      height: 180,
      backgroundColor: 'white',
      padding: 10
   },
   t_infor: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black'
   },
   textInput: {
      marginTop: 15,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
   },
   _input_pass: {
      marginTop: 15,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
   },
   t_confirm: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center'
   }
})