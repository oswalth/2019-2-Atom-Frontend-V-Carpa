import React from 'react'


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
    

    const byGeolocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const method = 'byGeolocation'
            console.log(method)
            loadWeather(position.coords, method)
        })
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
                    onClick={byGeolocation}
                >Geo</button>
            </form>
        </div>
    )
}

export default Form;