import React, { useState, useEffect, useContext } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Image, FlatList, RefreshControl } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import AppContext from '../../../Context/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'


const Waiting = ({ navigation }) => {
   const [data, setData] = useState([])
   const { socket, orderID, setOrderID } = useContext(AppContext)
   const [id, setID] = useState('')
   const [driverID, setDriverID] = useState('')
   const isFocused = useIsFocused();
   const [array, setArray] = useState([])
   const [object, setObject] = useState({})
   // let array = []

   const [refreshing, setRefreshing] = useState(false);

   const handleRefresh = () => {
     // Đặt refreshing thành true để bắt đầu quá trình làm mới
     setRefreshing(true);
     // Thực hiện các thao tác làm mới dữ liệu ở đây (fetch dữ liệu mới, xử lý, vv.)
     fetchData()
     // Sau khi hoàn thành, đặt refreshing lại thành false để kết thúc quá trình làm mới
     setRefreshing(false);
   };
   useEffect(() => {
      if (socket) {
         socket.on('orderTaken', (value) => {
            // array.push(value)
            // console.log(value)
            // AsyncStorage.setItem('objDriver', JSON.stringify(value))
            // navigation.navigate('Đang giao')
            // navigation.navigate('Đang chờ')
            fetchData()
         })
         socket.on('orderTakenSuccess', (value) => {
            navigation.navigate('Đang giao')
         })
         socket.on('cancle-order-driver', (value) => {
            // navigation.navigate('Đang chờ')
            fetchData()
         })
      }
      const getData = async () => {
         setID(await AsyncStorage.getItem('id'))
      }
      getData()
   }, [socket])

   const payload = {
      customer_id: id,
      status: 1
   }

   const fetchData = async () => {
      try {
         const response = await axios.get('http://192.168.1.229:5000/order/customer', { params: payload })
         setData(response.data.data.rows);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      if (isFocused) {
         fetchData();
      }
   }, [isFocused]);

   // useEffect(() => {
   //    fetchData()
   // }, [])

   const Check = (item) => {
      const isCheck = array.some((e) => e.order_id === item.id)
      // console.log(isCheck)
      return isCheck
   }

   const itemView = ({ item }) => {
      const isExpress = item.infor_shipping
      return (
         <TouchableOpacity style={{
            padding: 10,
            backgroundColor: 'white'
         }} onPress={() => getItem(item)}>
            <View style={{ flexDirection: 'row' }}>
               <View style={{ flex: 1 }}>
                  {isExpress == 1 ?
                     <Image source={require('./../../../../Contains/Image/rocketicon.jpg')} style={styles.image} /> :
                     <Image source={require('./../../../../Contains/Image/flash.png')} style={styles.image} />}
               </View>
               <View style={{ flex: 5 }}>
                  <Text style={styles.t_shipping}>{isExpress ? 'Hỏa Tốc' : 'Tiết kiệm'}</Text>
                  <Text style={{ color: 'red' }}><Text style={styles.t_initmoney}>đ</Text> {item.price} -<Text style={{ color: 'blue' }}>- {item.distance} km</Text></Text>
               </View>
            </View>
            <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
               <Icon name='location-on' size={20} />
               <Text style={{ marginLeft: 10 }}>{item.sender_address}</Text>
            </View>
            {item.driver_id != 0 ?
               <View style={{ flexDirection: 'row', marginTop: 5, marginHorizontal: 20, alignItems: 'flex-end' }}>
                  <Icon1 name='truck-fast-outline' size={20} color={'#26ab9a'} />
                  <Text style={{ color: '#26ab9a', marginHorizontal: 10 }}>Chờ tài xế lấy hàng</Text>
               </View>
               : null}
         </TouchableOpacity>
      )
   }

   const getItem = (item) => {
      // let obj = {}
      // array.map(element => {
      //    if (element.order_id === item.id) {
      //       // obj = element
      //       item.objDriver = element
      //    }
      // })

      navigation.navigate('detailOrder', {
         data: item,
         status: 1,
      })
   }

   const separatorView = () => {
      return (
         <View style={{
            height: 1,
            width: '100%',
            backgroundColor: '#c8c8c8',
         }} />
      )
   }

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f8fa', marginTop: 5 }}>
         {data.length === 0 ? (
            <View style={{
               alignItems: 'center'
            }}>
               <Image source={require('../../../../Contains/Image/101.jpg')} style={styles.image101} />
               <Text style={styles.text1}>Chưa có đơn hàng ở trạng thái này</Text>
            </View>
         ) : (
            <FlatList
               data={data}
               renderItem={itemView}
               keyExtractor={item => item.id}
               ItemSeparatorComponent={separatorView}
               refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                  />
                }
            />
         )}
      </SafeAreaView>
   )
}

export default Waiting

const styles = StyleSheet.create({
   t_initmoney: {
      textDecorationLine: 'underline',
      fontWeight: 'bold',
      fontSize: 16
   },
   t_shipping: {
      fontSize: 16,
      fontWeight: 'bold'
   },
   image: {
      height: 50,
      width: 50
   },
   text1: {
      fontSize: 16,
      fontWeight: 'bold'
   },
   image101: {
      width: 250,
      height: 250,
      marginTop: 70,
      marginBottom: 20
   },
})