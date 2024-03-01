import React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'
import { MaterialIcons } from '../../Assets/icon'

const styles = StyleSheet.create({
    image: {
        height: 50,
        width: 50
    },
    t_initmoney: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: 16
    },
    body: {
        padding: 10,
        backgroundColor: 'white'
    },
    t_shipping: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export const OrderItem = ({ item, onPress }) => {
    const isExpress = item.infor_shipping
    return (
        <TouchableOpacity style={styles.body} onPress={() => onPress(item)}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    {isExpress == 1 ?
                        <Image source={require('../../Assets/Image/rocketicon.jpg')} style={styles.image} />
                        :
                        <Image source={require('../../Assets/Image/flash.png')} style={styles.image} />}
                </View>
                <View style={{ flex: 5 }}>
                    <Text style={styles.t_shipping}>{isExpress ? 'Hỏa Tốc' : 'Tiết kiệm'}</Text>
                    <Text style={{ color: 'red' }}><Text style={styles.t_initmoney}>đ</Text> {item.price} -<Text style={{ color: 'blue' }}>- {item.distance} km</Text></Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                <MaterialIcons name='location-on' size={20} />
                <Text style={{ marginLeft: 10 }}>{item.receiver_address}</Text>
            </View>
        </TouchableOpacity>
    )
}