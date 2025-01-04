import { Record } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uniqid from "uniqid";

interface RecordsState {
    value: Record[];
}

const initialState: RecordsState = {
    value: [
        {
            id: uniqid(),
            time: new Date().toISOString(),
            cupVolume: 300
        }
    ]
};

export const recordsSlice = createSlice({
    name: "records",
    initialState,
    reducers: {
        addRecord: (state, action: PayloadAction<Record>) => {
            state.value.push(action.payload);
        },
        removeRecord: (state, action: PayloadAction<string>) => {
            state.value = state.value.filter((record) => record.id !== action.payload);
        }
    }
});

export const { addRecord, removeRecord } = recordsSlice.actions;

export default recordsSlice.reducer;
