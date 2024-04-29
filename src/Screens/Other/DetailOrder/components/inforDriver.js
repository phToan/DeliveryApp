import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { FontAwesome5 } from "../../../../Assets/icon"
const styles = StyleSheet.create({
    driver: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 5,
    },
    label_driver: {
        flexDirection: 'row'
    },
    inforDriver: {
        flexDirection: 'row'
    },
    phone: {
        marginTop: 3,
        textDecorationLine: 'underline',
        // color: 'red',
        fontSize: 15
    },
    icon: {
        borderWidth: .5,
        padding: 10,
        marginTop: 10
    }
})

export const InforDriver = ({
    onPress,
    driver,
    id
}) => (
    id != 0 &&
    <View style={styles.driver}>
        <View style={styles.label_driver}>
            <FontAwesome5 name="house-user" size={20} />
            <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 5 }}>Thông tin tài xế</Text>
        </View>
        <View style={styles.inforDriver}>
            <FontAwesome5 name="user-alt" size={50} style={styles.icon} color={'silver'} />
            <View style={{ marginLeft: 10 }}>
                <Text style={{ marginTop: 5 }}>Họ tên: {driver.name}</Text>
                <Text style={{ marginTop: 3 }}>Năm sinh: {driver.dob}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginTop: 4 }}>Số điện thoại: </Text>
                    <TouchableOpacity onPress={onPress}>
                        <Text style={styles.phone}>{driver.phone}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ marginTop: 3 }}>Số xe: {driver.vehicle_num}</Text>
            </View>
        </View>

    </View>
)