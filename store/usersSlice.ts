import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type {RootState} from "./store";
import {User} from '../interfaces';
import {HYDRATE} from "next-redux-wrapper";
import {AppThunk} from "./store";

export type usersState = {
    data: User[];
    pending: boolean;
    error: boolean;
};

export const getAllUsers = createAsyncThunk('users/allUsers', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    console.log('getAllUsers', users);
    return users;
});

const initialState: usersState = {
    data: [],
    pending: false,
    error: false,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // setEnt(state, action) {
        //     return action.payload;
        // },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            console.log('HYDRATE', action.payload);
            return {
                ...state,
                ...action.payload.subject,
            };
        },
    },


    // extraReducers: builder => {  // если сравнивать с обычным redux - то это набор switch
    //     builder
    //         .addCase(getAllUsers.fulfilled, (state, {payload}) => {
    //             state.pending = false;
    //             state.data = payload;
    //         })
    // },
})

// export const getAllUsers = (): AppThunk => async dispatch => {
//             const response = await fetch('https://jsonplaceholder.typicode.com/users');
//             const users = await response.json();
//             return users;
//         };

export const users = (state: RootState) => state.users;
export default usersSlice.reducer;

// export const {getUsers} = usersSlice.actions;  //getUsers - action creater - возвращает объект action
// console.log(getUsers('')) // здесь action