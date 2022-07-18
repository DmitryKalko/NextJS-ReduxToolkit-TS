import {
    Action,
    configureStore,
    ThunkAction,
} from '@reduxjs/toolkit';
import {createWrapper} from 'next-redux-wrapper';
import usersReducer from './usersSlice'


export const makeStore = () => {
    return configureStore({
        reducer: {
            users: usersReducer,
        },
    });
}

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStore, unknown, Action<string>>;


export const wrapper = createWrapper<RootStore>(makeStore);
