import {React, useState, useEffect} from 'react';
import './WeatherRandom.scss';

import clouds from '../../../assets/cloud.png'
import clear from '../../../assets/sun.png'
import rain from '../../../assets/raining.png'


function WeatherRandom ({temp, city, weather, min, max, img, key}){

    const [weatherIconRandom, setWeatherIconRandom] = useState('');
    
    const getIcon = () => {
        switch(img){
        
            case 'Clouds':
            setWeatherIconRandom(clouds);
            break;
    
            case 'Clear':
            setWeatherIconRandom(clear);
            break;
    
            case 'Rain':
            setWeatherIconRandom(rain);
            break;
    
            default:
            setWeatherIconRandom(clear)
            }
    }

    useEffect(() => {
        getIcon();
    }, [])

    return(
        <>
            <div className='weatherRandom' key={key}>
                <div className='weatherRandom__tempContainer'>
                    <img className='weatherRandom__icon' src={weatherIconRandom} alt="" />
                    <p className='weatherRandom__temp'>{temp}</p>
                </div>
                <div className='weatherRandom__info'>
                    <p className='weatherRandom__city'>{city}</p>
                    <p className='weatherRandom__weather'>{weather}</p>
                    <div className='weatherRandom__maxContainer'>
                        <p className='weatherRandom__max'>{max}</p>
                        <p className='weatherRandom__min'>{min}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WeatherRandom;