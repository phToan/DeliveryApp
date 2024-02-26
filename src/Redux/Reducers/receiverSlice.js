import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    address: "",
    name: "",
    phone: "",
    homeNumber: "",
    note: ""
}

export const inforReceiver = createSlice({
    name: 'address_receiver',
    initialState,
    reducers: {
        receiverAddress: (state, action) => {
            state.address = action.payload
        },
        receiverName: (state, action) => {
            state.name = action.payload
        },
        receiverPhone: (state, action) => {
            state.phone = action.payload
        },
        homeNumber: (state, action) => {
            state.homeNumber = action.payload
        },
        note: (state, action) => {
            state.note = action.payload
        }
    }
})

export const {
    receiverAddress,
    receiverName,
    receiverPhone,
    homeNumber,
    note
} = inforReceiver.actions
export default inforReceiver.reducer