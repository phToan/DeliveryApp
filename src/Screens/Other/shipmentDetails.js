import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/Feather'
import color from '../../Assets/color'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import * as NameScreen from '../../Constants/NameScreen'

const ShipmentDetails = ({ navigation }) => {
   const [addressDetail, setAddressDetail] = useState('45 Ngõ 112 Mễ Trì Thượng')
   const [orderInfor, setOrderInfor] = useState('')
   const [addAddress, setAddAddress] = useState('')
   const [focusSmall, setFocusSmall] = useState(true)
   const [focusBig, setFocusBig] = useState(false)
   const [isValidPhone, setValidPhone] = useState(true)
   const [phoneNumber, setPhoneNumber] = useState('')
   const [name, setName] = useState('')
   const [isName, setValidName] = useState(true)
   const onClickReturn = () => {
      navigation.navigate(NameScreen.TAB_SCREEN)
   }
   const onClickChageAddress = () => {
      navigation.push(NameScreen.DELIVERY_PLACE)
   }

   useFocusEffect(() => {
      const setAdd = async () => {
         setAddressDetail(await AsyncStorage.getItem('itemSelected'))
      }
      setAdd()
   })

   const OrderInfor = {
      name: name,
      phone: phoneNumber,
      address: addressDetail,
      detailAddress: addAddress,
      orderInfor: orderInfor,
      description: focusSmall
   }
   const onClickConfirm = () => {
      navigation.navigate(NameScreen.ORDER_CONFIRM, { OrderInfor })
   }
   const onClickBigItem = () => {
      setFocusSmall(!focusSmall)
      setFocusBig(!focusBig)
   }
   const onClickSmallItem = () => {
      setFocusBig(!focusBig)
      setFocusSmall(!focusSmall)
   }
   const setLengthPhone = (text) => {
      if (text.length == 0) {
         setValidPhone(true)
      }
   }
   const setLengthName = (text) => {
      if (text.length == 0) {
         setValidName(true)
      }
   }
   const validate = (isValue, message) => {
      if (!isValue) {
         return (
            <View>
               <Text style={{ color: 'red', marginHorizontal: 20, marginTop: 5 }}>{message}</Text>
            </View>
         )
      }
   }
   const verifyPhone = (phone) => {
      let phoneNumberRegex = /^(03[2-9]|05[6-9]|07[0-9]|08[1-9]|09[0-9])+([0-9]{7})$/; // Biểu thức chính quy kiểm tra đầu số Việt Nam
      if (phoneNumberRegex.test(phone)) {
         return true
      }
      return false
   }
   const verifyName = (name) => {
      if (name.length < 4) {
         return false
      }
      return true
   }

   const isValidConfirm = () => name.length > 0 && phoneNumber.length > 0 && verifyName(name) == true && verifyPhone(phoneNumber) == true

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <View style={styles.header}>
            <TouchableOpacity style={{ flex: 1 }} onPress={onClickReturn}>
               <Icon name='arrowleft' size={25} />
            </TouchableOpacity>
            <Text style={{ flex: 3, fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>Thông tin giao hàng</Text>
            <View style={{ flex: 1 }} />
         </View>

         <View style={styles.body}>
            <ScrollView>
               <View style={styles.labelItem}>
                  <Text style={styles.textLabel}>Giao hàng đến</Text>
               </View>
               <View style={styles.frameItem}>
                  <View style={styles.address}>
                     <View style={{ flex: 4 }}>
                        <Text style={styles.t_address}>{addressDetail}</Text>
                     </View>
                     <TouchableOpacity style={styles.b_change} onPress={onClickChageAddress}>
                        <Text style={styles.t_change}>Thay đổi</Text>
                     </TouchableOpacity>
                  </View>
                  <View style={styles.textInput}>
                     <TextInput
                        placeholder='Thêm chi tiết địa chỉ'
                        placeholderTextColor={'#292726'}
                        onChangeText={(text) => {
                           setAddAddress(text)
                        }}
                     />
                  </View>
               </View>
               <View style={styles.labelItem}>
                  <Text style={styles.textLabel}>Thông tin người nhận</Text>
               </View>
               <View style={styles.frameItem}>
                  <View style={[styles._input, {
                     borderColor: isName ? color.black : color.red
                  }]}>
                     <TextInput
                        placeholder='Tên người nhận'
                        placeholderTextColor={'#292726'}
                        onChangeText={(text) => {
                           setName(text)
                           const isvalid = verifyName(text)
                           isvalid ? setValidName(true) : setValidName(false)
                           setLengthName(text)
                        }}
                     />
                  </View>
                  {validate(isName, 'Vui lòng nhập ít nhất 4 ký tự')}
                  <View style={[styles._input, {
                     borderColor: isValidPhone ? color.black : color.red
                  }]}>
                     <TextInput
                        keyboardType='numeric'
                        placeholder='Số điện thoại'
                        placeholderTextColor={'#292726'}
                        onChangeText={(text) => {
                           setPhoneNumber(text)
                           const isvalid = verifyPhone(text)
                           isvalid ? setValidPhone(true) : setValidPhone(false)
                           setLengthPhone(text)
                        }}
                     />
                  </View>
                  {validate(isValidPhone, 'Vui lòng nhập số điện thoại hợp lệ')}
               </View>

               <View style={styles.labelItem}>
                  <Text style={styles.textLabel}>Thông tin hàng hóa</Text>
               </View>
               <View style={styles.frameItem}>
                  <Text style={{ color: color.palebrown, marginTop: 10 }}>Thêm mô tả về loại hàng hóa để đảm bảo quyền lợi khi vận chuyển</Text>
                  <View style={styles.textInput}>
                     <TextInput
                        placeholder='Thông tin hàng hóa'
                        placeholderTextColor={'#292726'}
                        onChangeText={(text) => {
                           setOrderInfor(text)
                        }}
                     />
                  </View>

                  <View style={styles.description}>
                     <Text style={{ marginTop: 10 }}>Mô tả sản phẩm: </Text>
                     <View style={{ marginHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                           <TouchableOpacity onPress={onClickSmallItem} activeOpacity={1}>
                              <Icon1 name={focusSmall ? 'check-square' : 'square'} color={'green'} size={23} />
                           </TouchableOpacity>
                           <Text style={{ fontSize: 15, marginLeft: 10 }}>Hàng nhỏ gọn</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                           <TouchableOpacity onPress={onClickBigItem} activeOpacity={1}>
                              <Icon1 name={focusBig ? 'check-square' : 'square'} color={'green'} size={23} />
                           </TouchableOpacity>
                           <Text style={{ fontSize: 15, marginLeft: 10 }}>Hàng cồng kềnh</Text>
                        </View>
                     </View>
                  </View>
               </View>
            </ScrollView>
         </View>

         <View style={styles.footer}>
            <TouchableOpacity style={[styles.b_confirm, { backgroundColor: isValidConfirm() == true ? '#f95634' : 'silver' }]}
               onPress={onClickConfirm} activeOpacity={0.8} disabled={isValidConfirm() == false}>
               <Text style={styles.t_confirm}>Xác nhận</Text>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   )
}

export default ShipmentDetails

const styles = StyleSheet.create({
   header: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingBottom: 15,
      backgroundColor: 'white',
      height: 80,
      alignItems: 'flex-end'
   },
   body: {
      flex: 16,
      backgroundColor: 'white',
      marginTop: 5
   },
   footer: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10
   },
   b_confirm: {
      flex: 1,
      justifyContent: 'center'
   },
   t_confirm: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white'
   },
   address: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1
   },
   t_address: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5
   },
   b_change: {
      flex: 1,
      backgroundColor: '#fff0db',
      marginVertical: 3,
      paddingVertical: 5,
      paddingHorizontal: 9,
      justifyContent: 'center',
      borderRadius: 5,
   },
   t_change: {
      fontSize: 16,
      color: '#ff6833',
      fontWeight: 'bold'
   },
   _input: {
      marginTop: 15,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
   },
   textInput: {
      marginTop: 15,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
   },
   labelItem: {
      marginTop: 10,
      backgroundColor: 'white',
      padding: 10,
      borderBottomWidth: 1,
      borderColor: 'silver'
   },
   frameItem: {
      backgroundColor: 'white',
      paddingHorizontal: 10,
      paddingBottom: 20
   },
   textLabel: {
      fontSize: 18,
      fontWeight: 'bold'
   },
   description: {
      flexDirection: 'row',
      marginTop: 10
   },
})