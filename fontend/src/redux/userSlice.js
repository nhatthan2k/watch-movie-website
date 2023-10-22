import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: {
            allusers: null,
            isFetching: false,
            error: false
        },
        msg: "",
    },
    reducers: { 
        getUserStart: (state) => { 
            state.users.isFetching = true;
        },
        getUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allusers = action.payload;
            state.users.error = false;
        },
        getUserError: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        deleteUserStart: (state) => {
            state.users.isFetching = true;
        },
        deleteUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.error = false;
            state.msg = action.payload;
        },
        deleteUserError: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        }
        
    }
})

export const {
    getUserStart,
    getUserSuccess,
    getUserError,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserError
} = userSlice.actions;

export default userSlice.reducer;