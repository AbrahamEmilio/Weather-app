import { React } from 'react'
import './App.css'
import Header from './components/Header/Header.jsx'
import Banner from './components/Banner/Banner.jsx'
import Weather from './components/Weather/Weather.jsx'
import WeatherCity from './components/WeatherCity/WeatherCity.jsx'
import Footer from './components/Footer/Footer.jsx'

function App() {

  return (
    <>
      <Header />
      <Banner />
      <Weather />
      <WeatherCity />
      <Footer />
    </>
  )
}

export default App
