import React from 'react'
import kelvinToCelsius from '../utils/convertUnits'
import styles from '../styles/weatherCard.module.css'
import { Link } from 'react-router-dom'
//import getImg from '../utils/getImg'


const WeatherCard = (props) => {
    const { info } = props;
    return(
        <Link to={`/location/${info.sys.id}`}>
             <div className={styles.cardContainer}>
                <div className={styles.upper}>
                    <div className={styles.upperLeft}>
                        <div className="city">{info.name}</div>
                        <div className="cityCountry">{info.name}, {info.sys.country}</div>
                    </div>
                    <div className={styles.upperRight}>
                        <div className="weatherIcon"></div>
                        <div className="temperature">{kelvinToCelsius(info.main.temp)}&deg;</div>
                    </div>
                </div>
                <div className={styles.lower}>
                    <div className="left">{info.main.humidity}%</div>
                    <div className="right"></div>
                </div>
            </div> 
        </Link>
    )
}

export default WeatherCard