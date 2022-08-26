import React, { useEffect, useState } from 'react'
import { fetchData, fetchDataCountries } from '../../redux/covidSlice'
import { useDispatch, useSelector } from 'react-redux'

function Main() {

    const dispatch = useDispatch();
    const countries = useSelector(state => state.covid.countries);
    const globalData = useSelector(state => state.covid.globalData);

    const [selectedCountry, setSelectedCountry] = useState()


    console.log("countries", countries)
    console.log("globalData", globalData)



    useEffect(() => {
        dispatch(fetchData())
        dispatch(fetchDataCountries())
    }, [dispatch])


    function handleCountries(e) {
        setSelectedCountry(e.target.value);
    }
    

    return (
        <div>
            <select value={selectedCountry} onChange={handleCountries}>
                {countries &&
                    countries.countries.map((country, index) => (
                        <option value={country.name} key={index}>{country.name}</option>
                    ))
                }

            </select>
        </div>
    )
}

export default Main