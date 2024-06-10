import {React} from 'react';
import './WeatherCityCard.scss';


function WeatherCityCard ({temp, day, min, max}){
    return(
        <>
            <div className='weatherCityCard'>
                <div className=''>
                    <img className='' src="" alt="" />
                </div>
                <div>
                    <p className=''>{temp}</p>
                    <div className=''>
                        <p className=''>{min}</p>
                        <p className=''>{max}</p>
                    </div>
                    <p className=''>{day}</p>
                </div>
            </div>
        </>
    )
}

export default WeatherCityCard;