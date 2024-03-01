import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Entypo } from "../Assets/icon"

const styles = StyleSheet.create({
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
    }
})

export const GetCurrentLocation = ({
    address,
    onPress
}) => (
    <TouchableOpacity style={styles.bt_select_current_location} onPress={onPress}>
        <View style={styles.icon_select_current_location}>
            <Entypo name='direction' size={20} color={'#eb4027'} style={{ backgroundColor: '#f9dbca', padding: 3 }} />
        </View>
        <View style={{ flex: 8 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Lấy vị trí hiện tại</Text>
            <Text>{address}</Text>
        </View>
    </TouchableOpacity>
)