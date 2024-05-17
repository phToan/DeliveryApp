import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '../../Assets/icon';
import color from '../../Assets/color';
import { TextFont } from '../Text';

const styles = StyleSheet.create({
    image: {
        height: 50,
        width: 50,
    },
    t_initmoney: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: 16,
    },
    body: {
        padding: 10,
    },
    t_shipping: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    isTaken: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 10,
    },
});

export const OrderItem = ({ item, onPress }) => {
    const isTaken = item?.driver?.id > 0 && item?.driver?.status <= 1;
    return (
        <TouchableOpacity
            style={[
                styles.body,
                {
                    backgroundColor: isTaken ? color.BackgroundGreen : 'white',
                },
            ]}
            onPress={() => onPress(item)}
        >
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    {item?.info_shipping ?? item?.infor_shipping ? (
                        <Image
                            source={require('../../Assets/Image/rocketicon.jpg')}
                            style={styles.image}
                        />
                    ) : (
                        <Image
                            source={require('../../Assets/Image/flash.png')}
                            style={styles.image}
                        />
                    )}
                </View>
                <View style={{ flex: 5 }}>
                    <Text style={styles.t_shipping}>
                        {item?.info_shipping ?? item?.infor_shipping
                            ? 'Hỏa Tốc'
                            : 'Tiết kiệm'}
                    </Text>
                    <Text style={{ color: 'red' }}>
                        <Text style={styles.t_initmoney}>đ</Text> {item.price} -
                        <Text style={{ color: 'blue' }}>
                            - {item.distance} km
                        </Text>
                    </Text>
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: 20,
                    marginTop: 5,
                }}
            >
                <MaterialIcons name="location-on" size={20} />
                <TextFont
                    title={
                        item?.receiver_address ?? item?.receiverInfo?.address
                    }
                    ml={10}
                    fs={15}
                />
            </View>
            {isTaken && (
                <View style={styles.isTaken}>
                    <MaterialCommunityIcons
                        name="truck-fast"
                        color={color.StatusGreen}
                        size={30}
                    />
                    <TextFont
                        title={'Tài xế đang đến lấy hàng'}
                        color={color.StatusGreen}
                        fs={15}
                    />
                </View>
            )}
        </TouchableOpacity>
    );
};
