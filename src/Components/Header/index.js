import React, { memo } from "react"
import { View, TouchableOpacity, Text } from "react-native"
import { AntDesign } from "../../Assets/icon"

export const Header = memo((onClickReturn) => {
    console.log('rerender HEADER')
    return (
        <View style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingBottom: 15,
            backgroundColor: 'white',
            borderBottomWidth: 1,
            borderColor: 'darkorange',
            height: 80,
            alignItems: 'flex-end'
        }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={onClickReturn}>
                <AntDesign name='arrowleft' size={25} />
            </TouchableOpacity>
            <Text style={{ flex: 5, textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Thanh toán</Text>
            <View style={{ flex: 1 }} />
        </View>
    )

})