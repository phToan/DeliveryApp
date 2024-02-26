import React, { useState, useEffect, useContext } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView } from 'react-native'
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import MapView, { Marker } from 'react-native-maps'
import axios from 'axios';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppContext from '../../Context/AppContext'
import { styles } from './styles'
import * as NameScreen from '../../Constants/NameScreen'
import { useDispatch, useSelector } from 'react-redux'
import { senderAddress } from '../../Redux/Reducers/senderSlice'

const Home = ({ navigation }) => {
    const dispatch = useDispatch()
    const { address, setAddress } = useContext(AppContext)
    const API_KEY_GEOCODE = 'uGwlo6yHxKnoqSPqp0Enla92wOd1YpmpbYrEy3GK'
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [region, setRegion] = useState(null)

    const onClickDetailedAddress = async () => {
        navigation.navigate(NameScreen.TAKE_ORDER_PLACE)
    }
    const onClickPlaceDelivery = () => {
        navigation.navigate(NameScreen.DELIVERY_PLACE)
    }

    const renderMap = async () => {
        try {
            const itemLocate = address
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${itemLocate}&key=${API_KEY_GEOCODE}`)
            const data = response.data

            setAddress(data.results[0].formatted_address)
            const location = data.results[0].geometry.location
            setLatitude(location.lat)
            setLongitude(location.lng)
            setRegion({
                latitude: location.lat,
                longitude: location.lng,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            })

        } catch (error) {
            console.log(error.message)
        }
    }

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return
        }
        let location = await Location.getCurrentPositionAsync();
        await AsyncStorage.setItem('origin', `${location.coords.latitude},${location.coords.longitude}`)
        await AsyncStorage.setItem('origin_lat', `${location.coords.latitude}`)
        await AsyncStorage.setItem('origin_long', `${location.coords.longitude}`)
        try {
            const response = await axios.get(
                `https://rsapi.goong.io/Geocode?latlng=${location.coords.latitude},${location.coords.longitude}&api_key=${API_KEY_GEOCODE}`
            )
            const data = response.data
            console.log(data)
            if (data.status === 'OK' && data.results.length > 0) {
                const locate = data.results[1].formatted_address
                await AsyncStorage.setItem('setCurrPos', locate)
                await AsyncStorage.setItem('setCurrAddress', locate)
                dispatch(senderAddress(locate))
                setAddress(locate)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        renderMap()
    }, [address])


    useEffect(() => {
        getLocation()
        renderMap()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header} />
            <View style={styles.main}>
                <ScrollView>
                    <View style={styles.swiper}>
                        <Swiper
                            loop
                            autoplay
                            horizontal
                        >
                            <Image
                                source={require('../../Assets/Image/slide1.jpg')}
                                style={styles.image}
                            />
                            <Image source={require('../../Assets/Image/slide2.jpg')}
                                style={styles.image}
                            />
                            <Image source={require('../../Assets/Image/slide3.jpg')}
                                style={styles.image}
                            />
                        </Swiper>
                    </View>

                    <View style={styles.body}>
                        <View style={styles.body_title}>
                            <Icon2 name='truck-delivery' color={'orange'} size={20} />
                            <Text style={styles.t_title}>GIAO HÀNG</Text>
                        </View>
                        <TouchableOpacity onPress={onClickDetailedAddress}>
                            <View style={styles.origin_address}>
                                <View>
                                    <View style={styles.origin_title}>
                                        <Icon1 name='stop-circle' size={16} />
                                        <Text style={styles.t_origin}>Địa điểm lấy hàng</Text>
                                    </View>
                                    <Text style={styles.t_origin_address}> {address}</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Icon name='chevron-small-right' size={20} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClickPlaceDelivery}>
                            <View style={styles.destination_address}>
                                <Icon2 name='arrow-down-box' size={20} color={'orange'} />
                                <Text style={styles.destination_title}>Bạn muốn giao hàng đến đâu ?</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.map}>
                        <Text style={styles.map_title}>XUNG QUANH CÓ GÌ?</Text>
                        <View style={styles.map_view}>
                            {latitude && longitude && (
                                <MapView
                                    style={{ flex: 1 }}
                                    initialRegion={{
                                        latitude,
                                        longitude,
                                        latitudeDelta: 0.009,
                                        longitudeDelta: 0.009
                                    }}
                                    region={region}
                                >
                                    <Marker coordinate={{ latitude, longitude }} />
                                </MapView>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </View>

        </SafeAreaView>
    )
}

export default Home

