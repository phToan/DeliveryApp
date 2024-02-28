import React from "react"
import { View, TouchableOpacity, Text } from "react-native"
import { Entypo } from "../../Assets/icon"
import { styles } from "./styles"

export const ItemSearchAddress = ({ onPress, item }) => (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
        <View style={{ flex: 1 }}>
            <View style={styles.icon}>
                <Entypo name='location-pin' size={20} color={'#616563'} />
            </View>
        </View>
        <View style={{ flex: 9 }}>
            <Text style={{ fontWeight: '500' }}>{item.description}</Text>
        </View>
    </TouchableOpacity>
)

