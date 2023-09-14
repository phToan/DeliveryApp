import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native'
import color from '../../../Contains/color'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-async-storage/async-storage'

const PlaceDelivery = ({ navigation }) => {
    const API_KEY = 'uGwlo6yHxKnoqSPqp0Enla92wOd1YpmpbYrEy3GK'
    const [addressDetail, setAddressDetail] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const [predictions, setPredictions] = useState([]);

    const handleSearch = async (text) => {
        setSearchTerm(text);
        const apiUrl = `https://rsapi.goong.io/Place/AutoComplete?input=${text}&components=country:VN&api_key=${API_KEY}`;
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
    const onClickReturn = () => {
        navigation.navigate('Trang chủ')
    }
    const onClickConfirm = async () => {
        navigation.navigate('shipmentDetails')
        await AsyncStorage.setItem('itemSelected', addressDetail)
        getReceiverCoordinates(addressDetail)
    }
    const onClickItem = async (item) => {
        await AsyncStorage.setItem('itemSelected', item.description)
        getReceiverCoordinates(item.description)
        navigation.navigate('shipmentDetails')
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
                } else {
                    console.error('Không thể lấy được toạ độ từ địa chỉ');
                }
            })
            .catch((error) => {
                console.error('Lỗi:', error);
            });
    }
    const onClickAddAddress = () => {
        navigation.navigate('addPlace')
    }
    const onClickToViewSavedAddress = () => {
        navigation.navigate('savedPlace')
    }
    const onClickSelectOnMap = () => {
        navigation.navigate('map')
    }

    useEffect(() => {
        const getData = async () => {
            setAddressDetail(await AsyncStorage.getItem('setCurrPos'))
        }
        getData()
    }, [])

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

    return (
        <SafeAreaView>
            <View style={{ height: 35, backgroundColor: color.orange, }} />
            <View style={{
                height: 55,
                backgroundColor: color.base,
                flexDirection: "row",
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: 0.2,
                borderColor: 'orange'
            }}>
                <TouchableOpacity onPress={onClickReturn} style={{ flex: 1, alignItems: 'center' }}>
                    <Icon name='close' color={color.black} size={25} />
                </TouchableOpacity>
                <View style={{ flex: 7, alignItems: 'center', }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Địa điểm giao hàng</Text>
                </View>
                <View style={{ flex: 1 }} />
            </View>
            <View style={{
                flexDirection: 'row',
                height: 55,
                borderBottomWidth: 0.5,
                backgroundColor: 'white',
                borderColor: 'orange',
                alignItems: 'center'
            }}>
                <View style={{ marginHorizontal: 8 }}>
                    <Icon2 name='arrow-down-box' size={27} color={color.orange} />
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
                    <TouchableOpacity style={{
                        height: 65,
                        marginTop: 10,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }} onPress={onClickSelectOnMap}>
                        <View style={{
                            marginHorizontal: 10,
                            backgroundColor: '#f9dbca',
                            marginVertical: 15,
                            padding: 3
                        }}>
                            <Icon3 name='location' size={20} color={'#eb4027'} />
                        </View>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'darkorange' }}>Chọn vị trí trên bản đồ</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        height: 65,
                        marginTop: 10,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }} onPress={onClickConfirm}>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                        }}>
                            <View style={{
                                backgroundColor: '#f9dbca',
                                padding: 3,
                            }}>
                                <Icon3 name='direction' size={20} color={'#eb4027'} />
                            </View>
                        </View>
                        <View style={{ flex: 8 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Lấy vị trí hiện tại</Text>
                            <Text>{addressDetail}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        marginTop: 10,
                        backgroundColor: 'white',
                        height: 110
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: 12,
                            marginHorizontal: 10,
                            borderBottomWidth: 0.5
                        }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Địa điểm đã lưu</Text>
                            <TouchableOpacity onPress={onClickToViewSavedAddress}>
                                <Text style={{ fontWeight: 'bold', color: 'darkorange', fontSize: 16 }}>Xem tất cả</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 10,

                        }} onPress={onClickAddAddress}>
                            <View style={{
                                marginHorizontal: 10
                            }}>
                                <Icon3 name='squared-plus' size={23} color={'darkorange'} />
                            </View>
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Thêm mới</Text>
                                <Text style={{ fontSize: 14 }}>Lưu địa điểm thân quen của bạn</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        padding: 15,
                        backgroundColor: 'white',
                        marginTop: 20,

                    }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Thường được sử dụng</Text>
                    </View>
                    <View style={{
                        marginTop: 3,
                        backgroundColor: 'white'
                    }}>

                    </View>
                </View>
            }
        </SafeAreaView>
    )
}

export default PlaceDelivery

const styles = StyleSheet.create({

})