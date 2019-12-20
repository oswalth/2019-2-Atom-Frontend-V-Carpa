import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import kelvinToCelsius from '../utils/convertUnits'
import {API_KEY} from '../utils/apiKey'
import WeatherCard from './WeatherCard.component'
import styles from '../styles/detailView.module.css'


const DetailView = (props) => {
    const [data, setData] = useState(null)
    const cityId = props.match.params.id;
    useEffect(() => {
        axios(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${API_KEY}`)
        .then((res) => {
          setData(res.data)
        })
    }, [cityId]) 

    if (data === null) {
        return null;    
    }

    const weathers = data.list.slice(0,5).map((weather, idx) => {
        weather.name = data.city.name
        weather.sys.country = data.city.country
        return <WeatherCard key={idx} info={weather} isDetail={true}/>
    });
    
    return(
        <div className={styles.wrapper}>
            <div className="detailsContainer">
                <div className="city">{data.city.name}, {data.city.country}</div>
                <div className="temp">{kelvinToCelsius(data.list[0].main.temp)}&deg;</div>
            </div>
            <div className={styles.containerW}>
                <div className={styles.weatherList}>
                    {weathers}
                </div>
            </div>
        </div>
        
    )
}

export default DetailView