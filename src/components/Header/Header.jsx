import {React} from 'react'
import './Header.scss'

function Header(){
    return(
        <>
            <div className='header'>
                    <div className='header__title-container'>
                        <p className='header__title'>Weather App</p>
                    </div>
                    <div className='header__menu-container'>
                        <ul className='header__menu'>
                            <li className='header__listItem'>
                                <p>Weather</p>
                            </li>
                            <li className='header__listItem'>
                                <p>About us</p>
                            </li>
                            <li className='header__listItem'>
                                <p>Contact</p>
                            </li>
                        </ul>
                    </div>
            </div>
        </>
    )
}

export default Header;