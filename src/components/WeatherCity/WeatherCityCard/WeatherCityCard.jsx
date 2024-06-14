import {React, useState, useEffect} from 'react';
import './WeatherCityCard.scss';

import clouds from '../../../assets/cloud.png'
import clear from '../../../assets/sun.png'
import rain from '../../../assets/raining.png'
import wind from '../../../assets/wind.png'
import drizzle from '../../../assets/drizzle.png'


function WeatherCityCard ({min, max, key, img, date}){

    const [weatherIcon2, setWeatherIcon2] = useState();
    const [dateJs, setDateJs] = useState();
    const [dayWeek, setDayWeek] = useState();

    const changeDate = () => {
        const dateDay = date
        const newDateDay = dateDay.replace(/-/g, ', ');
        const dateConvert = new Date(newDateDay);
        const dateConvert2 = dateConvert.toString();
        const dateConvert3 = dateConvert2.split(" ");
        setDateJs(dateConvert3[0])

        switch(dateJs){
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
        changeDate();
    }, [])

    console.log(dayWeek)

    return(
        <>
            <div className='weatherCityCard' key={key}>
                <div className='weatherCityCard__iconContainer'>
                    <img className='weatherCityCard__icon' alt="" src={weatherIcon2} />
                    <p className='weatherCityCard__day'>{dayWeek}</p>
                </div>
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