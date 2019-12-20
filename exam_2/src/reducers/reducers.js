import { combineReducers } from 'redux';
import weatherInfo from './weather.reducer';

const reducers = combineReducers({
    WeatherInfo: weatherInfo
});

export default reducers;