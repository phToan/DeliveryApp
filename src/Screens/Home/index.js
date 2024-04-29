import React, { useEffect, useContext, useCallback } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios';
import AppContext from '../../Context/AppContext'
import { styles } from './styles'
import * as NameScreen from '../../Constants/NameScreen'
import { useDispatch, useSelector } from 'react-redux'
import { senderAddress } from '../../Redux/Reducers/senderSlice'
import { Map } from '../../Components/MapView'
import { SaveLocate } from '../../Redux/Reducers/currentLocateSlice'
import { SwiperView } from './components/swiper'

const Home = ({ navigation }) => {
    const dispatch = useDispatch()
    const { address, setAddress } = useContext(AppContext)
    const coord = useSelector((state) => state.senderSlice)
    const onClickDetailedAddress = async () => {
        navigation.navigate(NameScreen.TAKE_ORDER_PLACE)
    }
    const onClickPlaceDelivery = () => {
        navigation.navigate(NameScreen.DELIVERY_PLACE)
    }

    const getLocation = useCallback(async () => {
        try {
            const response = await axios.get(`https://rsapi.goong.io/Geocode?api_key=uGwlo6yHxKnoqSPqp0Enla92wOd1YpmpbYrEy3GK&latlng=${coord.latitude},${coord.longitude}`)
            const data = response.data
            if (data.status === 'OK' && data.results.length > 0) {
                const located = data.results[1].formatted_address
                dispatch(senderAddress(located))
                dispatch(SaveLocate({
                    address: located,
                    latitude: coord.latitude,
                    longitude: coord.longitude
                }))
                setAddress(located)
            }
        } catch (error) {
            console.error(error.message)
        }
    }, [])

    useEffect(() => {
        getLocation()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header} />
            <View style={styles.main}>
                <ScrollView>
                    <View style={styles.swiper}>
                        <SwiperView />
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
                            <Map lat={coord.latitude} lng={coord.longitude} delta={0.001} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Home

