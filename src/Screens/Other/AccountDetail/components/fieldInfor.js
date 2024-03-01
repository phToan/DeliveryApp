import React from "react"
import { FontAwesome } from "../../../../Assets/icon"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

const styles = StyleSheet.create({
    layoutItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderBottomWidth: .2,
        borderColor: 'silver'
    },
    textItem: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black'
    }
})

export const FieldInfor = ({ infor, label }) => (
    <View style={styles.layoutItem}>
        <Text style={styles.textItem}>{label}</Text>
        <Text>{infor}</Text>
    </View>
)

export const FieldLabel = ({
    labelStyle,
    onPress,
    label
}) => (
    <View style={styles.layoutItem}>
        <Text style={labelStyle}>{label}</Text>
        <TouchableOpacity onPress={onPress} style={{ padding: 3 }} >
            <FontAwesome name='pencil' color={'darkorange'} size={25} />
        </TouchableOpacity>
    </View>
)