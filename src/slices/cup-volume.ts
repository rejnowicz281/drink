import { createSlice } from "@reduxjs/toolkit";

export const cupVolumeSlice = createSlice({
    name: "cupVolume",
    initialState: {
        value: 300
    },
    reducers: {}
});

export default cupVolumeSlice.reducer;
