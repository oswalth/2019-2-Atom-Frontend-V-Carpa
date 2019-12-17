import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'


const DetailView = (props) => {
    const Api_Key = 'a2df596b1f176ee0d6618cf361f63153'
    const [data, setData] = useState(null)

    useEffect(() => {
        axios(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${Api_Key}`)
        .then((res) => {
          setData(res.data)
          console.log(data)
        })
    }, []) 

    if (data === null) {
        return null;
    }
    
    return(
        <div className="detailsContainer">
            <div className="id">{data.city.id}</div>
            <div className="city">{data.city.name}</div>
            <div className="temp">{data.list[0].main.temp}&deg;</div>
        </div>
    )
}

export default DetailView