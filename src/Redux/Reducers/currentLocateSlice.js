import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    address: '',
    latitude: 0,
    longitude: 0
}

const currentLocateSlice = createSlice({
    name: 'currentLocate',
    initialState,
    reducers: {
        SaveLocate: (state, action) => {
            state.initialState = action.payload
        }
    }
})

export default currentLocateSlice.reducer
export const { SaveLocate } = currentLocateSlice.actions