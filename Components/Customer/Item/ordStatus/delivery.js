import React, { useState, useEffect, useContext } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Image, FlatList, } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import AppContext from '../../../Context/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Delivery = ({ navigation }) => {
   const {socket} = useContext(AppContext)
   const [data, setData] = useState([])
   const [delID, setDelID] = useState('')
   const [id, setID] = useState('')
   const isFocused = useIsFocused()

   useEffect(() => {
      const getData = async () => {
         setID(await AsyncStorage.getItem('id'))
      }
      const getSocket =()=>{
         if(socket){
            socket.on('orderDeliverySuccess', (value) => {
               navigation.navigate('Đã giao')
            })
         }
      }
      getData()
      getSocket()
   }, [])

   const updateItem = async (payload) => {
      await axios.put('http://192.168.1.229:5000/order/customer',  payload )
         .then(res => {
            if (res.data.err == 0) {
               navigation.navigate('Đã giao')
            }
         })
         .catch(err => {
            console.log(err)
         })
   }

   const payload = {
      customer_id: id,
      status: 2
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

   const itemView = ({ item }) => {
      const isExpress = item.infor_shipping
      return (
         <TouchableOpacity style={{
            padding: 10,
            backgroundColor:'white'
         }} onPress={() => getItem(item)}>
            <View style={{ flexDirection: 'row' }}>
               <View style={{flex:1}}>
                  {isExpress == 1 ?
                     <Image source={require('./../../../../Contains/Image/rocketicon.jpg')} style={styles.image} /> :
                     <Image source={require('./../../../../Contains/Image/flash.png')} style={styles.image} />}
               </View>
               <View style={{flex:5}}>
                  <Text style={styles.t_shipping}>{isExpress ? 'Hỏa Tốc' : 'Tiết kiệm'}</Text>
                  <Text style={{color:'red'}}><Text style={styles.t_initmoney}>đ</Text> {item.price} -<Text style={{ color: 'blue' }}>- {item.distance} km</Text></Text>
               </View>
            </View>
            <View style={{ flexDirection: 'row', marginHorizontal:20}}>
               <Icon name='location-on' size={20}/>
               <Text style={{marginLeft:10}}>{item.sender_address}</Text>
            </View>
         </TouchableOpacity>
      )
   }

   const getItem = (item) => {
      navigation.navigate('detailOrder', { 
         data : item,
         status: 2
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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f8fa', marginTop:5 }}>
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
            />
         )}


      </SafeAreaView>
   )
}

export default Delivery

const styles = StyleSheet.create({
   t_initmoney: {
      textDecorationLine: 'underline',
      fontWeight:'bold',
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