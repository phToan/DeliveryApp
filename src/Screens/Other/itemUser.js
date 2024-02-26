import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'

import Icon from 'react-native-vector-icons/Fontisto'
import Icon1 from 'react-native-vector-icons/Ionicons'

const ItemUser = ({ iconName, title, colorIcon }) => {
    return (
        <View>
            <View style={{
                width: '100%',
                height: 60,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                paddingVertical: 20
            }} >
                <View style={{
                    flexDirection: 'row',
                    flex: 1,
                }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Icon1 name={iconName} size={20} color={colorIcon} />
                    </View>
                    <View style={{
                        flex: 5
                    }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{title}</Text>
                    </View>
                    <View style={{flex:1,alignItems:'center'}}>
                        <Icon name='angle-right' size={18} color={'silver'} />
                    </View>
                </View>
            </View>
            <View style={{
                borderBottomWidth: 0.3,
                borderColor: 'silver',
                marginLeft: 50
            }} />
        </View>
    )
}

export default ItemUser