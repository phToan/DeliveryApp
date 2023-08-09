import React, { useState, useEffect, useContext } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/FontAwesome'
import { RNSVGDefs } from 'react-native-svg'
import AppContext from '../../../Context/AppContext'

const DetailOrder = ({ route }) => { 
    const {reload, setReload} = useContext(AppContext)
    const navigation = useNavigation()
    const item = route.params?.newItem
    const onClickReturn = () => {
        navigation.navigate('BottomTab', { screen: 'Đơn hàng' })
    }
    const delItem = {id : item.id}
    const onClickDelete = () =>{
        // console.log(item.id)
        navigation.navigate('waiting', {delItem})
        // setReload(true)
    }
    let description = ''
    if (item.orderDescription) {
        description = 'nhỏ gọn'
    } else {
        description = 'cồng kềnh'
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: 'orange' }} />
                <View style={{
                    flex: 2,
                    backgroundColor: "white",
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity onPress={onClickReturn}>
                        <Icon name='arrowleft' size={25} color={'darkorange'} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: '500', marginLeft: 15 }}>Thông tin đơn hàng</Text>
                </View>
            </View>
            <View style={{
                flex: 7,
                backgroundColor: 'white',

            }}>
                <ScrollView>
                    <View style={{
                        backgroundColor: '#0fc478',
                        padding: 10,
                        flexDirection: 'row'
                    }}>
                        <View style={{ flex: 4 }}>
                            <Text style={{ fontWeight: '500', color: 'white', fontSize: 15 }}>Đang tìm tài xế</Text>
                            <Text style={{ color: 'white', marginTop: 5 }}>Đang tìm tài xế xung quanh địa điểm lấy hàng, vui lòng chờ trong một vài phút</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Icon1 name='account-search' size={35} color={'white'} />
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: 'white',
                        padding: 10,
                        borderBottomWidth: .3,
                        borderColor: 'silver'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Icon1 name='truck-fast-outline' size={25} color={'orange'} />
                            <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Thông tin vận chuyển</Text>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            {item.expressShip ? <Text>Hỏa tốc</Text> : <Text>Nhanh</Text>}
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                                <Icon2 name='dot-single' size={30} color={'#0fc478'} />
                                <Text style={{ color: '#0fc478' }}>Thời gian đặt đơn</Text>
                            </View>
                            <View style={{
                                borderLeftWidth: 0.3,
                                borderColor: 'silver',
                                marginLeft: 20
                            }}>
                                <Text style={{ marginLeft: 10 }}>{item.creatAt}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: 'white',
                        borderBottomWidth: .3,
                        borderColor: 'silver',
                        padding: 10
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Lộ trình .</Text>
                                <Text>{item.distance} km</Text>
                            </View>

                            <TouchableOpacity style={{
                                borderWidth: 0.5,
                                padding: 5,
                                borderColor: 'red'
                            }}>
                                <Text style={{ color: 'red' }}>Xem đường đi</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            padding: 10,
                            borderWidth: .5,
                            borderColor: 'darkorange',
                            marginTop: 10,
                            borderRadius: 5,
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                marginHorizontal: 5,
                                alignItems: 'flex-end',
                                flex: 1
                            }}>
                                <Icon2 name='location' size={25} color={'darkorange'} />

                            </View>
                            <View style={{ marginHorizontal: 10, flex: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Địa chỉ lấy hàng</Text>
                                <Text>{item.senderName} | {item.senderPhone}</Text>
                                <Text>{item.senderAddress}</Text>
                                <View style={{
                                    borderWidth: 0.2,
                                    borderRadius: 1,
                                    padding: 5,
                                    marginTop: 5
                                }}>
                                    <Text style={{ fontSize: 12, color: '#8ea199' }}>Địa chỉ chi tiết</Text>
                                    <Text>{item.detailSenderAddress}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            borderWidth: .5,
                            borderColor: '#079124',
                            flexDirection: 'row',
                            padding: 10,
                            marginTop: 5,
                            borderRadius: 5
                        }}>
                            <View style={{
                                flex: 1,
                                marginHorizontal: 5,
                                alignItems: 'flex-end'
                            }}>
                                <Icon3 name='location-arrow' size={25} color={'#079124'} />

                            </View>
                            <View style={{ marginHorizontal: 10, flex: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Địa chỉ giao hàng</Text>
                                <Text>{item.recieverName} | {item.recieverPhone}</Text>
                                <Text>{item.recieverAddress}</Text>
                                <View style={{
                                    borderWidth: 0.2,
                                    borderRadius: 1,
                                    padding: 5,
                                    marginTop: 5
                                }}>
                                    <Text style={{ fontSize: 12, color: '#8ea199' }}>Địa chỉ chi tiết</Text>
                                    <Text>{item.detailRecieverAddress}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        backgroundColor: 'white',
                        padding: 10,
                    }}>
                        <Icon name='carryout' size={25} color={'darkorange'} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: '500', }}>Chi tiết đơn hàng</Text>
                            <Text style={{ marginTop: 5, color: 'orange' }}>Mặt hàng {description}</Text>
                            <View style={{
                                borderWidth: .2,
                                borderRadius: 2,
                                padding: 5,
                                width: '100%',
                                marginTop: 5
                            }}>
                                <Text style={{ fontSize: 12, color: '#8ea199' }}>Mô tả mặt hàng</Text>
                                <Text>{item.orderInfor}</Text>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </View>
            <View style={{
                flex: 0.5,
                flexDirection:'row'
            }}>
                <View style={{
                    backgroundColor: 'orange',
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex:1.5
                }}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>Thành tiền</Text>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.price}đ</Text>
                </View>
                <TouchableOpacity style={{
                    flex:1,
                    backgroundColor:'red',
                    justifyContent:'center'
                }} activeOpacity={0.5} onPress={onClickDelete}>
                    <Text style={{fontSize:18,fontWeight:'bold',color:'white',textAlign:'center'}}>Hủy đơn</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    )
}

export default DetailOrder

const styles = StyleSheet.create({

})

