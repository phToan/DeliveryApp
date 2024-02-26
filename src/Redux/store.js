import { configureStore } from '@reduxjs/toolkit'
import senderSlice from './Reducers/senderSlice'
import receiverSlice from './Reducers/receiverSlice'
import userInforSlice from './Reducers/userInforSlice'

export const store = configureStore({
    reducer: {
        senderSlice,
        receiverSlice,
        userInforSlice
    },
})