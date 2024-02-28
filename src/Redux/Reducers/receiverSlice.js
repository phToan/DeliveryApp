import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    address: "",
    latitude: 0,
    longitude: 0,
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
        },
        latitude: (state, action) => {
            state.latitude = action.payload
        },
        longitude: (state, action) => {
            state.longitude = action.payload
        }
    }
})

export const {
    receiverAddress,
    receiverName,
    receiverPhone,
    homeNumber,
    note,
    latitude,
    longitude
} = inforReceiver.actions
export default inforReceiver.reducer