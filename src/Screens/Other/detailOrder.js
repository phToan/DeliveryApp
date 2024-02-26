import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/FontAwesome5'
import moment from "moment/moment";
import axios from "axios";
import React, { useEffect } from "react";
import AppContext from "../../Context/AppContext";

const Detail = ({ route, navigation }) => {
   const { socket } = React.useContext(AppContext)
   const [driver, setDriver] = React.useState({})
   const item = route?.params.data
   const onClickExit = () => {
      navigation.goBack()
   }
   const data = {
      id: item.id,
      status: 4
   }

   useEffect(() => {
      const fetchDriver = async () => {
         console.log(item.driver_id)
         await axios.get('https://delivery-server-s54c.onrender.com/driver/user', { params: { id: item.driver_id } })
            .then(res => {
               // if (res.data.err == 0) {
               // navigation.navigate('Đã giao')
               // console.log(res.data.userData)
               setDriver(res.data.userData)
               // }
            })
            .catch(err => {
               console.log(err)
            })
      }
      fetchDriver()
   }, [])


   const onClickDel = async () => {
      await axios.put('https://delivery-server-s54c.onrender.com/order/customer', data)
         .then((res) => {
            if (res.data.err == 0) {
               navigation.navigate('Đã hủy')
               if (socket) {
                  socket.emit('customer-cancle-order', {})
               }
            }
         })
         .catch(err => {
            console.log(err)
         })

   }
   const onClickPhone = async () => {
      const isAvailable = await Linking.canOpenURL(`tel:${driver.phone}`);
      if (isAvailable) {
         // Mở ứng dụng gọi điện thoại
         Linking.openURL(`tel:${driver.phone}`);
      } else {
         console.log('Ứng dụng gọi điện thoại không khả dụng trên thiết bị.');
      }
   }

   const status = () => {
      if (route?.params.status == 1) {
         return (
            item.driver_id != 0 ?
               <View>
                  <Text style={styles.t_status}>Tài xế đang đến địa điểm lấy hàng</Text>
                  <Text style={{ color: 'white', marginTop: 5 }}>Vui lòng chờ trong vài phút!</Text>
               </View>
               :
               <View>
                  <Text style={styles.t_status}>Đang tìm tài xế</Text>
                  <Text style={{ color: 'white', marginTop: 5 }}>Vui lòng chờ trong vài phút!</Text>
               </View>
         )



      } else if (route?.params.status == 2) {
         return (
            <View>
               <Text style={styles.t_status}>Đang giao hàng</Text>
               {/* <Text style={{ color: 'white', marginTop: 5 }}>Cảm ơn bạn đã tin tưởng chúng tôi!</Text> */}
            </View>
         )
      } else if (route?.params.status == 3) {
         return (
            <View>
               <Text style={styles.t_status}>Giao hàng thành công</Text>
               <Text style={{ color: 'white', marginTop: 5 }}>Cảm ơn bạn đã tin tưởng chúng tôi!</Text>
            </View>
         )
      } else {
         return (
            <View>
               <Text style={styles.t_status}>Đơn hàng đã bị hủy bởi bạn!</Text>
               {/* <Text style={{ color: 'white', marginTop: 5 }}>Cảm ơn bạn đã tin tưởng chúng tôi!</Text> */}
            </View>
         )
      }
   }
   const renderTime = (time) => {
      const localDate = moment.utc(time).utcOffset('+07:00');
      const formattedDate = localDate.format("HH:mm:ss DD-MM-YYYY");
      return formattedDate
   }
   const isStatus = () => {
      if (route?.params.data.confirmAt == null) {
         return false
      } else {
         return true
      }
   }
   const isExpress = () => {
      if (item.infor_shipping == 1) {
         return true
      } else {
         return false
      }
   }
   const onClickMap = () => {

   }
   const detail_sen = item.sender_detail_address
   const detail_rec = item.receiver_detail_address
   const size_order = item.size_item
   const detail_order = item.detail_item

   return (
      <SafeAreaView style={styles.component}>
         <View style={styles.header}>
            <TouchableOpacity style={{ flex: 1 }} onPress={onClickExit}>
               <Icon name={'arrowleft'} size={20} color={'darkorange'} />
            </TouchableOpacity>
            <Text style={styles.t_header}>Chi tiết đơn hàng</Text>
            <View style={{ flex: 1 }} />
         </View>

         <View style={styles.body}>
            <ScrollView>
               <View style={styles._body_status}>
                  {status()}
                  {/* {isStatus() ? <Icon1 name={'clipboard-check-multiple-outline'} size={40} color={'white'} /> : <Icon name={"frown"} size={40} color={'yellow'} />} */}

               </View>
               {item.driver_id != 0 ?
                  <View style={styles.driver}>
                     <View style={styles.label_driver}>
                        <Icon3 name="house-user" size={20} />
                        <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 5 }}>Thông tin tài xế</Text>
                     </View>
                     <View style={styles.inforDriver}>
                        <Icon3 name="user-alt" size={50} style={styles.icon} color={'silver'} />
                        <View style={{ marginLeft: 10 }}>
                           <Text style={{ marginTop: 5 }}>Họ tên: {driver.name}</Text>
                           <Text style={{ marginTop: 3 }}>Năm sinh: {driver.dob}</Text>
                           <View style={{ flexDirection: 'row' }}>
                              <Text style={{ marginTop: 4 }}>Số điện thoại: </Text>
                              <TouchableOpacity onPress={onClickPhone}>
                                 <Text style={styles.phone}>{driver.phone}</Text>
                              </TouchableOpacity>
                           </View>
                           <Text style={{ marginTop: 3 }}>Số xe: {driver.vehicle_num}</Text>
                        </View>
                     </View>

                  </View> : null}
               <View style={styles._body_delivery}>
                  <View style={{ flexDirection: 'row' }}>
                     <Icon1 name={'truck-check'} size={20} color={'orange'} />
                     <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Thông tin vận chuyển</Text>
                        <Text style={{ color: '#3c3c38', marginTop: 5 }}>Giao hàng {isExpress() ? 'hỏa tốc' : 'tiết kiệm'}</Text>
                        {/* {isStatus() ?
                                    <View>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                            <Icon4 name={'dot-fill'} color={'#26ab9a'} size={15} />
                                            <Text style={{ color: '#26ab9a', marginLeft: 5 }}>Đơn hàng đã được giao thành công</Text>
                                        </View>
                                        <Text style={{ marginLeft: 10 }}>{renderTime(route?.params.data.confirmAt)}</Text>
                                    </View>
                                    : null} */}
                     </View>
                  </View>
               </View>
               <View style={styles.distance}>
                  <View style={{ flexDirection: 'row' }}>
                     <Icon1 name={"map-marker-distance"} color={'darkorange'} size={22} />
                     <Text style={styles.t_distance}>Quãng đường: <Text style={{ color: 'blue' }}>{item.distance} km</Text></Text>
                  </View>
                  <TouchableOpacity style={{ justifyContent: 'center' }} activeOpacity={0.8} onPress={onClickMap}>
                     <Text style={{ color: '#1db874' }}>Xem trên bản đồ</Text>
                  </TouchableOpacity>
               </View>
               <View style={{ borderWidth: 0.2, marginHorizontal: 5 }} />
               <View style={styles._body_delivery}>
                  <View style={{ flexDirection: 'row' }}>
                     <Icon2 name="location-sharp" size={20} color={'red'} />
                     <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Địa chỉ lấy hàng</Text>
                        <Text style={{ color: '#3c3c38', marginTop: 5 }}>{item.sender_name}</Text>
                        <TouchableOpacity onPress={onClickPhone}>
                           <Text style={{ color: '#3c3c38' }}>{item.sender_phone}</Text>
                        </TouchableOpacity>
                        <Text style={{ color: '#3c3c38' }}>{item.sender_address}</Text>
                        {detail_sen == null ? null : <Text style={{ color: '#3c3c38' }}>{detail_sen}</Text>}
                     </View>
                  </View>
               </View>
               <View style={{ marginLeft: 40, borderWidth: 0.2, borderColor: 'silver' }} />
               <View style={styles._body_delivery}>
                  <View style={{ flexDirection: 'row' }}>
                     <Icon3 name="location-arrow" size={18} color={'#26ab9a'} />
                     <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>Địa chỉ giao hàng</Text>
                        <Text style={{ color: '#3c3c38', marginTop: 5 }}>{item.receiver_name}</Text>
                        <Text style={{ color: '#3c3c38' }}>{item.receiver_phone}</Text>
                        <Text style={{ color: '#3c3c38' }}>{item.receiver_address}</Text>
                        {detail_rec == null ? null : <Text style={{ color: '#3c3c38' }}>{detail_rec}</Text>}
                     </View>
                  </View>
               </View>
               <View style={styles.order}>
                  <View style={{ flexDirection: 'row', padding: 10 }}>
                     <Icon1 name={'calendar-text-outline'} size={23} color={'orange'} />
                     <Text style={styles.t_order}>Chi tiết đơn hàng</Text>
                  </View>
                  <View style={{ borderWidth: 0.2, marginHorizontal: 5, borderColor: 'silver' }} />
                  <View style={{ padding: 10 }}>
                     <Text style={{ color: '#3c3c38' }}>Kích thước đơn: {size_order == 1 ? 'cồng kềnh ()' : 'nhỏ gọn ()'}</Text>
                     {detail_order == null ? null : <Text style={{ color: '#3c3c38', marginTop: 4 }}>Thông tin đơn: {detail_order}</Text>}
                  </View>
               </View>
               <View style={styles.payment}>
                  <Text style={styles.t_payment}>Thanh toán: </Text>
                  <Text style={styles.t_payment}><Text style={{ textDecorationLine: 'underline', color: 'red' }}>đ</Text> {item.price}</Text>
               </View>
               <View style={styles.id_order}>
                  <View style={styles._id_order_item}>
                     <Text style={styles.t_payment}>Mã đơn hàng</Text>
                     <Text style={styles.t_payment}>{item.id}</Text>
                  </View>
                  <View style={styles._id_order_item}>
                     <Text style={{ color: '#3c3c38' }}>Thời gian tạo đơn</Text>
                     <Text style={{ color: '#3c3c38' }}>{renderTime(item.createdAt)}</Text>
                  </View>
                  {/* {isStatus()
                            ? <View>
                                <View style={styles._id_order_item}>
                                    <Text style={{ color: '#3c3c38' }}>Thời gian lấy hàng</Text>
                                    <Text style={{ color: '#3c3c38' }}>{renderTime(route?.params.data.takeAt)}</Text>
                                </View>
                                <View style={styles._id_order_item}>
                                    <Text style={{ color: '#3c3c38' }}>Thời gian hoàn thành</Text>
                                    <Text style={{ color: '#3c3c38' }}>{renderTime(route?.params.data.confirmAt)}</Text>
                                </View>
                            </View>
                            : <View style={styles._id_order_item}>
                                <Text style={{ color: '#3c3c38' }}>Thời gian hủy đơn</Text>
                                <Text style={{ color: '#3c3c38' }}>{renderTime(route?.params.data.deleteAt)}</Text>
                            </View>
                        } */}
               </View>
            </ScrollView>
         </View>

         {route?.params.status == 1 ?
            <View style={styles.footer}>
               <TouchableOpacity style={styles._footer_inside} activeOpacity={0.8} onPress={onClickDel}>
                  <Text style={styles.t_evaluate}>Hủy đơn hàng</Text>
               </TouchableOpacity>
            </View>
            : null
         }
      </SafeAreaView>
   )
}

export default Detail

const styles = StyleSheet.create({
   component: {
      flex: 1,
   },
   header: {
      height: 80,
      justifyContent: 'center',
      alignItems: 'flex-end',
      backgroundColor: 'white',
      paddingVertical: 15,
      paddingHorizontal: 7,
      flexDirection: 'row'
   },
   label_driver: {
      flexDirection: 'row',

   },
   icon: {
      borderWidth: .5,
      padding: 10,
      marginTop: 10
   },
   driver: {
      backgroundColor: 'white',
      padding: 10,
      marginBottom: 5,
      // flexDirection: 'row'
   },
   inforDriver: {
      // marginLeft: 10,
      flexDirection: 'row'
   },
   body: {
      flex: 15,
      marginTop: 1
   },
   footer: {
      flex: 1,
      padding: 10,
      backgroundColor: 'white',
      marginTop: 5,
      justifyContent: 'center'
   },
   _footer_inside: {
      backgroundColor: '#ec5e09',
      height: 45,
      justifyContent: 'center'
   },
   t_header: {
      fontSize: 18,
      fontWeight: 'bold',
      flex: 6,
      textAlign: 'center'
   },
   phone: {
      marginTop: 3,
      textDecorationLine: 'underline',
      // color: 'red',
      fontSize: 15
   },
   t_evaluate: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center'
   },
   _body_status: {
      // height: 90,
      paddingVertical: 10,
      backgroundColor: '#26ab9a',
      // backgroundColor:'white',
      // alignItems: 'center',
      paddingHorizontal: 10,
      // flexDirection: 'row',
      // justifyContent: 'space-between',
      marginBottom: 5
   },
   t_status: {
      fontWeight: 'bold',
      fontSize: 16,
      color: 'white'
   },
   _body_delivery: {
      backgroundColor: 'white',
      padding: 10
   },
   distance: {
      backgroundColor: 'white',
      marginTop: 10,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   t_distance: {
      fontSize: 16,
      fontWeight: '500',
      marginHorizontal: 10
   },
   order: {
      backgroundColor: 'white',
      marginTop: 10,
      // padding: 10
   },
   t_order: {
      fontWeight: '500',
      fontSize: 16,
      marginLeft: 10
   },
   payment: {
      backgroundColor: 'white',
      marginTop: 10,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   t_payment: {
      fontSize: 16,
      fontWeight: '500',
   },
   id_order: {
      backgroundColor: 'white',
      marginTop: 10,
      padding: 10
   },
   _id_order_item: {
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
})