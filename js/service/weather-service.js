'use strict';

export const weatherService = {
    weather
}

function weather() {
    return axios.get('http://api.openweathermap.org/data/2.5/weather?q=jerusalem,il&APPID=75a8f7c79876336f933c6f13f721a785')
        .then(res => res.data)
}