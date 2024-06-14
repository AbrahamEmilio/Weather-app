import './WeatherCityCard.scss';
import {React, useState, useEffect} from 'react';

import clouds from '../../../assets/cloud.png'
import clear from '../../../assets/sun.png'
import rain from '../../../assets/raining.png'
import wind from '../../../assets/wind.png'
import drizzle from '../../../assets/drizzle.png'
import patchy from '../../../assets/patchy.png'


function WeatherCityCard ({min, max, key, img, date}){

    const [weatherIcon2, setWeatherIcon2] = useState();
    const [dayWeek, setDayWeek] = useState();

    const changeDate = () => {
        const dateDay = date
        const newDateDay = dateDay.replace(/-/g, ', ');
        const dateConvert = new Date(newDateDay);
        const dateConvert2 = dateConvert.toString();
        const dateConvert3 = dateConvert2.split(" ");
        const dataClean = dateConvert3[0]

        switch(dataClean){
            case 'Mon':
            setDayWeek('Monday');
            break;

            case 'Tue':
            setDayWeek('Tuesday');
            break;

            case 'Wed':
            setDayWeek('Wednesday');
            break;

            case 'Thu':
            setDayWeek('Thursday');
            break;
                    
            case 'Fri':
            setDayWeek('Friday');
            break;

            case 'Sat':
            setDayWeek('Saturday');
            break;

            case 'Sun':
            setDayWeek('Sunday');
            break;

            default:
                setDayWeek('')
        }
    }

    const getIcon2 = () => {
        switch(img){

            case 'Patchy rain nearby':
            setWeatherIcon2(patchy);
            break;
    
            case 'Sunny':
            setWeatherIcon2(clear);
            break;
    
            case 'Partly Cloudy':
                setWeatherIcon2(clouds);
            break;
    
            case 'Heavy rain':
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
        changeDate();
    }, [])

    return(
        <>
            <div className='weatherCityCard' key={key}>
                <div className='weatherCityCard__iconContainer'>
                    <img className='weatherCityCard__icon' alt="" src={weatherIcon2} />
                    <p className='weatherCityCard__day'>{dayWeek}</p>
                </div>
                <div className='division'></div>
                <div weatherCityCard__info>
                    <div className='weatherCityCard__tempContainer'>
                        <p className='weatherCityCard__temp'>{img}</p>
                    </div>
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