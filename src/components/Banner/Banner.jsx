import {React} from 'react'
import './Banner.scss'

function Banner(){
    return(
        <>
            <div className='banner'>
                <div className='banner__infoContainer'>
                    <h2 className='banner_title'>Know the actual weather on your city</h2>
                    <p className='banner_text'>All the information is provides from a important source</p>
                </div>
            </div>
        </>
    )
}

export default Banner;