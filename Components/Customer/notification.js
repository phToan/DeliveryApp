import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native'
import color from '../../Contains/color'
import Icon from 'react-native-vector-icons/Ionicons'

const data = [
    { id: 1, value: 'item1' , iconName:'location-sharp',color:'blue'},
    { id: 2, value: 'item2' , iconName:'location-sharp',color:'blue'},
    { id: 3, value: 'item3' , iconName:'location-sharp',color:'blue'},
    { id: 4, value: 'item4' , iconName:'location-sharp',color:'blue'},
    { id: 5, value: 'item5' , iconName:'location-sharp',color:'blue'},
    { id: 6, value: 'item1' , iconName:'location-sharp',color:'blue'},
    { id: 7, value: 'item2' , iconName:'location-sharp',color:'blue'},
    { id: 8, value: 'item3' , iconName:'location-sharp',color:'blue'},
    { id: 9, value: 'item4' , iconName:'location-sharp',color:'blue'},
    { id: 10, value: 'item5' , iconName:'location-sharp',color:'blue'},
]

const Notification = ({navigation}) => {
    const [listItems, setListItems] = useState(data)
    const [notifiText, setNotifiText] = useState('Thông báo')
    const [dateTime, setDateTime] = useState('26/05/2023, 00:35')
    const ItemView = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => getItem(item)}
                style={{
                    height: 90,
                    justifyContent: 'center',
                    backgroundColor: color.base,
                }}>
                <View style={{
                    flexDirection: 'row',
                    
                }}>
                    <View style={{
                        borderRadius: 100,
                        backgroundColor: '#FEEBD0',
                        paddingVertical: 5,
                        paddingHorizontal:7,
                        marginHorizontal: 15
                    }}>
                        < Icon name='notifications' color={color.orange} size={24} />
                    </View>
                    <View>
                        <Text style={{
                            fontWeight:'bold'
                        }}>{notifiText} </Text>
                        <Text>{dateTime}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    const getItem = (item) => {
        alert('ID: ' + item.id + ' value:  ' + item.value)
    }
    const ItemSeparatorView = () => {
        return (
            <View style={{
                height: 0.5,
                width: '100%',
                backgroundColor: '#c8c8c8',
                marginLeft: 60
            }} />
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingVertical: 10,
                flex: 1,
                alignItems: 'flex-end',
                backgroundColor: color.white
            }}>
                <Text style={{
                    color: color.black,
                    fontSize: 22
                }}>Thông báo</Text>
            </View>
            <View style={{
                flex: 11,
                marginVertical: 5,
                backgroundColor: color.white
            }}>
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

const styles = StyleSheet.create({

})