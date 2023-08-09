import React from 'react'
import { View, SafeAreaView, Text } from 'react-native'
import Waiting from './waiting';
import Confirm from './confirm';
import Delivery from './delivery';
import Cancel from './cancel';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator()

const TabStatus = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                justifyContent:'flex-end',
                paddingBottom:10,
                alignItems:'center'
            }}>
                <Text style={{fontSize:18, fontWeight:'bold'}}>Trạng thái đơn hàng</Text>
            </View>
            <View style={{ flex: 12 }}>
                {Order()}
            </View>
        </SafeAreaView>
    )
}

const Order = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: '500',
                width: 100,
            },
            tabBarIndicatorStyle: {
                backgroundColor: 'darkorange'
            },
            tabBarInactiveTintColor:'black',
            tabBarActiveTintColor:'darkorange'
        }}>
            <Tab.Screen
                name='Đang chờ' component={Waiting} />
            <Tab.Screen
                name='Đang giao' component={Delivery} />
            <Tab.Screen
                name='Đã giao' component={Confirm} />
            <Tab.Screen
                name='Đã hủy' component={Cancel} />
        </Tab.Navigator>
    )
}

export default TabStatus;