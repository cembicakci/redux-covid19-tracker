import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk('covidData/fetchData', async () => {
    const { data } = await axios('https://covid19.mathdro.id/api');
})

export const covidSlice = createSlice({
    name: 'covid',
    initialState: {
        items: {}
    }
})

export default covidSlice.reducer;