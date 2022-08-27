import React, { useEffect, useState } from 'react'
import { fetchData, fetchDataCountries, fetchDataDaily } from '../../redux/covidSlice'
import { setSelectedCountry } from '../../redux/covidSlice';
import { useDispatch, useSelector } from 'react-redux'
import CountUp from "react-countup";
import { Bar, Line } from "react-chartjs-2";

import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
} from "chart.js";

Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
);



function Main() {

    const dispatch = useDispatch();
    const countries = useSelector(state => state.covid.countries);
    const covidData = useSelector(state => state.covid.covidData);
    const selectedCountry = useSelector(state => state.covid.selectedCountry);

    useEffect(() => {
        dispatch(fetchData(selectedCountry))
        dispatch(fetchDataCountries())
        dispatch(fetchDataDaily())
    }, [])


    function handleCountries(e) {
        if (e.target.value === 'Global') {
            dispatch(fetchData(''))
            dispatch(setSelectedCountry(''))
        } else {
            dispatch(fetchData(e.target.value))
            dispatch(setSelectedCountry(e.target.value))
        }

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


            {/* chart js */}
            <div>
                {
                    selectedCountry &&
                    <div>
                        <p>Current state in {selectedCountry}</p>
                        {
                            covidData ? (<Bar data={{
                                labels: ["Infected", "Recovered", "Deaths", "Active"],
                                datasets:
                                    [{
                                        label: "People",
                                        backgroundColor: ["rgba(102, 179, 255, 0.5)", "rgba(191,242,202,.5)", "rgba(237,178,178,.5)", "rgba(237,199,152,.5)"],
                                        hoverBackgroundColor: ["rgba(0,0,255,.5)", "rgba(0,255,0,.5)", "rgba(255,0,0,.5)", "rgba(242,234,0,.5)"],
                                        data: [covidData.confirmed.value,
                                        covidData.recovered.value,
                                        covidData.deaths.value,
                                        covidData.confirmed.value - covidData.deaths.value]
                                    }]
                            }}
                            />) : null


                        }
                    </div>
                }

                <p className='text-2xl mt-5'>Daily Global Cases</p>
                {
                    !selectedCountry && (
                        <Line data={{
                            labels: 'labels',
                            datasets: [
                                {
                                    
                                    label: "Infected",
                                    backgroundColor: "blue",
                                },
                                {

                                    label: "Deaths",
                                    backgroundColor: "red",
                                }],
                        }}
                        />
                    )
                }


            </div>

        </div>
    )
}

export default Main