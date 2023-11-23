import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from './Components/Login/index';
import BottomTab from './Components/Customer/index'
import Register from "./Components/Login/register"
import DetailedAddress from "./Components/Customer/Item/address";
import PlaceDelivery from "./Components/Customer/Item/placeDelivery";
import SavedPlace from "./Components/Customer/Item/savedPlace";
import AddPlace from "./Components/Customer/Item/addPlace";
import Map from "./Components/Customer/Item/map";
import ShipmentDetails from "./Components/Customer/Item/shipmentDetails";
import SetAddressSender from "./Components/Customer/Item/setAddress";
import UserAccount from "./Components/Customer/Item/user/userAccount";
import EditProfile from "./Components/Customer/Item/user/editProfile";
import EditPassword from "./Components/Customer/Item/user/editPassword";
import OrderConfirm from "./Components/Customer/Item/orderConfirm"
import DetailOrder from "./Components/Customer/Item/ItemSender/detailOrder";
import { AppProvider } from "./Components/Context/AppContext";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AppProvider>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name='BottomTab' component={BottomTab} />
          <Stack.Screen name='detailedAddressSender' component={DetailedAddress} />
          <Stack.Screen name='placeDelivery' component={PlaceDelivery} />
          <Stack.Screen name='savedPlace' component={SavedPlace} />
          <Stack.Screen name='addPlace' component={AddPlace} />
          <Stack.Screen name='map' component={Map} />
          <Stack.Screen name='shipmentDetails' component={ShipmentDetails} />
          <Stack.Screen name='setAddressSender' component={SetAddressSender} />
          <Stack.Screen name='userAccount' component={UserAccount} />
          <Stack.Screen name='editProfile' component={EditProfile} />
          <Stack.Screen name='editPassword' component={EditPassword} />
          <Stack.Screen name='orderConfirm' component={OrderConfirm} />
          <Stack.Screen name='detailOrder' component={DetailOrder} />
        </Stack.Navigator>
      </AppProvider>
    </NavigationContainer>
  )
}
