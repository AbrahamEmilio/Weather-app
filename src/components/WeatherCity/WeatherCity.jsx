import {React,  useState} from 'react';
import './WeatherCity.scss';
import WeatherCityCard from './WeatherCityCard/WeatherCityCard.jsx';
const API_KEY = '5c1c969d600654194e2c5b11a4e63a4c';

function WeatherCity (){

    let lat;
    let lon;
    let weatherCity;
    let sky;

    let weatherWeek = [
        {
            nameCity: 'Dallas',
            weather: 32,
            day: 'Monday'
        },
        {
            nameCity: 'Dallas',
            weather: 32,
            day: 'Tuesday'
        },
        {
            nameCity: 'Dallas',
            weather: 32,
            day: 'Wednesday'
        },
        {
            nameCity: 'Dallas',
            weather: 32,
            day: 'Thursday'
        },
        {
            nameCity: 'Dallas',
            weather: 32,
            day: 'Saturday'
        },
        {
            nameCity: 'Dallas',
            weather: 32,
            day: 'Sunday'
        }
    ];

    const getCoordinates = async() => {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q='dallas'&appid=${API_KEY}`)
        const data = await response.json()
        lat = data[0].lat.toFixed(2);
        lon = data[0].lon.toFixed(2);

        getData(lat, lon);
    }

    const getData = async() => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const data = await response.json();
        
        weatherCity = data;
        sky = weatherCity.weather[0].main;

        // if(data.cod !== '200'){
        //     console.log(data.cod)
        // } else (
        //     console.log(data)
        // )
    }

    getCoordinates();

    const [weather, setWeather] = useState(weatherWeek)

    return(
        <>
            <div className='weatherCity'>
                <h3>Search the weather of your city</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, placeat?</p>
                <div>
                    <input type="text" placeholder='Search your city' />
                    <button>Search</button>
                </div>
                <div>
                    <div>
                        <p>{sky}</p>
                    </div>
                    <div>
                        <img src="" alt="" />
                        <p>34C</p>
                    </div>
                </div>
                <div className='weatherCity__week'>
                    {
                        weather.map((element) => {
                            return <WeatherCityCard />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default WeatherCity;