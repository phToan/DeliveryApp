import { configureStore } from '@reduxjs/toolkit'
import senderSlice from './Reducers/senderSlice'
import receiverSlice from './Reducers/receiverSlice'
import userInforSlice from './Reducers/userInforSlice'
import currentLocateSlice from './Reducers/currentLocateSlice'

export const store = configureStore({
    reducer: {
        senderSlice,
        receiverSlice,
        userInforSlice,
        currentLocateSlice
    },
})