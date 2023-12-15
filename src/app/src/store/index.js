import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import reducer from './reducerManager';

const persistConfig = {
	key: 'root',
	storage,
    whitelist: ['lists', 'games']
};

const userReducer = combineReducers(reducer);

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

export const persistor = persistStore(store);