import {React, useState, useEffect} from 'react';
import './WeatherCityCard.scss';

import clouds from '../../../assets/cloud.png'
import clear from '../../../assets/sun.png'
import rain from '../../../assets/raining.png'
import wind from '../../../assets/wind.png'
import drizzle from '../../../assets/drizzle.png'


function WeatherCityCard ({min, max, key, img}){

    const [weatherIcon2, setWeatherIcon2] = useState();

    const getIcon2 = () => {
        switch(img){

            case 'Patchy rain nearby':
            setWeatherIcon2(clouds);
            break;
    
            case 'Sunny':
            setWeatherIcon2(clear);
            break;
    
            case 'Partly Cloudy':
                setWeatherIcon2(rain);
            break;
    
            case 'Moderate rain':
                setWeatherIcon2(drizzle);
            break;
    
            default:
                setWeatherIcon2(clear)
        }
    }


    useEffect(() => {
        getIcon2();
    }, [])

    return(
        <>
            <div className='weatherCityCard' key={key}>
                <div className='weatherCityCard__iconContainer'>
                    <img className='weatherCityCard__icon' alt="" src={weatherIcon2} />
                </div>
                <div weatherCityCard__info>
                        <p className='weatherCityCard__temp'>{img}</p>
                    <div className='weatherCityCard__maxContainer'>
                        <p className='weatherCityCard__max'>{max}</p>
                        <p className='weatherCityCard__min'>{min}</p>
                    </div>
                    {/* <p className='weatherCityCard__day'>{day}</p> */}
                </div>
            </div>
        </>
    )
}

export default WeatherCityCard;