import {React,  useState} from 'react';
import './WeatherCity.scss';
import WeatherCityCard from './WeatherCityCard/WeatherCityCard.jsx';
const API_KEY = 'c60df418b9927150faa290e3d8418c82';

import cloudy from '../../assets/clouds.png'
import cloudyCard from '../../assets/clouds.png'


function WeatherCity (){

    const [cityName, setCityName] = useState('');
    const [dataWeather, setDataWeather] = useState('');
    const [temp, setTemp] = useState('');
    const [tempMax, setTempMax] = useState('');
    const [tempMin, setTempMin] = useState('');
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [climaDia, setClimaDia] = useState([]);
    const [clima, setClima] = useState()
    
        const getCoordinates = async() => {
            const responseL = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}&units=metric`);
            const dataL = await responseL.json();

            let lat = await dataL[0].lat.toFixed(2);
            let lon = await dataL[0].lon.toFixed(2);

            const responseW = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
            const dataW = await responseW.json();
            setDataWeather(dataW);

            setName(dataW.name);
            setTemp(Math.trunc(dataW.main.temp) + ' °');
            setTempMax('Max ' + Math.trunc(dataW.main.temp_max) + ' °');
            setTempMin('Min ' + Math.trunc(dataW.main.temp_min) + ' °');
            setCountry(dataW.sys.country);

            getWeatherHouer(lat, lon)

        }

        const getWeatherHouer = async(lat, lon) => {
            const responseD = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
            const dataD = await responseD.json();

            //Guardamos el array con el clima por hora en DaysWeather
            let daysWeather;
            daysWeather = dataD.list;
            setClima(dataD.list)
            //Creamos un array para almacenar solo los dias de la lista
            let arrWeek = [];

            //Iteramos sobre el estado donde se encuentran todos los dias y los dividimos para obtener solo el dia en un array nuevo
            daysWeather.forEach((element) => {
                let firstArray = element.dt_txt.split(' ');
                let secondArray = firstArray[0].split('-');
                arrWeek.push(secondArray[2]);
            })

            //Creamos un objeto del dia actual y lo guardamos en una estado llamado DateNow
            const now = new Date();
            const day = now.getDate().toString();

            let finded = [];

            let idx = arrWeek.indexOf(day);
            while(idx != -1){
                finded.push(idx);
                idx = arrWeek.indexOf(day, idx + 1);
            }

            const climaHora = []

            finded.forEach((e) => {
                climaHora.push(daysWeather[e])
            })

            setClimaDia(climaHora)

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
                <div className='weatherCity'>
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
                    <div className={dataWeather ? 'weatherCityWeek__container' : 'hidden'}>
                        <p className='weatherCityWeek__title'>The weather of the week</p>
                        <div className='weatherCityWeek__cards'>
                            {climaDia.map((day) => {
                                return <WeatherCityCard temp={Math.trunc(day.main.temp) + '°'} day={day.dt_txt} min={'Min ' + Math.trunc(day.main.temp_min) + ' °'} max={'Max ' + Math.trunc(day.main.temp_max) + ' °'} img={cloudyCard} key={day.dt_txt}/>
                            })}
                        </div>
                    </div>
                </div>
                {console.log(clima)}
                <div className='weatherCity__week'>
                </div>
            </div>
        </>
    )
}

export default WeatherCity;