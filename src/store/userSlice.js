import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        user: {
            firstName: '',
            lastName: '',
            userName: '',
        }
    },
    reducers: {
        logIn: (currentState, action) => {
            currentState.token = action.payload
        },
        logOut: (currentState) => {
            currentState.token = null
        },
        updateUser: (currentState, action) => {
            currentState.user = action.payload
        },
        updateUserName: (currentState, action) => {
            currentState.user.userName = action.payload
        },
    }
})

export const { logIn, logOut, updateUser, updateUserName } = userSlice.actions

export default userSlice.reducer