import React, { useEffect } from 'react'
import { fetchData, fetchDataCountries } from '../../redux/covidSlice'
import { useDispatch, useSelector } from 'react-redux'

function Main() {

    const dispatch = useDispatch();
    const countries = useSelector(state => state.covid.countries);
    console.log(countries)
    

    useEffect(() => {
       dispatch(fetchData())
       dispatch(fetchDataCountries())
    }, [])


    return (
        <div>
        </div>
    )
}

export default Main