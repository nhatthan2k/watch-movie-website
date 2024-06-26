import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import genreSlice from './reducers/genreSlice';
import episodeSlice from './reducers/episodeSlice';
import movieSlice from './reducers/movieSlice';
import seasonSlice from './reducers/seasonSlice';
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
    genre: genreSlice,
    movie: movieSlice,
    episode: episodeSlice,
    season: seasonSlice,
    size: sizeSlice,
    user: userSlice,
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
