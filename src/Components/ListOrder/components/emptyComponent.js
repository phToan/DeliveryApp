import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    text1: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    image: {
        width: 250,
        height: 250,
        marginTop: 70,
        marginBottom: 20
    }
})

export const EmptyComponent = () => (
    <View style={{
        alignItems: 'center'
    }}>
        <Image source={require('../../../Assets/Image/101.jpg')} style={styles.image} />
        <Text style={styles.text1}>Chưa có đơn hàng ở trạng thái này</Text>
    </View>
)