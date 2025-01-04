import { createSlice } from "@reduxjs/toolkit";

export const progressGoalSlice = createSlice({
    name: "progress-goal",
    initialState: {
        value: 2700
    },
    reducers: {}
});

export default progressGoalSlice.reducer;
