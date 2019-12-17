import React from 'react';
import WeatherCard from './WeatherCard.component'
import styles from '../styles/weather.module.css'


const Weather = (props) => {
    const { weatherInfo } = props
    if (weatherInfo.length === 0) {
        return ''
    }
    const weathers = weatherInfo.map((weather, idx) => {
        return <WeatherCard key={idx} info={weather}/>
    });
    return(
        <div className={styles.containerW}>
            <div className={styles.weatherList}>
                {weathers}
            </div>
            
        </div>
    )    
}

export default Weather;