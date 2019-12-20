const weatherInfo = (state = {
    weatherinfo: []
}, action) => {
    if (action.type === 'FETCH_WEATHER'){
        let flag = false;
        state.weatherinfo.forEach((weather) => {
          if (weather && weather.id === action.payload.id) {
            flag = true
          }
        })
        if (!flag) {
          state = {...state, weatherinfo: [...state.weatherinfo, action.payload]}
        }
    }
    return state;
}

export default weatherInfo;
