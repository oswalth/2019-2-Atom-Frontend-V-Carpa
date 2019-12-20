import React from 'react'
import findMe from '../utils/findMe'


const Form = (props) => {
    const { loadWeather } = props;
    const processSubmit = (event) => {
        event.preventDefault()
        const { city }= event.target.elements;
        const arg = {
            city: city.value
        }   
        loadWeather(arg, 'byCity')
    } 
    
    return (
        <div className='container'>
            <form onSubmit={processSubmit}>
                <input 
                    type='text'
                    placeholder='City'
                    name='city'
                ></input>
                <button>+</button>
                <button 
                    type='button'
                    onClick={() => {
                        findMe((position) => {
                            const method = 'byGeolocation'
                            loadWeather(position.coords, method)
                        })
                    }}
                >Geo</button>
            </form>
        </div>
    )
}

export default Form;