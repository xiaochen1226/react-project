import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user-store'
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localeStorage 机制
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: storage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, userReducer),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)

export default store
