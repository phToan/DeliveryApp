import React, { useState, useEffect, useContext } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import Icon3 from 'react-native-vector-icons/FontAwesome5'
import Icon4 from 'react-native-vector-icons/MaterialIcons'
import Icon5 from 'react-native-vector-icons/Fontisto'
import Icon6 from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment/moment'
import AppContext from '../../Context/AppContext'
import axios from 'axios'



const OrderConfirm = ({ route, navigation }) => {
   const [senderName, setSenderName] = useState('')
   const [senderPhone, setSenderPhone] = useState('')
   const [senderAddress, setAddressSender] = useState('')
   const [recieverName, setRecieverName] = useState('')
   const [recieverPhone, setRecieverPhone] = useState('')
   const [recieverAddress, setRecieverAddress] = useState('')
   const [detailAddressSender, setDetailAddressSender] = useState('')
   const [detailAddressReciever, setDetailAddressReciever] = useState('')
   const [orderInfor, setOrderInfor] = useState('')
   const [orderDescription, setOrderDescription] = useState(true)
   const [distance, setDistance] = useState('')
   const [fastShip, setFastShip] = useState(true)
   const [expressShip, setExpressShip] = useState(false)
   const [point, setPoint] = useState()
   const [usePoint, setUsePoint] = useState(false)
   const [id, setID] = useState('')
   const { socket } = useContext(AppContext)

   const onClickReturn = () => {
      navigation.navigate('shipmentDetails')
   }
   const onClickFast = () => {
      setFastShip(!fastShip)
      setExpressShip(fastShip)
   }
   const onClickExpress = () => {
      setExpressShip(!expressShip)
      setFastShip(expressShip)
   }

   // const onClickPlaceOrder = () => {
   //    navigation.navigate('BottomTab', {
   //       screen: 'Đơn hàng',
   //       params: { screen: 'Đang chờ', params: { myOrder } }
   //    })
   //    socket.emit('placeOrder', myOrder)
   //    // console.log(myOrder.id)
   // }
   const onClickPlaceOrder = async () => {
      // navigation.navigate('Đơn hàng')
      // console.log(myOrder)
      await axios.post('http://192.168.1.229:5000/order/customer', myOrder)
         .then((res) => {
            console.log(res.data)
         })
         .catch((err) => {
            console.log(err)
         })
   }

   const onClickUsePoint = () => {
      setUsePoint(!usePoint)
   }

   useEffect(() => {
      if (route?.params?.OrderInfor) {
         const { name, phone, address, detailAddress, orderInfor, description } = route.params.OrderInfor
         setRecieverName(name)
         setRecieverPhone(phone)
         setRecieverAddress(address)
         setDetailAddressReciever(detailAddress)
         setOrderInfor(orderInfor)
         setOrderDescription(description)
      }
   }, [route?.params?.OrderInfor])

   useEffect(() => {
      const getData = async () => {
         setSenderName(await AsyncStorage.getItem('senderName'))
         setSenderPhone(await AsyncStorage.getItem('senderPhone'))
         setAddressSender(await AsyncStorage.getItem('setCurrAddress'))
         setDetailAddressSender(await AsyncStorage.getItem('detailAdd'))
         setPoint(parseInt(await AsyncStorage.getItem('point')))
         setID(await AsyncStorage.getItem('id'))
      }
      getData()
      socket.emit('joinRoom', 'customer');
   }, [])

   useFocusEffect(() => {
      const calculateDistance = async () => {
         // Các thông tin về điểm xuất phát và điểm đến
         const origin = senderAddress
         const destination = recieverAddress
         const apiKey = 'AIzaSyCS-qxrrYUPQH_R_ZfLdHhqlnGSOwtIhRs'
         try {
            const response = await fetch(
               `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`
            );
            const data = await response.json();

            if (data.status === 'OK') {
               const distanceString = data.routes[0].legs[0].distance.text;
               const distance = parseFloat(distanceString);
               setDistance(distance)
            }
         } catch (error) {
            console.error('Lỗi 2:', error);
         }
      }
      calculateDistance()
   })

   let cost
   if (!expressShip) {
      cost = 5500
   } else {
      cost = 7500
   }

   let value = (distance * cost)
   let tprice
   let textPoint
   if (usePoint) {
      tprice = value - (point * 100)
      // setPrice(tprice)
      textPoint = (
         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Đã dùng điểm thành viên</Text>
            <Text>- <Text style={{ textDecorationLine: 'underline' }}>đ</Text> {(point * 100).toLocaleString()}</Text>
         </View>
      )
   } else {
      tprice = value
   }

   let pricePoint = (
      <Text style={{ fontSize: 15 }}><Text style={styles.underline}>đ</Text> {tprice.toLocaleString()}</Text>
   )
   let priceNoPoint = (
      <Text style={{ fontSize: 15 }}><Text style={styles.underline}>đ </Text>{tprice.toLocaleString()}</Text>
   )

   let des = ''
   if (orderDescription) {
      des = 'nhỏ gọn'
   } else {
      des = 'cồng kềnh'
   }

   const myOrder = {
      id: Date.now().toString(),
      sender_name: senderName,
      sender_phone: senderPhone,
      sender_address: senderAddress,
      sender_detail_address: detailAddressSender,
      receiver_name: recieverName,
      receiver_phone: recieverPhone,
      receiver_address: recieverAddress,
      receiver_detail_address: detailAddressReciever,
      size_item: orderDescription,
      detail_item: orderInfor,
      infor_shipping: expressShip,
      distance: distance,
      price: tprice,
      customer_id: id
   }

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <View style={styles.header}>
            <TouchableOpacity style={{ flex: 1 }} onPress={onClickReturn}>
               <Icon name='arrowleft' size={25} />
            </TouchableOpacity>
            <Text style={{ flex: 5, textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Thanh toán</Text>
            <View style={{ flex: 1 }} />
         </View>

         <View style={{ flex: 14 }}>
            <ScrollView>
               <View style={styles.route}>
                  <View style={styles._route_header}>
                     <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Lộ trình: </Text>
                        <Text style={{ color: 'blue' }}>{distance} km</Text>
                     </View>
                     <TouchableOpacity style={styles.b_route}>
                        <Text style={{ color: 'red' }}>Xem đường đi</Text>
                     </TouchableOpacity>
                  </View>

                  <View style={[styles.sender, { borderColor: 'darkorange' }]}>
                     <Icon1 name='location' size={25} color={'darkorange'} style={{ flex: 1 }} />
                     <View style={{ marginHorizontal: 10, flex: 9 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Địa chỉ lấy hàng</Text>
                        <Text style={{ fontSize: 15 }}>{senderName} | {senderPhone}</Text>
                        <Text style={{ fontWeight: '500', fontSize: 15 }}>{senderAddress}</Text>
                        {detailAddressSender.length > 0
                           ? <View style={{ borderWidth: 0.3, padding: 3 }}>
                              <Text style={{ fontWeight: '500' }}>Địa chỉ chi tiết: </Text>
                              <Text>{detailAddressSender}</Text>
                           </View>
                           : null
                        }
                     </View>
                  </View>



                  <View style={[styles.sender, { borderColor: '#079124' }]}>
                     <Icon2 name='location-arrow' size={25} color={'#079124'} style={{ flex: 1 }} />
                     <View style={{ marginHorizontal: 10, flex: 9 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Địa chỉ giao hàng</Text>
                        <Text style={{ fontSize: 15 }}>{recieverName} | {recieverPhone}</Text>
                        <Text style={{ fontWeight: '500', fontSize: 15 }}>{recieverAddress}</Text>
                        {detailAddressReciever.length > 0
                           ? <View style={{ borderWidth: 0.3, padding: 3 }}>
                              <Text style={{ fontWeight: '500' }}>Địa chỉ chi tiết: </Text>
                              <Text>{detailAddressReciever}</Text>
                           </View>
                           : null
                        }
                     </View>
                  </View>
               </View>

               <View style={styles.order}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Thông tin đơn hàng</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                     <Icon3 name='box' size={25} color={'#f1bd07'} />
                     <Text style={{ fontSize: 15, marginHorizontal: 10 }}>Giao hàng {des}</Text>
                  </View>
                  <Text>Chi tiết mặt hàng</Text>
                  <View style={styles.detail_order}>
                     <TextInput
                        defaultValue={orderInfor}
                        style={{ fontSize: 16, }}
                     />
                  </View>
               </View>

               <View style={styles.method}>
                  <Text style={styles.t_method}>Phương thức vận chuyển</Text>
                  <TouchableOpacity style={styles.express} onPress={onClickExpress}>
                     <Icon2 name={expressShip ? 'check-square-o' : 'square-o'} size={20} color={'green'} />
                     <View style={{ marginHorizontal: 10 }}>
                        <Text style={{ fontWeight: '600' }}>Hỏa tốc</Text>
                        <Text style={{ marginBottom: 5 }}>Nhận hàng trong khoảng 1h</Text>
                     </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.save} onPress={onClickFast}>
                     <Icon2 name={fastShip ? 'check-square-o' : 'square-o'} size={20} color={'green'} />
                     <View style={{ marginHorizontal: 10 }}>
                        <Text style={{ fontWeight: '600' }}>Tiết kiệm</Text>
                        <Text >Nhận hàng trong khoảng từ 2h - 5h</Text>
                     </View>
                  </TouchableOpacity>
               </View>

               <View style={styles.point}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <Icon4 name='monetization-on' size={25} color={usePoint ? '#ffb602' : 'silver'} />
                     <Text style={{ marginHorizontal: 10, fontSize: 16 }}>Dùng điểm thành viên {point}đ</Text>
                  </View>
                  <TouchableOpacity onPress={onClickUsePoint}>
                     <Icon5 name={usePoint ? 'toggle-on' : 'toggle-off'} size={35} color={usePoint ? 'darkorange' : 'silver'} />
                  </TouchableOpacity>
               </View>

               <View style={styles.payment}>
                  <View style={styles._payment_title}>
                     <Icon6 name='calendar-text' size={30} color={'darkorange'} />
                     <Text style={{ fontSize: 16, fontWeight: 'bold', marginHorizontal: 10 }}>Chi tiết thanh toán</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                     <Text>Phí vận chuyển</Text>
                     <View style={{ flexDirection: 'row' }}>
                        <Text style={{ textDecorationLine: 'underline', color: 'red' }}>đ</Text>
                        <Text> {value.toLocaleString()}</Text>
                     </View>
                  </View>
                  <View>
                     {textPoint}
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                     <Text style={{ fontSize: 15, fontWeight: '500', marginVertical: 3 }}>Tổng thanh toán</Text>
                     {usePoint ? pricePoint : priceNoPoint}
                  </View>
               </View>

            </ScrollView>
         </View>

         <View style={styles.footer}>
            <View style={styles._footer_payment}>
               <Text>Tổng thanh toán</Text>
               <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{usePoint ? pricePoint : priceNoPoint}</Text>
            </View>
            <TouchableOpacity style={styles.b_order} onPress={onClickPlaceOrder}>
               <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'white' }}>Đặt đơn</Text>
            </TouchableOpacity>
         </View>
      </SafeAreaView>

   )
}

export default OrderConfirm

const styles = StyleSheet.create({
   header: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingBottom: 15,
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderColor: 'darkorange',
      height: 80,
      alignItems: 'flex-end'
   },
   footer: {
      marginTop: 5,
      flexDirection: 'row',
      backgroundColor: 'white',
      // flex: 1,
      height: 50
   },
   _footer_payment: {
      flex: 2,
      alignItems: 'flex-end',
      marginHorizontal: 10,
      marginTop: 3
   },
   b_order: {
      flex: 1,
      backgroundColor: 'darkorange',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 13
   },
   route: {
      backgroundColor: 'white',
      marginTop: 10,
      padding: 10
   },
   b_route: {
      borderWidth: 0.5,
      padding: 5,
      borderColor: 'red'
   },
   _route_header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   order: {
      marginTop: 10,
      backgroundColor: 'white',
      padding: 10
   },
   detail_order: {
      borderWidth: .5,
      borderColor: 'orange',
      padding: 10,
      marginTop: 5
   },
   method: {
      marginTop: 10,
      backgroundColor: '#effaf9',
      padding: 10
   },
   t_method: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#189893'
   },
   express: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: 10,
      borderBottomColor: 'orange',
      borderBottomWidth: 0.5
   },
   save: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: 5
   },
   point: {
      marginTop: 10,
      backgroundColor: 'white',
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 20
   },
   payment: {
      marginTop: 5,
      backgroundColor: 'white',
      padding: 10,
   },
   _payment_title: {
      flexDirection: 'row',
      alignItems: 'center'
   },
   sender: {
      flexDirection: 'row',
      padding: 10,
      borderWidth: .5,
      marginTop: 10,
      borderRadius: 5,
      flex: 1
   },
   underline: {
      textDecorationLine: 'underline',
      color: 'red'
   }
})

