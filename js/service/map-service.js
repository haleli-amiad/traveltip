'use strict'
var gLocations;
const STORAGE_MAP_KEY = 'mapDB';






function initMap(lat = 32.0749831, lng = 34.9120554) {
    var elMap = document.querySelector('#map');
    var options = {
        center: { lat, lng },
        zoom: 16
    };
    var map = new google.maps.Map(
        elMap,
        options
    );
    map.addListener('click', ev => {
        console.log(ev)
        const location = prompt('enter location name:')
        const latCoord = ev.latLng.lat();
        const lngCoord = ev.latLng.lng();

        gLocations.push(_createLoc(location,latCoord,lngCoord))
        marker = new google.maps.Marker({ position: ev.latLng, map: map })
        saveLocationsToStorage(STORAGE_MAP_KEY, gLocations);
        renderMap()


    })

    var marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: 'Hello World!'
    });

}


function handleLocationError(error) {
    var locationError = document.getElementById("locationError");

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
            break;
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
            break;
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
            break;
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location.";
            break;
    }
}


function getPosition() {
    if (!navigator.geolocation) return alert("HTML5 Geolocation is not supported in your browser.");
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
    navigator.geolocation.watchPosition(showLocation, handleLocationError);
}

function showLocation(position) {
    initMap(position.coords.latitude, position.coords.longitude);
}

function initLocations() {
    _createLocs();

}

function getLocation() {
    return gLocations;
}

function _createLoc(name, latitude, longitude) {
    var location = {
        id: makeId(),
        locName: name,
        time: Date.now(),
        positionLat: latitude,
        positionLong: longitude
    }
    return location;
}

function _createLocs() {
    let locations = loadFromStorage(STORAGE_MAP_KEY);
    if (!locations) {
        locations = [];
        locations.push(_createLoc('Place'));
    }
    gLocations = locations;
    saveLocationsToStorage(STORAGE_MAP_KEY, gLocations);
}

function saveLocationsToStorage() {
    saveToStorage(STORAGE_MAP_KEY, gLocations);
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}



