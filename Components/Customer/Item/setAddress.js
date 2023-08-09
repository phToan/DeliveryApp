import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/Entypo'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MapView, { Marker } from 'react-native-maps'
import axios from 'axios';
import * as Location from 'expo-location';


const SetAddressSender = ({navigation}) => {
   const API_KEY = 'AIzaSyCS-qxrrYUPQH_R_ZfLdHhqlnGSOwtIhRs'
   const [detailAddress, setDetailAddress] = useState('')
   const [searchTerm, setSearchTerm] = useState('');
   const [predictions, setPredictions] = useState([])
   const [latitude, setLatitude] = useState(null)
   const [longitude, setLongitude] = useState(null)
   const [region, setRegion] = useState(null);
   const [address, setAddress] = useState('');

   const handleSearch = async (text) => {
      setSearchTerm(text)
      const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&components=country:VN&key=${API_KEY}`
      try {
         const response = await fetch(apiUrl);
         const data = await response.json();
         if (data.predictions) {
            setPredictions(data.predictions);
         }
      } catch (error) {
         console.error(error);
      }
   }

   const onClickConfirm = async () => {
      // await AsyncStorage.setItem('setCurrAddress',address)
      navigation.navigate('detailedAddressSender',{ data: address })
   }

   const onClickReturn = () => {
      navigation.goBack()
   }


   useEffect(() => {
      const getLocationCoordinates = async () => {
         setAddress(await AsyncStorage.getItem('setCurrPos'))
         let { status } = await Location.requestForegroundPermissionsAsync();
         if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
         }
         let location = await Location.getCurrentPositionAsync({});
         const { latitude, longitude } = location.coords;
         setLatitude(latitude);
         setLongitude(longitude);
         // try {
         //    const response = await axios.get(
         //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${API_KEY}`
         //    )
         //    const data = response.data;
         //    if (data.status === 'OK' && data.results.length > 0) {
         //       setAddress(data.results[0].formatted_address)
         //    }
         // } catch (error) {
         //    console.log(error.message)
         // }
      }
      getLocationCoordinates()
   },[]);

   const onClickItem = async (item) => {
      setSearchTerm(item.description)
      setPredictions([])
      try {
         const itemLocate = item.description
         const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${itemLocate}&key=${API_KEY}`)
         const data = response.data
         // console.log(data)
         if (data.status === 'OK' && data.results.length > 0) {
            setAddress(data.results[0].formatted_address)
            console.log(address)
            const location = data.results[0].geometry.location
            setLatitude(location.lat)
            setLongitude(location.lng)
            setRegion({
               latitude: location.lat,
               longitude: location.lng,
               latitudeDelta: 0.008,
               longitudeDelta: 0.008,
            })
         }
      } catch (error) {
         console.log(error.message)
      }
   }

   const renderItem = ({ item }) => {
      return (
         <TouchableOpacity style={{
            height: 50,
            flexDirection: 'row',
            alignItems: 'center'
         }} onPress={() => onClickItem(item)}>
            <View style={{ flex: 1 }}>
               <View style={{
                  padding: 3,
                  backgroundColor: '#d3dad7',
                  marginHorizontal: 7,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5
               }}>
                  <Icon3 name='location-pin' size={20} color={'#616563'} />
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
         <View style={{
            height: 0.5,
            width: '100%',
            backgroundColor: '#c8c8c8',
            marginLeft: 40
         }} />
      )
   }

   const calculateDelta = () => {
      const LATITUDE_DELTA = 0.01
      const LONGITUDE_DELTA = 0.01
      return {
         latitudeDelta: LATITUDE_DELTA,
         longitudeDelta: LONGITUDE_DELTA,
      };
   };
   return (
      <SafeAreaView style={{ flex: 1 }}>
         <View style={{ height: 35, backgroundColor: 'darkorange' }} />
         <View style={{
            flexDirection: 'row',
            paddingHorizontal: 5,
            paddingVertical: 10,
            backgroundColor: 'white',
            // flex: 1.3
            height: 70
         }}>
            <TouchableOpacity style={{
               borderWidth: 0.2,
               borderColor: 'darkorange',
               flex: 1,
               borderRadius: 100,
               backgroundColor: 'white',
               justifyContent: 'center',
               alignItems: 'center'
            }} onPress={onClickReturn}>
               <Icon name='arrowleft' size={25} />
            </TouchableOpacity>
            <View style={styles.textInput}>
               <TextInput
                  style={{}}
                  onChangeText={handleSearch}
                  value={searchTerm}
                  placeholder='Tìm kiếm ở đây'
                  placeholderTextColor={'black'}
               />
            </View>
         </View>

         <View style={{ flex: 18 }}>
            <View style={{ marginTop: 10, backgroundColor: 'white' }}>
               <FlatList
                  data={predictions}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.place_id}
                  ItemSeparatorComponent={ItemSeparatorView}
               />
            </View>


            {latitude && longitude && (
               <MapView
                  style={{ flex: 1 }}
                  initialRegion={{
                     latitude,
                     longitude,
                     ...calculateDelta(),
                  }}
                  region={region}
               >
                  <Marker coordinate={{ latitude, longitude }} />
               </MapView>
            )}

            {/* {currentLocation ? (
               <MapView
                  style={{ flex: 1 }}
                  initialRegion={{
                     latitude: currentLocation.latitude,
                     longitude: currentLocation.longitude,
                     // latitude: latitude,
                     // longitude: longitude,
                     latitudeDelta: 0.0922,
                     longitudeDelta: 0.0421,
                  }}
                  region={{
                     latitude: currentLocation.latitude,
                     longitude: currentLocation.longitude,
                     latitudeDelta: 0.01, // Điều chỉnh giá trị này để phóng to bản đồ
                     longitudeDelta: 0.01, // Điều chỉnh giá trị này để phóng to bản đồ
                  }}
               >
                  <Marker
                     coordinate={{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                     }}
                     title="Vị trí hiện tại"
                  />
               </MapView>

            ) : (
               <Text>Loading...</Text>
            )} */}
         </View>

         <View style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 15,
            borderBottomWidth: 0.2,
            borderColor: '#8f8f99',
            flex: 1.1
         }}>
            <View style={{ paddingHorizontal: 5, flex: 1, justifyContent: 'center' }}>
               <Icon1 name='ios-locate-sharp' size={25} color={'blue'} />
            </View>
            <View style={{ flex: 8 }}>
               <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{address}</Text>
            </View>
         </View>

         <TouchableOpacity style={{
            backgroundColor: 'darkorange',
            paddingVertical: 13,
            flex: 1,
            justifyContent: 'center'
         }} onPress={onClickConfirm}>
            <Text style={{
               textAlign: 'center',
               fontSize: 20,
               fontWeight: 'bold',
               color: 'white',
            }}>Xác nhận địa chỉ</Text>
         </TouchableOpacity>

      </SafeAreaView>
   )
}

export default SetAddressSender

const styles = StyleSheet.create({
   textInput: {
      borderWidth: 1,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 10,
      flex: 6,
      marginHorizontal: 5
   },
})