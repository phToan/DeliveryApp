import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    address: "",
    name: "",
    phone: "",
    detailAddress: ""
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
        detailAddress: (state, action) => {
            state.detailAddress = action.payload
        }
    }
})

export const { senderAddress, senderName, senderPhone } = inforSender.actions
export default inforSender.reducer