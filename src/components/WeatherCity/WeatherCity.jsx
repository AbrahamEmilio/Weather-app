import {React,  useState} from 'react';
import './WeatherCity.scss';
import WeatherCityCard from './WeatherCityCard/WeatherCityCard.jsx';
const API_KEY = 'c60df418b9927150faa290e3d8418c82';

import cloudy from '../../assets/clouds.png'

function WeatherCity (){


    const [cityName, setCityName] = useState('');
    const [dataWeather, setDataWeather] = useState('');
    const [temp, setTemp] = useState('');
    const [tempMax, setTempMax] = useState('');
    const [tempMin, setTempMin] = useState('');
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [daysWeather, setDaysWeather] = useState([]);
    

        const getCoordinates = async() => {
            const responseL = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`);
            const dataL = await responseL.json();

            let lat = await dataL[0].lat.toFixed(2);
            let lon = await dataL[0].lon.toFixed(2);

            const responseW = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
            const dataW = await responseW.json();
            setDataWeather(dataW);

            const responseD = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
            const dataD = await responseD.json();
            let days = [];
            for(let i = 0; i < 8; i++){
                days.push(dataD.list[i])
            }
            setDaysWeather(days)
            // setDaysWeather(dataD.list)

            setName(dataW.name);
            setTemp(Math.trunc(dataW.main.temp - 273) + ' °');
            setTempMax('Max ' + Math.trunc(dataW.main.temp_max - 273) + ' °');
            setTempMin('Min ' + Math.trunc(dataW.main.temp_min - 273) + ' °');
            setCountry(dataW.sys.country);
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
                    <div className={dataWeather ? 'weatherCity__container' : 'hidden'}>
                        <img src={cloudy} className='weatherCity__icon' alt="" />
                        <div className='weatherCity__infoContainer'>
                            <div className='weatherCity__tempContainer'>
                                <p className='weatherCity__temp'>{temp}</p>
                            </div>
                            <div className='weatherCity__tempMaxMinContainer'>
                                <p className='weatherCity__tempMax'>{tempMax}</p>
                                <p className='weatherCity__tempMin'>{tempMin}</p>
                            </div>
                            <div className='weatherCity__weatherContainer'>
                                <p className='weatherCity__description'>{(dataWeather ? dataWeather.weather[0].description : '')}</p>
                            </div>
                            <div className='weatherCity__windContainer'>
                                <p className='weatherCity__wind'>Wind</p>
                                <p className='weatherCity__speed'>{(dataWeather ? dataWeather.wind.speed : '')}</p>
                            </div>
                            <div className='weatherCity__cityContainer'>
                                <p className='weatherCity__country'>{(country)}</p>
                                <p className='weatherCity__city'>{(name)}</p>
                            </div>
                        </div>
                    </div>
                    <div className='weatherCityWeek__container'>
                        <p>The weather of the week</p>
                        <div className='weatherCityWeek__cards'>
                            {daysWeather.map((day) => {
                                return <WeatherCityCard temp={day.main.temp} day={day.dt_txt} min={day.main.temp_min} max={day.main.temp_max} />
                            })}
                        </div>
                    </div>
                </div>
                <div className='weatherCity__week'>
                </div>
            </div>
        </>
    )
}

export default WeatherCity;