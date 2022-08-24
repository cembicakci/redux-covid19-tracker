import React, { useEffect } from 'react'
import { fetchData, fetchDataCountries } from '../../redux/covidSlice'
import { useDispatch, useSelector } from 'react-redux'

function Main() {

    const dispatch = useDispatch();
    const countries = useSelector(state => state.covid.countries);
    const globalData = useSelector(state => state.covid.globalData);

    console.log("countries", countries)
    console.log("globalData", globalData)


    useEffect(() => {
        dispatch(fetchData())
        dispatch(fetchDataCountries())
    }, [])


    return (
        <div>
            {countries &&
                countries.countries.map((country) => <p>{country.name}</p>)}
        </div>
    )
}

export default Main