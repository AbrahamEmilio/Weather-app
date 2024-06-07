import {React,  useState} from 'react';
import './WeatherCity.scss';
import WeatherCityCard from './WeatherCityCard/WeatherCityCard.jsx';
const API_KEY = 'c60df418b9927150faa290e3d8418c82';

function WeatherCity (){

    const [cityName, setCityName] = useState('');
    const [dataWeather, setDataWeather] = useState('');

    const getCoordinates = async() => {
        const responseL = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`)
        const dataL = await responseL.json()
        
        let lat = dataL[0].lat.toFixed(2);
        let lon = dataL[0].lon.toFixed(2);

        const responseW = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const dataW = await responseW.json();

        setDataWeather(dataW)
    }

    return(
        <>
            <div className='weatherCity'>
                <h3 className='weatherCity_title'>Search the weather of your city</h3>
                <div>
                    <input className='weatherCity_input' type="text" placeholder='Search your city' onChange={(e) => {setCityName(e.target.value)}} />
                    <button className='weatherCity_button' onClick={()=>{
                        getCoordinates();
                    }}>Search</button>
                </div>
                <div>
                    <div>
                        <p></p>
                    </div>
                    <div>
                        <img src="" alt="" />
                        <p>34C</p>
                    </div>
                </div>
                <div className='weatherCity__week'>
                    {
                        // weather.map((element) => {
                        //     return <WeatherCityCard />
                        // })
                    }
                </div>
            </div>
        </>
    )
}

export default WeatherCity;