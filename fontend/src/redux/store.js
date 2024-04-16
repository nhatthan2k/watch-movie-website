import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import categorySlice from './reducers/categorySlice';
import colorSlice from './reducers/colorSlice';
import couponSlice from './reducers/couponSlice';
import orderAdminSlice from './reducers/orderAdminSlice';
import orderUserSlice from './reducers/orderUserSlice';
import productSlice from './reducers/productSlice';
import sizeSlice from './reducers/sizeSlice';
import userAdminSlice from './reducers/userAdminSlice';
import userSlice from './reducers/userSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth', 'users'],
};

const combinedReducer = combineReducers({
    auth: authReducer,
    category: categorySlice,
    coupon: couponSlice,
    product: productSlice,
    color: colorSlice,
    size: sizeSlice,
    user: userSlice,
    orderUser: orderUserSlice,
    orderAdmin: orderAdminSlice,
    userAdmin: userAdminSlice,
});

const rootReducer = (state, action) => {
    if (action.type === 'auth/resetUser') {
        state = undefined;
    }
    return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
