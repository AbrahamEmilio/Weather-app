import {React,  useState, useEffect} from 'react';
import './WeatherCity.scss';
import WeatherCityCard from './WeatherCityCard/WeatherCityCard.jsx';
import WeatherRandom from './WeatherRandom/WeatherRandom.jsx';
const API_KEY = 'c60df418b9927150faa290e3d8418c82';
const API_KEYW = '6d896c09c0734efea15154239241306';

import clouds from '../../assets/cloud.png'
import clear from '../../assets/sun.png'
import rain from '../../assets/raining.png'
import wind from '../../assets/wind.png'
import drizzle from '../../assets/drizzle.png'

function WeatherCity (){

    const [cityName, setCityName] = useState('');
    const [dataWeather, setDataWeather] = useState('');
    const [temp, setTemp] = useState('');
    const [tempMax, setTempMax] = useState('');
    const [tempMin, setTempMin] = useState('');
    const [name, setName] = useState('');
    const [climaDia, setClimaDia] = useState([]);
    const [weatherIcon, setWeatherIcon] = useState();
    const [arrCities, setArrCities] = useState([]);
    const [map, setMap] = useState('');
    
        const getCoordinates = async() => {
            const responseL = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}&units=metric`);
            const dataL = await responseL.json();

            const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEYW}&q=${dataL[0].name}&days=7`);
            const dataD = await response.json();
            const dataD2 = dataD.forecast.forecastday;
            setClimaDia(dataD2)

            let lat = await dataL[0].lat.toFixed(2);
            let lon = await dataL[0].lon.toFixed(2);

            const responseW = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
            const dataW = await responseW.json();
            setDataWeather(dataW);

            setName(dataL[0].name);
            setTemp(Math.trunc(dataW.main.temp) + ' °');
            setTempMax('Max ' + Math.trunc(dataW.main.temp_max) + ' °');
            setTempMin('Min ' + Math.trunc(dataW.main.temp_min) + ' °');

            switch(dataW.weather[0].main){

                case 'Clouds':
                setWeatherIcon(clouds);
                break;

                case 'Clear':
                setWeatherIcon(clear);
                break;

                case 'Rain':
                    setWeatherIcon(rain);
                break;

                case 'Drizzle':
                    setWeatherIcon(drizzle);
                break;

                default:
                    setWeatherIcon(clear)
            }
        }

        useEffect(() => {
            weatherRandom()
            getMap()
        }, [])

        const weatherRandom = async() => {

            let arrayCiudades = [];
            const cities = ['Paris', 'Tokyo', 'Toronto', 'New York', 'Ciudad de mexico', 'Los angeles', 'dinamarca', 'Dubai', 'San francisco', 'Estambul', 'Oporto', 'Seul', 'Amsterdam', 'Praga', 'Bangkok']
            let numbers = [];

            for(let i = 0; i < 5; i++){

                    let nr = Math.floor(Math.random() * cities.length -1)

                    if(!numbers.includes(nr)){
                        numbers.push(nr)
                    } else {
                        nr = Math.floor(Math.random() * cities.length -1)
                        numbers.push(nr)
                    }
                }

            await Promise.all (numbers.map(async (e) => {
                const responseL = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cities[e]}&appid=${API_KEY}&units=metric`);
                const dataL = await responseL.json();
            
                let lat = await dataL[0].lat.toFixed(2);
                let lon = await dataL[0].lon.toFixed(2);
            
                const responseW = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
                const dataW = await responseW.json();
                arrayCiudades.push(dataW);
            }))

            setArrCities(arrayCiudades)
        }

        const getMap = async() => {
            const response = await fetch(`https://tile.openweathermap.org/map/{temp_new}/${1}/${1}/${1}.png?appid=${API_KEY}`)
            const data = await response.json()
            setMap(data)
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
                <div className={dataWeather ? 'division' : 'hidden'}></div>
                <div className='weatherCityInfo'>
                    <div className={dataWeather ? 'weatherCity__container' : 'hidden'}>
                        <img src={weatherIcon} className='weatherCity__icon' alt="" />
                        <div className='weatherCity__infoContainer'>
                            <div className='weatherCity__tempContainer'>
                                <p className='weatherCity__temp'>{temp}</p>
                                <p className='weatherCity__city'>{(name)}</p>
                            </div>
                            <div className='division'></div>
                            <div className='weatherCity__cityContainer'>
                            </div>
                            <div className='weatherCity__tempMaxMinContainer'>
                                <p className='weatherCity__tempMax'>{tempMax}</p>
                                <p className='weatherCity__tempMin'>{tempMin}</p>
                            </div>
                            <div className='weatherCity__weatherContainer'>
                                <p className='weatherCity__description'>{(dataWeather ? dataWeather.weather[0].main : '')}</p>
                            </div>
                            <div className='weatherCity__windContainer'>
                            <img className='weatherCity__windIcon' src={wind} alt="" />
                                <p className='weatherCity__speed'>{(dataWeather ? dataWeather.wind.speed : '')}</p>
                            </div>
                        </div>
                    </div>
                    <div className={dataWeather ? 'weatherCityWeek__container' : 'hidden'}>
                        <p className='weatherCityWeek__title'>Weather week</p>
                        <div className='weatherCityWeek__cards'>
                            {climaDia.map((day) => {
                                return <WeatherCityCard max={'max ' + day.day.maxtemp_c + '°'} min={'min ' + day.day.mintemp_c + '°'} img={day.day.condition.text} key={day.date} date={day.date}/>
                            })}
                        </div>
                    </div>
                    <div>
                        <img src={map} alt="" />
                    </div>
                </div>
                <div className={arrCities ? 'division' : 'hidden'}></div>
                <div className={arrCities ? 'weatherCity__random' : 'hidden'}>
                    <p className='weatherCity__randomTitle'>The weather of the world</p>
                    <div className='weatherCity__containerRandom'>
                        {
                            arrCities.map((day) => {
                                return <WeatherRandom temp={Math.trunc(day.main.temp) + '°'} city={day.name} weather={day.weather[0].main} min={'Min ' + Math.trunc(day.main.temp_min) + ' °'} max={'Max ' + Math.trunc(day.main.temp_max) + ' °'} img={(day.weather[0].main )} key={day.id}/>
                            })
                        }
                    </div>
                </div>
                <div className='weatherCity__week'>
                </div>
                {console.log(climaDia)}
            </div>
        </>
    )
}

export default WeatherCity;