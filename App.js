import { NavigationContainer } from "@react-navigation/native"
import { AppProvider } from "./src/Context/AppContext";
import StackScreen from "./src/Constants/StackScreen";
import { store } from "./src/Redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <AppProvider>
          <StackScreen />
        </AppProvider>
      </Provider>
    </NavigationContainer>
  )
}
