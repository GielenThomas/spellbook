import { combineReducers, configureStore } from "@reduxjs/toolkit";

import searchReducer from "./searchSlice.ts";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistConfig } from "redux-persist/es/types";
import { SearchState } from "./searchSlice.ts";


const persistConfig: PersistConfig<{search: SearchState}> = {
    key: "state",
    storage: AsyncStorage as any
}

const rootReducer = combineReducers({
    search: searchReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)  => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [PERSIST, FLUSH, REHYDRATE, PURGE, REGISTER, PAUSE]
        }
    })
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState >;
export type AppDispatch = typeof store.dispatch; 
