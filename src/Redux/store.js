import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './Reducers/counterSlice'
import senderSlice from './Reducers/senderSlice'
import receiverSlice from './Reducers/receiverSlice'

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        senderSlice,
        receiverSlice
    },
})