import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Waiting from '../../Screens/OrderScreen/WaitingScreen/index';
import Confirm from '../../Screens/OrderScreen/CompletedScreen/index';
import Delivery from '../../Screens/OrderScreen/DeliveryScreen/index';
import Cancel from '../../Screens/OrderScreen/CancelScreen/index';

const Tab = createMaterialTopTabNavigator();

const Order = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    paddingTop: 40,
                    backgroundColor: 'white',
                    justifyContent: 'flex-end',
                    paddingBottom: 5,
                    alignItems: 'center',
                }}
            >
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    Trạng thái đơn hàng
                </Text>
            </View>
            <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: {
                        fontSize: 14,
                        fontWeight: '500',
                        width: 100,
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: 'darkorange',
                    },
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveTintColor: 'darkorange',
                }}
            >
                <Tab.Screen name="Đang chờ" component={Waiting} />
                <Tab.Screen name="Đang giao" component={Delivery} />
                <Tab.Screen name="Đã giao" component={Confirm} />
                <Tab.Screen name="Đã hủy" component={Cancel} />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

export default Order;
