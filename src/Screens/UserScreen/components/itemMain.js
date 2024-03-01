import React from "react"
import { TouchableOpacity, Text, StyleSheet, View } from "react-native"
import { Fontisto, MaterialIcons } from "../../../Assets/icon"
import color from "../../../Assets/color"

export const ItemMain = ({
    nameIcon,
    colorIcon,
    onPress,
    style,
    infor,
    unit,
    label
}) => (
    <TouchableOpacity style={style} onPress={onPress}>
        <View style={styles.icon}>
            <MaterialIcons name={nameIcon} size={25} color={colorIcon} />
        </View>
        <Text style={styles.t_member}>{label}</Text>
        <Text style={styles.t_point}>{infor} {unit}</Text>
        <View style={styles.iconRight}>
            <Fontisto name='angle-right' size={18} color={color.silver} />
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    icon: {
        flex: 1,
        alignItems: 'center'
    },
    iconRight: {
        flex: 0.9,
    },
    t_member: {
        fontWeight: 'bold',
        fontSize: 15,
        flex: 3,
    },
    t_point: {
        flex: 3,
        textAlign: 'right',
        marginRight: 5
    }
})