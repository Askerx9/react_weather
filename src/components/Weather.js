import React from 'react'
import './Weather.css'
import {formatDate, round} from '../utils/utils'


const Wheather = ({data}) => {

  return (
    <ul className="weather">
      <li className="weather__info weather__info--big">
        {round(data.main.temp)}°C<br />
        <span>
          min: {round(data.main.temp_min)}°c | max: {round(data.main.temp_max)}°c
        </span>
      </li>
      {/* <li className="weather__info">
        <span className="info__title rain">Rain</span><br />
        {data.rain ? (data.rain['1h']*10)+'cm/h' : '-'}
      </li> */}
      <li className="weather__info">
        <span className="info__title wind">Wind</span><br />
        {Math.ceil(data.wind.speed * 3.6)} Km/h
      </li>
      <li className="weather__info">
        <span className="info__title humidity">humidity</span><br />
        {data.main.humidity}%
      </li>
      <li className="weather__info">
        <span className="info__title sunrise">Sunrise</span><br />
        {formatDate(data.sys.sunrise)}
      </li>
      <li className="weather__info">
        <span className="info__title sunset">Sunset</span><br />
        {formatDate(data.sys.sunset)}
      </li>
    </ul>
  )
}

export default Wheather