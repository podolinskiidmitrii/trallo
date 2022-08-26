import {configureStore, createSlice, ThunkAction} from '@reduxjs/toolkit';
import {Action} from 'redux';
import {createWrapper} from 'next-redux-wrapper';

export const subjectSlice = createSlice({
    name: 'users',
    initialState: {} as any,

    reducers: {
        setEnt(state, action) {
            return action.payload;
        },
    }

});

const makeStore = () =>
    configureStore({
        reducer: {
            [subjectSlice.name]: subjectSlice.reducer,
        },
    });

const store = makeStore()

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
