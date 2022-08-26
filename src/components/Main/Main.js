import React, { useEffect, useState } from 'react'
import { fetchData, fetchDataCountries } from '../../redux/covidSlice'
import { setSelectedCountry } from '../../redux/covidSlice';
import { useDispatch, useSelector } from 'react-redux'
import CountUp from "react-countup";

function Main() {

    const dispatch = useDispatch();
    const countries = useSelector(state => state.covid.countries);
    const covidData = useSelector(state => state.covid.covidData);
    const selectedCountry = useSelector(state => state.covid.selectedCountry);

    useEffect(() => {
        dispatch(fetchData(selectedCountry))
        dispatch(fetchDataCountries())
    }, [])


    function handleCountries(e) {
        dispatch(setSelectedCountry(e.target.value))
        dispatch(fetchData(e.target.value))
        
    }


    return (
        <div className='main'>
            {
                covidData &&
                <div className='main-details'>
                    <div className='main-box infected'>
                        <h3>Infected</h3>
                        <p className='main-box-value'>
                            <CountUp start={0} end={covidData.confirmed.value} duration={1} separator="," className='text-3xl ld:text-5xl py-10' />
                        </p>
                        <div>
                            <p>Last Updated at :</p>
                            <p className='main-box-date'>{new Date(covidData.lastUpdate).toLocaleString()}</p>
                            <p className='main-box-desc'>Number of infect cases of COVID-19</p>
                        </div>
                    </div>

                    <div className='main-box recovered'>
                        <h3>Recovered</h3>
                        <p className='main-box-value'>
                            <CountUp start={0} end={covidData.recovered.value} duration={1} separator="," className='text-3xl ld:text-5xl py-10' />
                        </p>
                        <div>
                            <p>Last Updated at :</p>
                            <p className='main-box-date'>{new Date(covidData.lastUpdate).toLocaleString()}</p>
                            <p className='main-box-desc'>Number of recoveries from COVID-19</p>
                        </div>
                    </div>

                    <div className='main-box death'>
                        <h3>Deaths</h3>
                        <p className='main-box-value'>
                            <CountUp start={0} end={covidData.deaths.value} duration={1} separator="," className='text-3xl ld:text-5xl py-10' />
                        </p>
                        <div>
                            <p>Last Updated at :</p>
                            <p className='main-box-date'>{new Date(covidData.lastUpdate).toLocaleString()}</p>
                            <p className='main-box-desc'>Number of deaths caused by COVID-19</p>
                        </div>
                    </div>

                    <div className='main-box active'>
                        <h3>Active</h3>
                        <p className='main-box-value'>
                            <CountUp start={0} end={covidData.confirmed.value - covidData.deaths.value} duration={1} separator="," className='text-3xl ld:text-5xl py-10' />
                        </p>
                        <div>
                            <p>Last Updated at :</p>
                            <p className='main-box-date'>{new Date(covidData.lastUpdate).toLocaleString()}</p>
                            <p className='main-box-desc'>Number of active cases of COVID-19</p>
                        </div>
                    </div>

                </div>
            }

            <div>
                <select value={selectedCountry} onChange={handleCountries}>
                    <option>Global</option>
                    {countries &&
                        countries.countries.map((country, index) => (
                            <option value={country.name} key={index}>{country.name}</option>
                        ))
                    }

                </select>
            </div>
        </div>
    )
}

export default Main