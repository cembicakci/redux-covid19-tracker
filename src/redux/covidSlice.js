import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk('data/fetchData', async () => {
    const res = await axios('https://covid19.mathdro.id/api');
    return res.data
})

export const fetchDataCountries = createAsyncThunk('data/fetchData', async () => {
    const res = await axios('https://covid19.mathdro.id/api/countries');
    return res.data
})

export const covidSlice = createSlice({
    name: 'covid',
    initialState: {
        countries: ''
    },
    extraReducers: {
        [fetchData.fulfilled]: (state, action) => {
            state.countries = action.payload;
        }
    }
})

export default covidSlice.reducer;