import React from 'react'
import kelvinToCelsius from '../utils/convertUnits'
import styles from '../styles/weatherCard.module.css'
import { Link } from 'react-router-dom'
//import getImg from '../utils/getImg'


const WeatherCard = (props) => {
    const { info, isDetail } = props;
    const time = (new Date(info.dt_txt)).toLocaleString('ru-RU');
    
    if (isDetail) {
        return (
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
                    <div className="right">{info.dt_txt ? time : null}</div>
                </div>
            </div> 
        )
    } 
    return(
        <Link to={`/location/${info.id}`}>
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
                        <div className="right">{info.dt_txt ? time : null}</div>
                    </div>
                </div> 
        </Link>
    )
}

export default WeatherCard