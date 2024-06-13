import {React} from 'react';
import './WeatherCityCard.scss';


function WeatherCityCard ({min, max, key}){
    return(
        <>
            <div className='weatherCityCard' key={key}>
                <img className='weatherCityCard__icon' alt="" />
                <div weatherCityCard__info>
                    {/* <p className='weatherCityCard__temp'>{temp}</p> */}
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