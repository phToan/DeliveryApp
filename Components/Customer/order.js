import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Waiting from './../Customer/Item/ordStatus/waiting';
import Confirm from './../Customer/Item/ordStatus/confirm';
import Delivery from './../Customer/Item/ordStatus/delivery';
import Cancel from './../Customer/Item/ordStatus/cancel';


const Tab = createMaterialTopTabNavigator()

const Order = ({ route }) => {
   const [screen, setScreen] = React.useState(1)
   const [order, setOrder] = React.useState({})
   let obj = {}
   React.useEffect(() => {
      if (route?.params?.data) {
         obj = route?.params?.data
         setOrder(obj)
      }
   }, [route?.params?.data])
   return (
      <SafeAreaView style={{ flex: 1 }}>
         <React.Fragment>
            <View style={{
               paddingTop: 40,
               backgroundColor: 'white',
               justifyContent: 'flex-end',
               paddingBottom: 5,
               alignItems: 'center'
            }}>
               <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Trạng thái đơn hàng</Text>
            </View>
            <Tab.Navigator
               screenOptions={{
                  tabBarLabelStyle: {
                     fontSize: 14,
                     fontWeight: '500',
                     width: 100,
                  },
                  tabBarIndicatorStyle: {
                     backgroundColor: 'darkorange'
                  },
                  tabBarInactiveTintColor: 'black',
                  tabBarActiveTintColor: 'darkorange'
               }}
            >
               <Tab.Screen
                  name='Đang chờ' component={Waiting} options={{object : order}}/>
               <Tab.Screen
                  name='Đang giao' component={Delivery} />
               <Tab.Screen
                  name='Đã giao' component={Confirm} />
               <Tab.Screen
                  name='Đã hủy' component={Cancel} />
            </Tab.Navigator>
         </React.Fragment>
      </SafeAreaView>
   )
}

export default Order

