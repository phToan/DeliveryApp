import React, { useState, useMemo, useCallback } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import axios from 'axios'
import { FontAwesome5, MaterialIcons, Fontisto, MaterialCommunityIcons } from '../../../Assets/icon'
import { TAB_SCREEN, INFOR_CONFIRM } from '../../../Constants/NameScreen'
import { useSelector } from 'react-redux'
import { styles } from './styles'
import { useFocusEffect } from '@react-navigation/native'
import SysModal from '../../../Components/Modal/SysModal'
import { Header } from '../../../Components/Header'
import { inforSender as Infor, TransportMethod } from '../../../Components/OrderConfirm'


const OrderConfirm = ({ navigation }) => {
   const [orderInfor, setOrderInfor] = useState('')
   const [orderDescription, setOrderDescription] = useState(true)
   const [distance, setDistance] = useState('')
   const [fastShip, setFastShip] = useState(false)
   const [expressShip, setExpressShip] = useState(false)
   const [usePoint, setUsePoint] = useState(false)

   const senderAddress = useSelector((state) => state.senderSlice.address)
   const receiverAddress = useSelector((state) => state.receiverSlice.address)
   const senderName = useSelector((state) => state.senderSlice.name)
   const senderPhone = useSelector((state) => state.senderSlice.phone)
   const receiverName = useSelector((state) => state.receiverSlice.name)
   const receiverPhone = useSelector((state) => state.receiverSlice.phone)
   const detailAddressSender = useSelector((state) => state.senderSlice.detailAddress)
   const detailAddressReciever = useSelector((state) => state.receiverSlice.detailAddress)
   const point = useSelector((state) => state.userInforSlice.point)
   const id = useSelector((state) => state.userInforSlice.id)
   const senderCoordinate = useSelector((state) => state.senderSlice)
   const receiverCoordinate = useSelector((state) => state.receiverSlice)

   const apiKey = 'uGwlo6yHxKnoqSPqp0Enla92wOd1YpmpbYrEy3GK'

   const onClickReturn = useCallback(() => {
      navigation.navigate(TAB_SCREEN)
   }, [])
   const onClickFast = useCallback(() => {
      setFastShip(!fastShip)
      setExpressShip(fastShip)
   }, [])
   const onClickExpress = useCallback(() => {
      setExpressShip(!expressShip)
      setFastShip(expressShip)
   }, [])

   const onClickPlaceOrder = async () => {
      await axios.post('https://delivery-server-s54c.onrender.com/order/customer', myOrder)
         .then((res) => {
            if (res.data.err == 0) {
               navigation.navigate('Đơn hàng', { screen: 'Đang chờ' })
               // socket.emit('placeOrder', { id: myOrder.id })
            }
         })
         .catch((err) => {
            console.log(err)
         })
   }

   const onClickUsePoint = () => {
      setUsePoint(!usePoint)
   }

   const calculateDistance = useCallback(async () => {
      try {
         let origin, destination
         origin = `${senderCoordinate.latitude},${senderCoordinate.longitude}`
         destination = `${receiverCoordinate.latitude},${receiverCoordinate.longitude}`
         const response = await fetch(
            `https://rsapi.goong.io/Direction?origin=${origin}&destination=${destination}&vehicle=bike&api_key=${apiKey}`
         );
         const data = await response.json();
         // console.log(data.routes[0].legs[0].distance.value)
         if (data.geocoded_waypoints[0].geocoder_status === 'OK') {
            const distanceString = data.routes[0].legs[0].distance.value;
            const distance = parseFloat(distanceString);
            setDistance((distance / 1000).toFixed(1))
         }
      } catch (error) {
         console.log('Lỗi 2:', error);
      }
   }, [senderCoordinate.latitude, senderCoordinate.longitude, receiverCoordinate.latitude, receiverCoordinate.longitude])

   useFocusEffect(() => {
      calculateDistance()
   })

   const transportFee = useMemo(() => {
      let cost
      if (!expressShip) {
         cost = 5500
      } else {
         cost = 7500
      }
      return distance * cost
   }, [expressShip, distance])

   const deliveryFee = useMemo(() => {
      if (usePoint) {
         return transportFee - (point * 100)
      }
      return transportFee
   }, [transportFee, usePoint])

   const myOrder = {
      id: Date.now().toString(),
      sender_name: senderName,
      sender_phone: senderPhone,
      sender_address: senderAddress,
      sender_detail_address: detailAddressSender,
      receiver_name: receiverName,
      receiver_phone: receiverPhone,
      receiver_address: receiverAddress,
      receiver_detail_address: detailAddressReciever,
      size_item: orderDescription,
      detail_item: orderInfor,
      infor_shipping: expressShip,
      distance: distance,
      price: deliveryFee,
      customer_id: id,
   }

   const handleInforOrder = (text) => {
      setOrderInfor(text)
   }

   const onPressInforSender = () => {
      navigation.navigate(INFOR_CONFIRM, {
         id: 1,
         title: 'người gửi',
         name: senderName,
         phone: senderPhone,
      })
   }

   const onPressInforReceiver = () => {
      navigation.navigate(INFOR_CONFIRM, {
         id: 2,
         title: 'người nhận',
         name: receiverName,
         phone: receiverPhone,
      })
   }

   return (
      <SafeAreaView style={{ flex: 1 }}>

         <Header onClickReturn={onClickReturn} />
         <View style={{ flex: 14 }}>
            <ScrollView>
               <View style={styles.route}>

                  <View style={styles._route_header}>
                     <View style={styles.distance}>
                        <Text style={styles.distance_title}>Lộ trình: </Text>
                        <Text style={styles.distance_number}>{distance} km</Text>
                     </View>
                  </View>

                  <Infor
                     iconColor={'#2299ba'}
                     iconName={'location-pin'}
                     title={'người gửi'}
                     name={senderName}
                     address={senderAddress}
                     phone={senderPhone}
                     onPress={onPressInforSender} />
                  <Infor
                     iconColor={'red'}
                     iconName={'my-location'}
                     title={'người nhận'}
                     name={receiverName}
                     address={receiverAddress}
                     phone={receiverPhone}
                     onPress={onPressInforReceiver} />
               </View>

               <View style={styles.order}>
                  <Text style={styles.infor_order_title}>Thông tin đơn hàng</Text>
                  <View style={styles.infor_order}>
                     <FontAwesome5 name='box' size={25} color={'#f1bd07'} />
                     <Text style={styles.infor_order_main}>Giao hàng {orderDescription ? 'nhỏ gọn' : 'cồng kềnh'}</Text>
                  </View>
                  <Text>Chi tiết mặt hàng</Text>
                  <View style={styles.detail_order}>
                     <TextInput
                        placeholder='Thông tin mặt hàng'
                        style={{ fontSize: 16, }}
                        onChangeText={text => handleInforOrder(text)}
                     />
                  </View>
               </View>

               <View style={styles.method}>
                  <Text style={styles.t_method}>Phương thức vận chuyển</Text>

                  <TransportMethod
                     title={'Hỏa tốc'}
                     expressShip={expressShip}
                     onPress={onClickExpress}
                     secondTitle={'Nhận hàng trong khoảng 1h'} />

                  <TransportMethod
                     title={'Tiết kiệm'}
                     expressShip={fastShip}
                     onPress={onClickFast}
                     secondTitle={'Nhận hàng trong khoảng từ 2h - 5h'} />

               </View>

               <View style={styles.point}>
                  <View style={styles.point_title}>
                     <MaterialIcons name='monetization-on' size={25} color={usePoint ? '#ffb602' : 'silver'} />
                     <Text style={styles.point_main}>Dùng điểm thành viên {point}đ</Text>
                  </View>
                  <TouchableOpacity onPress={onClickUsePoint}>
                     <Fontisto name={usePoint ? 'toggle-on' : 'toggle-off'} size={35} color={usePoint ? 'darkorange' : 'silver'} />
                  </TouchableOpacity>
               </View>

               <View style={styles.payment}>
                  <View style={styles._payment_title}>
                     <MaterialCommunityIcons name='calendar-text' size={30} color={'darkorange'} />
                     <Text style={styles.payment_title}>Chi tiết thanh toán</Text>
                  </View>
                  <View style={styles.deli_fee}>
                     <Text>Phí vận chuyển</Text>
                     <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.underline}>đ</Text>
                        <Text> {transportFee.toLocaleString()}</Text>
                     </View>
                  </View>

                  {
                     usePoint && <View style={styles.deli_fee}>
                        <Text>Đã dùng điểm thành viên</Text>
                        <Text>- <Text style={styles.underline}>đ</Text> {(point * 100).toLocaleString()}</Text>
                     </View>
                  }

                  <View style={styles.total_payment}>
                     <Text style={styles.total_title}>Tổng thanh toán</Text>
                     <Text style={{ fontSize: 15 }}><Text style={styles.underline}>đ</Text> {deliveryFee.toLocaleString()}</Text>
                  </View>
               </View>

            </ScrollView>
         </View>

         <View style={styles.footer}>
            <View style={styles._footer_payment}>
               <Text>Tổng thanh toán</Text>
               <Text style={styles.footer_payment}>
                  <Text style={{ fontSize: 15 }}><Text style={styles.underline}>đ</Text> {deliveryFee.toLocaleString()}</Text>
               </Text>
            </View>
            <TouchableOpacity style={styles.b_order} onPress={onClickPlaceOrder}>
               <Text style={styles.footer_order}>Đặt đơn</Text>
            </TouchableOpacity>
         </View>
      </SafeAreaView>

   )
}

export default OrderConfirm



