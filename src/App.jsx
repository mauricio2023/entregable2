import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'

function App() {


    const [information, setInformation] = useState({}) 
    useEffect(() => {
        
        navigator.geolocation.getCurrentPosition(success)

        function success(pos) {
          const crd = pos.coords;    
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=48b138f8e06aefe75b0c1b9de88ea925&units=imperial`)
         .then(res => setInformation(res.data))
        };
    }, [])

console.log(information)

const [changeTemperature, setChangeTemperature] = useState(true)
const cambio = () =>{
   setChangeTemperature(!changeTemperature)

}

const temperature =(changeTemperature ? information.main?.temp + " f°" : `${(information.main?.temp - 32) * 5/9} c°`)

const icon = `http://openweathermap.org/img/wn/${information.weather?.[0].icon}@2x.png `


    return (
    <div className="App">

      <div className="container">

        <h1 className='title'>Wheather App</h1>
        <h2 className='location'>{information.name}, {information.sys?.country}</h2>
        <div className="information">
          <div className="temparatura">
            <p className="temperature">{temperature}</p>
          </div>
          <div className='center'>
            <ul className='list'>
              <li className="general_information">
                <i></i>
                <p></p>
                <span></span>
              </li>
              <li className="general_information">
                <i></i>
                <p>Wind speed: {information.wind?.speed} m/s</p>
                <span></span>
              </li>
              <li className="general_information">
                <i></i>
                <p>clouds: {information.clouds?.all}%</p>
                <span></span>
              </li>
              <li className="general_information">
                <i></i>
                <p>Pressure: {information.main?.pressure}mb</p>
                <span></span>
              </li>
            </ul>
             <img src={icon} alt="" className='img'/>
          </div>
        </div>

        <div className="btn">
          <button className='btn' onClick={cambio}>Degrees °F/°C</button>
        </div>



      </div>

    </div>
  )
}

export default App
