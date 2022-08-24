import { createSlice } from "@reduxjs/toolkit";

export const covidSlice = createSlice({
    name: 'covid',
    initialState: {
        items:{}
    }
})

export default covidSlice.reducer;