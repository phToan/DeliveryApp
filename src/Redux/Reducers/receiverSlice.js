import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    address: "",
    name: "",
    phone: "",
    detailAddress: ""
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
        detailAddress: (state, action) => {
            state.detailAddress = action.payload
        }
    }
})

export const { receiverAddress, receiverName, receiverPhone } = inforReceiver.actions
export default inforReceiver.reducer