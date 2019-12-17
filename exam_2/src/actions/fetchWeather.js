import axios from 'axios'

const Api_Key = 'a2df596b1f176ee0d6618cf361f63153'
export const fetchWeather = (arg, method) => (dispatch) => {
    const prefix = `http://api.openweathermap.org/data/2.5/weather?appid=${Api_Key}&`
    let postfix = '';
    console.log(arg, method)
    if (method === 'byGeolocation') {
        postfix = `lat=${arg.latitude}&lon=${arg.longitude}`
    } else if (method === 'byCity'){
        postfix = `q=${arg.city}`
    }
    console.log(prefix + postfix)
    axios(prefix + postfix)
    .then((response) => {
        return response.data
    })
    .then((weather) => {
        console.log(weather)
        dispatch({type: "FETCH_WEATHER", payload: weather});
    })
    .catch((err) => {
        console.log(err)
    })
}

