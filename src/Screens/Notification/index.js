import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native'
import color from '../../Assets/color'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

const data = [
    { id: 1, value: 'item1', iconName: 'location-sharp', color: 'blue' },
    { id: 2, value: 'item2', iconName: 'location-sharp', color: 'blue' },
    { id: 3, value: 'item3', iconName: 'location-sharp', color: 'blue' },
    { id: 4, value: 'item4', iconName: 'location-sharp', color: 'blue' },
    { id: 5, value: 'item5', iconName: 'location-sharp', color: 'blue' },
    { id: 6, value: 'item1', iconName: 'location-sharp', color: 'blue' },
    { id: 7, value: 'item2', iconName: 'location-sharp', color: 'blue' },
    { id: 8, value: 'item3', iconName: 'location-sharp', color: 'blue' },
    { id: 9, value: 'item4', iconName: 'location-sharp', color: 'blue' },
    { id: 10, value: 'item5', iconName: 'location-sharp', color: 'blue' },
]

const Notification = ({ navigation }) => {
    const [listItems, setListItems] = useState(data)
    const [notifiText, setNotifiText] = useState('Thông báo')
    const [dateTime, setDateTime] = useState('26/05/2023, 00:35')
    const ItemView = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => getItem(item)}
                style={styles.item}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.item_icon}>
                        < Icon name='notifications' color={color.orange} size={24} />
                    </View>
                    <View>
                        <Text style={styles.item_title}>{notifiText} </Text>
                        <Text>{dateTime}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }
    const getItem = (item) => {
        alert('ID: ' + item.id + ' value:  ' + item.value)
    }
    const ItemSeparatorView = () => (
        <View style={styles.item_separator} />
    )
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.header_title}>Thông báo</Text>
            </View>
            <View style={styles.body}>
                <FlatList
                    data={listItems}
                    renderItem={ItemView}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={ItemSeparatorView}
                />
            </View>
        </SafeAreaView>
    )
}

export default Notification

