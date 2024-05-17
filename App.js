import { NavigationContainer } from '@react-navigation/native';
import AppContext, { AppProvider } from './src/Context/AppContext';
import StackScreen from './src/Constants/StackScreen';
import { store } from './src/Redux/store';
import { Provider } from 'react-redux';
import ToastManager, { Toast } from 'toastify-react-native';
import { View, Text, ToastAndroid, Platform } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import FlashMessage from 'react-native-flash-message';
import { GlobalProvider } from './GlobalContext';

export default function App() {
    return (
        <View style={{ flex: 1 }}>
            <FlashMessage
                position="top"
                duration={5000}
                // style={{ margin: 10 }}
            />
            <NavigationContainer>
                <Provider store={store}>
                    <AppProvider>
                        <GlobalProvider>
                            <StackScreen />
                        </GlobalProvider>
                    </AppProvider>
                </Provider>
            </NavigationContainer>
        </View>
    );
}
