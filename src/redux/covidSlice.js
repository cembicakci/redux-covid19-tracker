import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk('data/fetchData', async (selectedCountry) => {
    if (selectedCountry === '') {
        const res = await axios.get('https://covid19.mathdro.id/api');
        return res.data
    } else {
        const res = await axios(`https://covid19.mathdro.id/api/countries/${selectedCountry}`);
        return res.data
    }
})

export const fetchDataCountries = createAsyncThunk('data/fetchDataCountries', async () => {
    const res = await axios.get('https://covid19.mathdro.id/api/countries');
    return res.data
})

export const fetchDataDaily = createAsyncThunk("covidData/fetchDataDaily", async () => {
    const res = await axios("https://covid19.mathdro.id/api/daily");
    return res.data;
})

export const covidSlice = createSlice({
    name: 'covid',
    initialState: {
        covidData: '',
        countries: '',
        selectedCountry: '',
        dailyData: ''
    },
    reducers: {
        setSelectedCountry: (state, action) => {
            state.selectedCountry = action.payload;
        }
    },
    extraReducers: {
        [fetchData.fulfilled]: (state, action) => {
            state.covidData = action.payload;
        },
        [fetchDataCountries.fulfilled]: (state, action) => {
            state.countries = action.payload;
        },
        [fetchDataDaily.fulfilled] : (state, action) => {
            state.dailyData = action.payload;
        }
    }
})

export const { setSelectedCountry } = covidSlice.actions;
export default covidSlice.reducer;