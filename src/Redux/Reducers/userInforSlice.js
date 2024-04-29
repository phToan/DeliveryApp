import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 0,
    name: "",
    dob: "",
    gender: 1,
    phone: "",
    point: 10
}

const userInforSlice = createSlice({
    name: "userInfor",
    initialState,
    reducers: {
        changeID: (state, action) => {
            state.id = action.payload
        },
        changeName: (state, action) => {
            state.name = action.payload
        },
        changeDob: (state, action) => {
            state.dob = action.payload
        },
        changeGender: (state, action) => {
            state.gender = action.payload
        },
        changePhone: (state, action) => {
            state.phone = action.payload
        },
        changePoint: (state, action) => {
            state.point = action.payload
        },
    }
})

export const {
    changeName,
    changeDob,
    changeGender,
    changeID,
    changePoint,
    changePhone
} = userInforSlice.actions

export default userInforSlice.reducer

