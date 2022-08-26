import React, { useEffect, useState } from 'react'
import { fetchData, fetchDataCountries } from '../../redux/covidSlice'
import { useDispatch, useSelector } from 'react-redux'

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
                        <p className='main-box-value'>{globalData.confirmed.value}</p>
                        <p>Last Updated at :</p>
                        <span>{ new Date(globalData.lastUpdate).toLocaleString()}</span>
                        <p className='main-box-desc'>Number of infect cases of COVID-19</p>
                    </div>

                    <div className='main-box recovered'>
                        <h3>Recovered</h3>
                        <p className='main-box-value'>{globalData.recovered.value}</p>
                        <p>Last Updated at :</p>
                        <span>{ new Date(globalData.lastUpdate).toLocaleString()}</span>
                        <p className='main-box-desc'>Number of recoveries from COVID-19</p>
                    </div>

                    <div className='main-box death'>
                        <h3>Deaths</h3>
                        <p className='main-box-value'>{globalData.deaths.value}</p>
                        <p>Last Updated at :</p>
                        <span>{ new Date(globalData.lastUpdate).toLocaleString()}</span>
                        <p className='main-box-desc'>Number of deaths caused by COVID-19</p>
                    </div>

                    <div className='main-box active'>
                        <h3>Active</h3>
                        <p className='main-box-value'>{globalData.confirmed.value - globalData.deaths.value}</p>
                        <p>Last Updated at :</p>
                        <span>{ new Date(globalData.lastUpdate).toLocaleString()}</span>
                        <p className='main-box-desc'>Number of active cases of COVID-19</p>
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