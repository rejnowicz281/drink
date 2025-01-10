import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const cupVolumeSlice = createSlice({
    name: "cupVolume",
    initialState: {
        value: 300
    },
    reducers: {
        setCupVolume: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        }
    }
});

export const { setCupVolume } = cupVolumeSlice.actions;

export default cupVolumeSlice.reducer;
