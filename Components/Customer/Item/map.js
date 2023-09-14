import React, { useState, useEffect, useRef } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/Ionicons'
import { useNavigation, useRoute } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps'
import axios from 'axios';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding'
import { ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Map = () => {
   const API_KEY = 'uGwlo6yHxKnoqSPqp0Enla92wOd1YpmpbYrEy3GK'
   const navigation = useNavigation()
   Geocoder.init(API_KEY)
   const [currentLocation, setCurrentLocation] = useState(null);
   const [markerLocation, setMarkerLocation] = useState(null);
   const [markerAddress, setMarkerAddress] = useState(null);
   const mapRef = useRef(null);

   const onClickConfirm = async () => {
      await AsyncStorage.setItem('itemSelected',markerAddress)
      navigation.navigate('shipmentDetails')
   }
   const onClickReturn = () => {
      navigation.navigate('placeDelivery')
   }

   useEffect(() => {
      const getCurrentLocation = async () => {
         try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
               const location = await Location.getCurrentPositionAsync();
               const { latitude, longitude } = location.coords
               setCurrentLocation({ latitude, longitude })
               setMarkerLocation({ latitude, longitude })
               getAddressFromCoordinates(latitude, longitude)
            }
         } catch (error) {
            console.log(error.message);
         }
      }

      getCurrentLocation();
   }, [])

   const getAddressFromCoordinates = async (latitude, longitude) => {
      try {
         const response = await Geocoder.from(latitude, longitude)
         const address = response.results[1].formatted_address
         setMarkerAddress(address)
      } catch (error) {
         console.log(error.message)
      }
   }

   const handleRegionChange = async () => {
      try {
         const region = await mapRef.current.getMapBoundaries();
         const latitude = (region.northEast.latitude + region.southWest.latitude) / 2;
         const longitude = (region.northEast.longitude + region.southWest.longitude) / 2;
         setMarkerLocation({ latitude, longitude });
         getAddressFromCoordinates(latitude, longitude);
      } catch (error) {
         console.log(error.message);
      }
   }

   return (
      <SafeAreaView style={{flex:1}}>
         <View style={{ height: 40, backgroundColor: 'darkorange' }} />
         <View style={{
            flex:1,
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingTop: 10,
            backgroundColor: 'white'
         }}>
            <TouchableOpacity style={{
               borderWidth: 0.2,
               borderColor: 'darkorange',
               flex: 1,
               borderRadius: 100,
               paddingVertical: 10,
               backgroundColor: 'white',
               justifyContent: 'center',
               alignItems: 'center',
            }} onPress={onClickReturn}>
               <Icon name='arrowleft' size={25} />
            </TouchableOpacity>
            <View style={{ flex: 6, alignItems: 'center', justifyContent: 'center' }}>
               <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Kéo đến vị trí chính xác trên bản đồ</Text>
            </View>
            <View style={{ flex: 1 }} />
         </View>
         <View style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 15,
            borderBottomWidth: 0.2,
            borderColor: '#8f8f99',
            flex:1
         }}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
               <Icon1 name='ios-locate-sharp' size={25} color={'blue'} />
            </View>
            <View style={{flex:6}}>
               {markerAddress && <Text>{markerAddress}</Text>}
            </View>
         </View>
         <View style={{flex:13}}>
            {currentLocation ? (
               <MapView
                  style={{ flex: 1 }}
                  ref={mapRef}
                  initialRegion={{
                     latitude: currentLocation.latitude,
                     longitude: currentLocation.longitude,
                     latitudeDelta: 0.0012,
                     longitudeDelta: 0.0011,
                  }}
                  onRegionChangeComplete={handleRegionChange}
               >
                  <Marker coordinate={markerLocation} />
               </MapView>
            ) : (
               <Text>Loading...</Text>
            )}

         </View>
         <View style={{
            flex:1,
            backgroundColor: 'white',
            paddingHorizontal: 20,
            paddingVertical: 15
         }}>
            <TouchableOpacity style={{
               backgroundColor: '#f95634',
               paddingVertical: 13
            }} onPress={onClickConfirm}>
               <Text style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: '500',
                  color: 'white'
               }}>Xác nhận địa chỉ</Text>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   )
}

export default Map

const styles = StyleSheet.create({

})