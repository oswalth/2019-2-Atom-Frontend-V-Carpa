const favs = [
    {
      "id": 707860,
      "name": "Hurzuf",
      "country": "UA",
      "coord": {
        "lon": 34.283333,
        "lat": 44.549999
      }
    },
    {
      "id": 519188,
      "name": "Novinki",
      "country": "RU",
      "coord": {
        "lon": 37.666668,
        "lat": 55.683334
      }
    },
    {
      "id": 1283378,
      "name": "Gorkhā",
      "country": "NP",
      "coord": {
        "lon": 84.633331,
        "lat": 28
      }
    }
]

const weatherInfo = (state = {
    weatherinfo: []
}, action) => {
    if (action.type === 'FETCH_WEATHER'){
        state = {...state, weatherinfo: [...state.weatherinfo, action.payload]}
    }
    return state;
} 

export default weatherInfo;
