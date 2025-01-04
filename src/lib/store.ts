import { configureStore } from "@reduxjs/toolkit";
import cupVolumeReducer from "../slices/cup-volume";
import progressGoalReducer from "../slices/progress-goal";
import recordsReducer from "../slices/records";

const store = configureStore({
    reducer: {
        records: recordsReducer,
        cupVolume: cupVolumeReducer,
        progressGoal: progressGoalReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
