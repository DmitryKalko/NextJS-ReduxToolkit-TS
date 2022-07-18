import {
    Action,
    combineReducers,
    configureStore,
    ThunkAction,
} from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import usersReducer, { usersState } from './usersSlice'
import users from './usersSlice';
import {User} from '../interfaces';
import Users from '../pages/users';

type ActionType = {
    type: string,
    payload: any,
}

type ReducerType = (a: usersState, b: ActionType) => {}


const combinedReducer = combineReducers<usersState, ActionType>({
    users,
  });
  

const masterReducer: ReducerType = (state, action) => {
    
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            users: {
                users: [...action.payload.users, ...state.users]
            }
        }
        return nextState;
    } else {
        return usersReducer;
  }
}



export const makeStore = () => {
    return configureStore({
        reducer: masterReducer,
    });
}

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStore, unknown, Action<string>>;


export const wrapper = createWrapper<RootStore>(makeStore);
