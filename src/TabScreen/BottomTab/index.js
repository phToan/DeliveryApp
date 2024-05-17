import Home from '../../Screens/Home/index';
import Notification from '../../Screens/Notification/index';
import Order from '../TopTab/index';
import User from '../../Screens/UserScreen/user';
import Icon from 'react-native-vector-icons/Fontisto';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Ionicons';
import color from '../../Assets/color';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// const Tab = createMaterialBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: color.orange,
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: 14,
                },
                tabBarStyle: {
                    paddingVertical: 3,
                },
            }}
        >
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={22} />
                    ),
                }}
                name="Trang chủ"
                component={Home}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon1 name="clockcircle" color={color} size={22} />
                    ),
                }}
                name="Đơn hàng"
                component={Order}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon3 name="notifications" color={color} size={24} />
                    ),
                }}
                name="Thông báo"
                component={Notification}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon2 name="user" color={color} size={24} />
                    ),
                }}
                name="Tài khoản"
                component={User}
            />
        </Tab.Navigator>
    );
};

export default BottomTab;
