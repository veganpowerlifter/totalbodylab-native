import { configureStore } from '@reduxjs/toolkit';
import { coachesReducer } from '../features/campsites/coachesSlice';
import { programsReducer } from ;
// import { commentsReducer } from '../features/comments/commentsSlice';
import { coachesSliceReducer } from '../features/partners/couchesSlice';

// import { favoritesReducer } from '../features/favorites/favoritesSlice';
import {
    persistStore,
    persistCombineReducers,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true
};

export const store = configureStore({
    reducer: persistCombineReducers(config, {
        coaches: coachesReducer,
        // comments: commentsReducer,
        programs: programsReducer,
        // promotions: promotionsReducer,
        favorites: favoritesReducer
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        })
});

export const persistor = persistStore(store);