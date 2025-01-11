import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/lib/persistStore";
import storage from "redux-persist/lib/storage";
import cupVolumeReducer from "../slices/cup-volume";
import progressGoalReducer from "../slices/progress-goal";
import recordsReducer from "../slices/records";

const persistConfig = {
    key: "root",
    storage
};

const rootReducer = combineReducers({
    records: recordsReducer,
    cupVolume: cupVolumeReducer,
    progressGoal: progressGoalReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
            }
        })
});

export default store;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
