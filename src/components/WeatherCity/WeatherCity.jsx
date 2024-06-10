import {React,  useState} from 'react';
import './WeatherCity.scss';
import WeatherCityCard from './WeatherCityCard/WeatherCityCard.jsx';
const API_KEY = 'c60df418b9927150faa290e3d8418c82';

import cloudy from '../../assets/clouds.png'

function WeatherCity (){

    const [cityName, setCityName] = useState('');
    const [dataWeather, setDataWeather] = useState('');
    const [temp, setTemp] = useState('');
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');


        const getCoordinates = async() => {
            const responseL = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`)
            const dataL = await responseL.json()

            let lat = await dataL[0].lat.toFixed(2);
            let lon = await dataL[0].lon.toFixed(2);

            const responseW = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
            const objectData = await responseW.json();

            setDataWeather(objectData);
            setName(objectData.name);
            setTemp(Math.trunc(objectData.main.temp - 273) + ' °');
            setCountry(objectData.sys.country);
        }

    return(
        <>
            <div className='weatherCity'>
                <div className='weatherCity__searchContainer'>
                    <h3 className='weatherCity__title'>Search the weather of your city</h3>
                    <div className='weatherCity__inputContainer'>
                        <input className='weatherCity__input' type="text" placeholder='Search your city' onChange={(e) => {setCityName(e.target.value)}} />
                        <button className='weatherCity__button' onClick={()=>{
                            getCoordinates();
                        }}>Search</button>
                    </div>
                </div>
                <div>
                    <div className='weatherCity__container'>
                        <img src={cloudy} className='weatherCity__icon' alt="" />
                        <div className='weatherCity__infoContainer'>
                            <div className='weatherCity__tempContainer'>
                                <p className='weatherCity__temp'>{(temp ? temp : '')}</p>
                            </div>
                            <div className='weatherCity__weatherContainer'>
                                <p className='weatherCity__description'>{(dataWeather ? dataWeather.weather[0].description : '')}</p>
                            </div>
                            <div className='weatherCity__windContainer'>
                                <p className='weatherCity__wind'>Wind</p>
                                <p className='weatherCity__speed'>{(dataWeather ? dataWeather.wind.speed : '')}</p>
                            </div>
                            <div className='weatherCity__cityContainer'>
                                <p className='weatherCity__country'>{(country ? country : '')}</p>
                                <p className='weatherCity__city'>{(name ? name : '')}</p>
                            </div>
                        </div>
                        {console.log(dataWeather)}
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