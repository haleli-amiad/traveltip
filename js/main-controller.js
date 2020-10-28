'use strict';

import { mapService } from './service/map-service.js'
window.addEventListener('load', onInitMap)


var gMap;


function onInitMap() {
    document.querySelector('.center').addEventListener('click', onCenter)
    document.querySelector('.delete-loc').addEventListener('click', deleteLoc)
    initMap()
    mapService.initLocations();
    renderMap();
}



function renderMap() {
    let locs = mapService.getLocations();
    var locsUl = locs.map((loc) => {
        var time = new Date(loc.time).toLocaleString();
        return `
        <li> Latitude </li>
        <span>'${loc.positionLat}'</span>
        <li>Longitude</li>
        <span>'${loc.positionLong}'</span>
        <li>Timestamp</li>
        <span>'${time}'</span>
        <button onclick="deleteLoc('${loc.id}')">🗑️</button>
        </br>
    `
    })
    document.querySelector('.marked').innerHTML = locsUl;
}

function onCenter() {
    getPosition();
}

function deleteLoc(locId) {
    var locIdx = gLocations.findIndex(function (loc) {
        return locId === loc.id
    })
    gLocations.splice(locIdx, 1)
    mapService.saveLocationsToStorage(STORAGE_MAP_KEY, gLocations);
    renderMap();
}




function initMap(lat = 32.0749831, lng = 34.9120554) {
    var elMap = document.querySelector('#map');
    var options = {
        center: { lat, lng },
        zoom: 16
    };
    gMap = new google.maps.Map(
        elMap,
        options
    );
    gMap.addListener('click', onAddLocation)
}


function onAddLocation(ev) {
    console.log(ev)
    const location = prompt('enter location name:')
    const latCoord = ev.latLng.lat();
    const lngCoord = ev.latLng.lng();
    var marker = new google.maps.Marker({ position: ev.latLng, map: gMap })
    // mapService.saveLocationsToStorage(STORAGE_MAP_KEY, gLocations);
    // var marker = new google.maps.Marker({
    //     position: { lat, lng },
    //     map,
    //     title: 'Hello World!'
    // });
    mapService.addLocation(latCoord, lngCoord);
    renderMap()
}

function showLocation(position) {
    initMap(position.coords.latitude, position.coords.longitude);
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