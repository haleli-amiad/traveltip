'use strict';
import { weatherService } from './service/weather-service.js'

window.addEventListener('load', onInitWeather)

function onInitWeather() {
    weatherService.weather()
        .then(renderWeather)
}

function renderWeather(weather) {
    var weathDesc = weather.weather[0].description
    var weathSunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString()
    var weathSunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString()
    var weathCity = weather.name
    var strHtml = `<p class="weather"> ${weathDesc} in ${weathCity}, sunrise at ${weathSunrise}, sunset at ${weathSunset}`
    document.querySelector('.weather').innerHTML = strHtml
}