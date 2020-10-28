'use strict';

export const weatherService = {
    weather
}

function weather(lat = 32.0749831, lng = 34.9120554) {
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=75a8f7c79876336f933c6f13f721a785`)
        .then(res => res.data)
}