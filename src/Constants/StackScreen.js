import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login/index';
import BottomTab from '../TabScreen/BottomTab/index';
import Register from '../Screens/Register/index';
import DetailedAddress from '../Screens/Other/PlaceTakeOrder/index';
import PlaceDelivery from '../Screens/Other/PlaceDelivery/index';
import SavedPlace from '../Screens/Other/savedPlace';
import AddPlace from '../Screens/Other/addPlace';
import Map from '../Screens/Other/map';
import ChangeAddress from '../Screens/Other/ChangeAddress';
import UserAccount from '../Screens/Other/AccountDetail/index';
import EditProfile from '../Screens/Other/ChangeAccount/ChangeProfile';
import EditPassword from '../Screens/Other/ChangeAccount/ChangePassword/index';
import OrderConfirm from '../Screens/Other/OrderConfirm/index';
import DetailOrder from '../Screens/Other/DetailOrder';
import InforConfirm from '../Screens/Other/inforConfirm';
import * as NameScreen from './NameScreen';

const Stack = createNativeStackNavigator();

export default function StackScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name={NameScreen.LOGIN_SCREEN} component={Login} />
            <Stack.Screen
                name={NameScreen.REGISTER_SCREEN}
                component={Register}
            />
            <Stack.Screen name={NameScreen.TAB_SCREEN} component={BottomTab} />
            <Stack.Screen
                name={NameScreen.TAKE_ORDER_PLACE}
                component={DetailedAddress}
            />
            <Stack.Screen
                name={NameScreen.DELIVERY_PLACE}
                component={PlaceDelivery}
            />
            <Stack.Screen
                name={NameScreen.SAVED_PLACE}
                component={SavedPlace}
            />
            <Stack.Screen name={NameScreen.ADD_PLACE} component={AddPlace} />
            <Stack.Screen name={NameScreen.MAP} component={Map} />
            <Stack.Screen
                name={NameScreen.CHANGE_ADDRESS}
                component={ChangeAddress}
            />
            <Stack.Screen
                name={NameScreen.USER_ACCOUNT}
                component={UserAccount}
            />
            <Stack.Screen
                name={NameScreen.EDIT_PROFILE}
                component={EditProfile}
            />
            <Stack.Screen
                name={NameScreen.EDIT_PASSWORD}
                component={EditPassword}
            />
            <Stack.Screen
                name={NameScreen.ORDER_CONFIRM}
                component={OrderConfirm}
            />
            <Stack.Screen
                name={NameScreen.DETAIL_ORDER}
                component={DetailOrder}
            />
            <Stack.Screen
                name={NameScreen.INFOR_CONFIRM}
                component={InforConfirm}
            />
        </Stack.Navigator>
    );
}
