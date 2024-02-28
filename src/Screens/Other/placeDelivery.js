import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native'
import color from '../../Assets/color'
import { AntDesign, MaterialCommunityIcons, Entypo } from '../../Assets/icon'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as NameScreen from '../../Constants/NameScreen'
import { useDispatch, useSelector } from 'react-redux'
import { receiverAddress, latitude, longitude } from '../../Redux/Reducers/receiverSlice'

const PlaceDelivery = ({ navigation }) => {
   const dispatch = useDispatch()
   const API_KEY = 'uGwlo6yHxKnoqSPqp0Enla92wOd1YpmpbYrEy3GK'
   const [searchTerm, setSearchTerm] = useState('');
   const [predictions, setPredictions] = useState([]);
   const addressDetail = useSelector((state) => state.senderSlice.address)
   const handleSearch = async (text) => {
      setSearchTerm(text);
      const apiUrl = `https://rsapi.goong.io/Place/AutoComplete?input=${text}&components=country:VN&api_key=${API_KEY}`;
      try {
         const response = await fetch(apiUrl);
         const data = await response.json();
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
   const onClickReturn = () => {
      navigation.navigate('Trang chủ')
   }
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
      await fetch(`https://rsapi.goong.io/Geocode?address=${encodeURIComponent(address)}&api_key=${API_KEY}`)
         .then((response) => response.json())
         .then(async (data) => {
            if (data.results && data.results.length > 0) {
               const { lat, lng } = data.results[0].geometry.location;
               await AsyncStorage.setItem('destination', `${lat},${lng}`)
               await AsyncStorage.setItem('destination_lat', `${lat}`)
               await AsyncStorage.setItem('destination_long', `${lng}`)
               dispatch(latitude(lat))
               dispatch(longitude(lng))
            } else {
               console.error('Không thể lấy được toạ độ từ địa chỉ');
            }
         })
         .catch((error) => {
            console.error('Lỗi:', error);
         });
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

   // useEffect(() => {
   //    const getData = async () => {
   //       setAddressDetail(await AsyncStorage.getItem('setCurrPos'))
   //    }
   //    getData()
   // }, [])

   const renderItem = ({ item }) => {
      return (
         <TouchableOpacity style={styles.container_item} onPress={() => onClickItem(item)}>
            <View style={{ flex: 1 }}>
               <View style={styles.location_icon_item}>
                  <Entypo name='location-pin' size={20} color={'#616563'} />
               </View>
            </View>
            <View style={{ flex: 9 }}>
               <Text style={{ fontWeight: '500' }}>{item.description}</Text>
            </View>
         </TouchableOpacity>
      )
   }

   const ItemSeparatorView = () => {
      return (
         <View style={styles.separatorView} />
      )
   }

   return (
      <SafeAreaView>
         <View style={{ height: 35, backgroundColor: color.orange, }} />
         <View style={styles.header}>
            <TouchableOpacity onPress={onClickReturn} style={{ flex: 1, alignItems: 'center' }}>
               <AntDesign name='close' color={color.black} size={25} />
            </TouchableOpacity>
            <View style={{ flex: 7, alignItems: 'center', }}>
               <Text style={styles.title_header}>Địa điểm giao hàng</Text>
            </View>
            <View style={{ flex: 1 }} />
         </View>
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
                  renderItem={renderItem}
                  keyExtractor={(item) => item.place_id}
                  ItemSeparatorComponent={ItemSeparatorView}
               />
            </View>
            :
            <View>
               <TouchableOpacity style={styles.bt_select_location_on_map} onPress={onClickSelectOnMap}>
                  <View style={styles.icon_select_location_on_map}>
                     <Entypo name='location' size={20} color={'#eb4027'} />
                  </View>
                  <View>
                     <Text style={styles.title_select_location_on_map}>Chọn vị trí trên bản đồ</Text>
                  </View>
               </TouchableOpacity>

               <TouchableOpacity style={styles.bt_select_current_location} onPress={onClickConfirm}>
                  <View style={styles.icon_select_current_location}>
                     <Entypo name='direction' size={20} color={'#eb4027'} style={{ backgroundColor: '#f9dbca', padding: 3 }} />
                  </View>
                  <View style={{ flex: 8 }}>
                     <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Lấy vị trí hiện tại</Text>
                     <Text>{addressDetail}</Text>
                  </View>
               </TouchableOpacity>

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

const styles = StyleSheet.create({
   separatorView: {
      height: 0.5,
      backgroundColor: '#c8c8c8',
      marginLeft: 40
   },
   container_item: {
      height: 50,
      flexDirection: 'row',
      alignItems: 'center'
   },
   location_icon_item: {
      padding: 3,
      backgroundColor: '#d3dad7',
      marginHorizontal: 7,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5
   },
   header: {
      height: 55,
      backgroundColor: color.base,
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 0.2,
      borderColor: 'orange'
   },
   title_header: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black'
   },
   input_search: {
      flexDirection: 'row',
      height: 55,
      borderBottomWidth: 0.5,
      backgroundColor: 'white',
      borderColor: 'orange',
      alignItems: 'center'
   },
   bt_select_location_on_map: {
      height: 65,
      marginTop: 10,
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center'
   },
   icon_select_location_on_map: {
      marginHorizontal: 10,
      backgroundColor: '#f9dbca',
      marginVertical: 15,
      padding: 3
   },
   title_select_location_on_map: {
      fontWeight: 'bold',
      fontSize: 16,
      color: 'darkorange'
   },
   bt_select_current_location: {
      height: 65,
      marginTop: 10,
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center'
   },
   icon_select_current_location: {
      flex: 1,
      alignItems: 'center',
   },
   body_saved_location: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      marginHorizontal: 10,
      borderBottomWidth: 0.5
   },
   container_saved_location: {
      marginTop: 10,
      backgroundColor: 'white',
      height: 110
   },
   bt_add_location: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
   },

})