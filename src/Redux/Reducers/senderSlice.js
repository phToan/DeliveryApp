import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    address: "",
    name: "",
    phone: "",
    homeNumber: "",
    note: ""
}

export const inforSender = createSlice({
    name: 'address_sender',
    initialState,
    reducers: {
        senderAddress: (state, action) => {
            state.address = action.payload
        },
        senderName: (state, action) => {
            state.name = action.payload
        },
        senderPhone: (state, action) => {
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
    senderAddress,
    senderName,
    senderPhone,
    homeNumber,
    note
} = inforSender.actions
export default inforSender.reducer