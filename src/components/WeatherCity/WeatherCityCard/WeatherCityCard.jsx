import {React} from 'react';
import './WeatherCityCard.scss';


function WeatherCityCard ({temp, day, min, max}){
    return(
        <>
            <div className='weatherCityCard'>
                <div className=''>
                    <img className='' src="" alt="" />
                </div>
                <div weatherCityCard__info>
                    <p className='weatherCityCard__temp'>{temp}</p>
                    <div className='weatherCityCard__maxContainer'>
                        <p className='weatherCityCard__max'>{max}</p>
                        <p className='weatherCityCard__min'>{min}</p>
                    </div>
                    <p className='weatherCityCard__day'>{day}</p>
                </div>
            </div>
        </>
    )
}

export default WeatherCityCard;