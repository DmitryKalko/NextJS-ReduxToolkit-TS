import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type {RootState} from "./store";
import {User} from '../interfaces';
import {HYDRATE} from "next-redux-wrapper";
import {AppThunk} from "./store";

export type usersState = {
    users: User[];
};

// export const getAllUsers = createAsyncThunk('users/allUsers', async () => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/users');
//     const users = await response.json();
//     console.log('getAllUsers', users);
//     return users;
// });

const initialState: usersState = {
    users: [],
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {    // если сравнивать с обычным redux - то это набор switch
        getAllUsers: (state, action) => {
            state.users = [...state.users, action.payload]
        }
    },
})


//export const users = (state: RootState) => state.users;
export const { getAllUsers } = usersSlice.actions  //getAllUsers - action creater - возвращает объект action
export default usersSlice.reducer;

// console.log(getUsers('')) // здесь action