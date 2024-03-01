import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Fontisto, Ionicons } from '../../../Assets/icon'

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingVertical: 20
    },
    icon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        flex: 5,
        fontWeight: 'bold',
        fontSize: 15
    },
    icon2: {
        flex: 1,
        alignItems: 'center'
    },
    separator: {
        borderBottomWidth: 0.3,
        borderColor: 'silver',
        marginLeft: 50
    }
})

const ItemUser = ({ iconName, title, colorIcon, onPress }) => {
    return (
        <>
            <TouchableOpacity style={styles.body} onPress={onPress}>
                <View style={styles.icon}>
                    <Ionicons name={iconName} size={20} color={colorIcon} />
                </View>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.icon2}>
                    <Fontisto name='angle-right' size={18} color={'silver'} />
                </View>
            </TouchableOpacity>
            <View style={styles.separator} />
        </>
    )
}

export default ItemUser