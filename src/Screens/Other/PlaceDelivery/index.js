import React, { useState, useEffect, useCallback } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native'
import color from '../../../Assets/color'
import { AntDesign, MaterialCommunityIcons, Entypo } from '../../../Assets/icon'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as NameScreen from '../../../Constants/NameScreen'
import { useDispatch, useSelector } from 'react-redux'
import { receiverAddress, latitude, longitude } from '../../../Redux/Reducers/receiverSlice'
import { Header } from '../../../Components/Header'
import { styles } from './styles'
import { ItemSeparatorView } from '../../../Components/itemSeparator'
import { ItemSearchAddress } from '../../../Components/ItemSearchAddress'
import { GetCurrentLocation } from '../../../Components/getCurrentLocate'
import { instanceAutoComplete, instanceCoord } from '../../../Api/instance'

const PlaceDelivery = ({ navigation }) => {
   const currentLocate = useSelector((state) => state.currentLocateSlice.initialState)
   const dispatch = useDispatch()
   const API_KEY = 'uGwlo6yHxKnoqSPqp0Enla92wOd1YpmpbYrEy3GK'
   const [searchTerm, setSearchTerm] = useState('');
   const [predictions, setPredictions] = useState([]);
   const addressDetail = useSelector((state) => state.senderSlice.address)

   const handleSearch = async (text) => {
      setSearchTerm(text);
      const apiUrl = `${text}`;
      try {
         const response = await instanceAutoComplete.get(apiUrl)
         const data = await response.data;
         if (data.predictions) {
            setPredictions(data.predictions);
         }
         if (text.length == 0) {
            setPredictions([])
         }
      } catch (error) {
         console.error(error);
      }
   }
   const onClickReturn = useCallback(() => {
      navigation.navigate('Trang chủ')
   }, [])
   const onClickConfirm = async () => {
      dispatch(receiverAddress(addressDetail))
      await AsyncStorage.setItem('itemSelected', addressDetail)
      await getReceiverCoordinates(addressDetail)
      await navigation.navigate(NameScreen.ORDER_CONFIRM)
   }

   const onClickItem = async (item) => {
      dispatch(receiverAddress(item.description))
      await AsyncStorage.setItem('itemSelected', item.description)
      await getReceiverCoordinates(item.description)
      await navigation.navigate(NameScreen.ORDER_CONFIRM)
      setSearchTerm('')
      setPredictions([])
   }



   const getReceiverCoordinates = async (address) => {
      // await fetch(`https://rsapi.goong.io/Geocode?address=${encodeURIComponent(address)}&api_key=${API_KEY}`)
      //    .then((response) => response.json())
      //    .then(async (data) => {
      //       if (data.results && data.results.length > 0) {
      //          const { lat, lng } = data.results[0].geometry.location;
      //          dispatch(latitude(lat))
      //          dispatch(longitude(lng))
      //       } else {
      //          console.error('Không thể lấy được toạ độ từ địa chỉ');
      //       }
      //    })
      //    .catch((error) => {
      //       console.error('Lỗi:', error);
      //    });
      const response = await instanceCoord.get(`${address}`)
      const data = response.data
      if (data.results && data.results.length > 0) {
         const { lat, lng } = data.results[0].geometry.location;
         dispatch(latitude(lat))
         dispatch(longitude(lng))
      } else {
         console.error('Không thể lấy được toạ độ từ địa chỉ');
      }
   }

   const onClickAddAddress = () => {
      navigation.navigate(NameScreen.ADD_PLACE)
   }
   const onClickToViewSavedAddress = () => {
      navigation.navigate(NameScreen.SAVED_PLACE)
   }
   const onClickSelectOnMap = () => {
      navigation.navigate(NameScreen.MAP)
   }

   return (
      <SafeAreaView>
         <Header title='Địa điểm giao hàng' onClickReturn={onClickReturn} />
         <View style={styles.input_search}>
            <View style={{ marginHorizontal: 8 }}>
               <MaterialCommunityIcons name='arrow-down-box' size={27} color={color.orange} />
            </View>
            <View >
               <TextInput
                  style={{ height: 40, width: 400, borderColor: 'gray' }}
                  onChangeText={handleSearch}
                  value={searchTerm}
                  placeholder="Số nhà, đường, phường, quận, ..."
               />
            </View>
         </View>

         {predictions.length > 0 ?
            <View style={{ marginTop: 10, backgroundColor: 'white' }}>
               <FlatList
                  data={predictions}
                  renderItem={({ item }) => (
                     <ItemSearchAddress item={item} onPress={onClickItem} />
                  )}
                  keyExtractor={(item) => item.place_id}
                  ItemSeparatorComponent={() => (
                     <ItemSeparatorView />
                  )}
               />
            </View>
            :
            <View>
               {/* <TouchableOpacity style={styles.bt_select_location_on_map} onPress={onClickSelectOnMap}>
                  <View style={styles.icon_select_location_on_map}>
                     <Entypo name='location' size={20} color={'#eb4027'} />
                  </View>
                  <View>
                     <Text style={styles.title_select_location_on_map}>Chọn vị trí trên bản đồ</Text>
                  </View>
               </TouchableOpacity> */}

               <GetCurrentLocation address={currentLocate.address} onPress={onClickConfirm} />

               <View style={styles.container_saved_location}>
                  <View style={styles.body_saved_location}>
                     <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Địa điểm đã lưu</Text>
                     <TouchableOpacity onPress={onClickToViewSavedAddress}>
                        <Text style={{ fontWeight: 'bold', color: 'darkorange', fontSize: 16 }}>Xem tất cả</Text>
                     </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.bt_add_location} onPress={onClickAddAddress}>
                     <View style={{ marginHorizontal: 10 }}>
                        <Entypo name='squared-plus' size={23} color={'darkorange'} />
                     </View>
                     <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Thêm mới</Text>
                        <Text style={{ fontSize: 14 }}>Lưu địa điểm thân quen của bạn</Text>
                     </View>
                  </TouchableOpacity>
               </View>
            </View>
         }
      </SafeAreaView>
   )
}

export default PlaceDelivery

