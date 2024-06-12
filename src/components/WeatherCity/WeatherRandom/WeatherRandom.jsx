import {React} from 'react';
import './WeatherRandom.scss';


function WeatherRandom ({temp, city, weather, min, max, img, key}){
    return(
        <>
            <div className='weatherRandom' key={key}>
                <div className='weatherRandom__tempContainer'>
                    <img className='weatherRandom__icon' src={img} alt="" />
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