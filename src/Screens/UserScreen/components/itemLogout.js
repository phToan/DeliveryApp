import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "../../../Assets/icon"
import color from "../../../Assets/color"
export const ItemLogout = ({
    onPress
}) => (
    <TouchableOpacity style={styles.logout} onPress={onPress}>
        <View style={styles.icon}>
            <Ionicons name='log-out' size={25} color={'orange'} />
        </View>
        <Text style={styles.title}>Đăng xuất</Text>
        <View style={{ flex: 1 }} />
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    logout: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: color.white,
        paddingVertical: 15,
        marginTop: 20,
        alignItems: 'center',
    },
    icon: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        flex: 4,
        fontWeight: 'bold',
        fontSize: 18,
        color: 'red',
        textAlign: 'center'
    }
})

