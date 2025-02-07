import { Record } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import uniqid from "uniqid";

interface RecordsState {
    value: Record[];
}

const initialState: RecordsState = {
    value: [
        {
            id: uniqid(),
            time: dayjs().toISOString(),
            cupVolume: 300
        }
    ]
};

export const recordsSlice = createSlice({
    name: "records",
    initialState,
    reducers: {
        addRecord: (state, action: PayloadAction<Record>) => {
            state.value.unshift(action.payload);
        },
        editRecord: (state, action: PayloadAction<Record>) => {
            const recordIndex = state.value.findIndex((record) => record.id === action.payload.id);

            if (recordIndex !== -1) state.value[recordIndex] = action.payload;
        },
        removeRecord: (state, action: PayloadAction<string>) => {
            state.value = state.value.filter((record) => record.id !== action.payload);
        }
    }
});

export const { addRecord, editRecord, removeRecord } = recordsSlice.actions;

export default recordsSlice.reducer;
