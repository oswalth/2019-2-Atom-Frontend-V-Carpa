import React from 'react';
import './App.css';
import Main from './components/mainForm.component'
import DetailView from './components/detailView.component'
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import * as actions from './actions/fetchWeather'
import { connect } from 'react-redux';


class App extends React.Component{

  render() {
    console.log()
    return (
        <div className="App">   
          <Router basename={process.env.PUBLIC_URL}>
            <Route exact path='/' component={Main}/> 
            <Route path='/location/:id' component={DetailView}/>
          </Router>
        </div>      
    );
  }
}
const mapStateToProps = (state) => ({
  weatherInfo: state.WeatherInfo
})

const mapDispatchToProps = (dispatch) => ({
  loadWeather: (arg, method) => dispatch(actions.fetchWeather(arg, method))
  })

export default connect(mapStateToProps, mapDispatchToProps)(App);
