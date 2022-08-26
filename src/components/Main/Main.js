import React, { useEffect, useState } from 'react'
import { fetchData, fetchDataCountries } from '../../redux/covidSlice'
import { useDispatch, useSelector } from 'react-redux'
import CountUp from "react-countup";

function Main() {

    const dispatch = useDispatch();
    const countries = useSelector(state => state.covid.countries);
    const globalData = useSelector(state => state.covid.globalData);

    const [selectedCountry, setSelectedCountry] = useState('');


    console.log("countries", countries)
    console.log("globalData", globalData)



    useEffect(() => {
        dispatch(fetchData())
        dispatch(fetchDataCountries())
    }, [])


    function handleCountries(e) {
        setSelectedCountry(e.target.value);
    }


    return (
        <div className='main'>
            {
                globalData &&
                <div className='main-details'>
                    <div className='main-box infected'>
                        <h3>Infected</h3>
                        <p className='main-box-value'>
                            <CountUp start={0} end={globalData.confirmed.value} duration={1} separator="," className='text-3xl ld:text-5xl py-10' />
                        </p>
                        <div>
                            <p>Last Updated at :</p>
                            <p className='main-box-date'>{new Date(globalData.lastUpdate).toLocaleString()}</p>
                            <p className='main-box-desc'>Number of infect cases of COVID-19</p>
                        </div>
                    </div>

                    <div className='main-box recovered'>
                        <h3>Recovered</h3>
                        <p className='main-box-value'>
                            <CountUp start={0} end={globalData.recovered.value} duration={1} separator="," className='text-3xl ld:text-5xl py-10' />
                        </p>
                        <div>
                            <p>Last Updated at :</p>
                            <p className='main-box-date'>{new Date(globalData.lastUpdate).toLocaleString()}</p>
                            <p className='main-box-desc'>Number of recoveries from COVID-19</p>
                        </div>
                    </div>

                    <div className='main-box death'>
                        <h3>Deaths</h3>
                        <p className='main-box-value'>
                            <CountUp start={0} end={globalData.deaths.value} duration={1} separator="," className='text-3xl ld:text-5xl py-10' />
                        </p>
                        <div>
                            <p>Last Updated at :</p>
                            <p className='main-box-date'>{new Date(globalData.lastUpdate).toLocaleString()}</p>
                            <p className='main-box-desc'>Number of deaths caused by COVID-19</p>
                        </div>
                    </div>

                    <div className='main-box active'>
                        <h3>Active</h3>
                        <p className='main-box-value'>
                            <CountUp start={0} end={globalData.confirmed.value - globalData.deaths.value} duration={1} separator="," className='text-3xl ld:text-5xl py-10' />
                        </p>
                        <div>
                            <p>Last Updated at :</p>
                            <p className='main-box-date'>{new Date(globalData.lastUpdate).toLocaleString()}</p>
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