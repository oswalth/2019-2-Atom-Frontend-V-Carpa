import axios from 'axios'
import {API_KEY} from '../utils/apiKey'


export const fetchWeather = (arg, method) => (dispatch) => {
    const prefix = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY  }&`
    let postfix = '';
    if (method === 'byGeolocation') {
        postfix = `lat=${arg.latitude}&lon=${arg.longitude}`
    } else if (method === 'byCity'){
        postfix = `q=${arg.city}`
    }
    axios(prefix + postfix)
    .then((response) => {
        return response.data
    })
    .then((weather) => {
        dispatch({type: "FETCH_WEATHER", payload: weather});
    })
    .catch((err) => {
        console.log(err)
    })
}

