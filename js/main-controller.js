'use strict';

import { mapService } from './service/map-service.js'
import { weatherService } from './service/weather-service.js'
import { weatherController } from './weather-controller.js';
window.addEventListener('load', onInitMap)


var gMap;
var gLocs;
document.querySelector('.location').addEventListener('click', onUserLocation)
document.querySelector('.copy-location').addEventListener('click', onCopyLocation)

function onInitMap() {
    initMap()
    mapService.initLocations();
    renderMap();
}



function renderMap() {
    gLocs = mapService.getLocations();
    var locsUl = gLocs.map((loc) => {
        var time = new Date(loc.time).toLocaleString();
        return `
        <li> Latitude </li>
        <span>'${loc.locName}'</span>
        <span>'${loc.positionLat}'</span>
        <li>Longitude</li>
        <span>'${loc.positionLong}'</span>
        <li>Timestamp</li>
        <span>'${time}'</span>
        <button class="remove-btn" id="'${loc.id}'">🗑️</button>
        <button class="go-marked-loc-btn" id="${loc.id}">Go</button>
        </br>
        `
    })
    document.querySelector('.marked').innerHTML = locsUl;
    var removeBtns = document.querySelectorAll('.remove-btn')
    removeBtns.forEach(btn => {
        btn.addEventListener('click', () => onRemoveLoc(btn.id));
    });

    var markedLocBtns = document.querySelectorAll('.go-marked-loc-btn')
    markedLocBtns.forEach(btn => {
        btn.addEventListener('click', () => onGoMarkedLoc(btn.id));
    });
}

function onUserLocation() {
    getPosition();
}


function onRemoveLoc(locId) {
    var locIdx = gLocs.findIndex(function (loc) {
        return locId === loc.id
    })
    gLocs.splice(locIdx, 1)
    mapService.removeLoc(gLocs);
    renderMap();
}

function getLocId(id) {
    return gLocs.find(loc => loc.id === id);
}

function onGoMarkedLoc(locId) {
    var lat = getLocId(locId);
    initMap(lat.positionLat, lat.positionLong);
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
    const geocoder = new google.maps.Geocoder();
    document.getElementById("submit").addEventListener("click", () => {
        geocodeAddress(geocoder, gMap);
    });
}

function geocodeAddress(geocoder, resultsMap) {
    const address = document.getElementById("address").value;
    geocoder.geocode({ address: address }, (results, status) => {
        renderWrittenLocation(address)
        if (status === "OK") {
            resultsMap.setCenter(results[0].geometry.location);
            var latForWeath = results[0].geometry.location.lat();
            var lngForWeath = results[0].geometry.location.lng();
            weatherService.weather(latForWeath, lngForWeath)
                .then(weatherController.renderWeather)
            new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
            });
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

function renderWrittenLocation(address) {
    document.querySelector('.curr-location').innerText = address

}

function onAddLocation(ev) {
    console.log(ev)
    const location = prompt('enter location name:')
    const latCoord = ev.latLng.lat();
    const lngCoord = ev.latLng.lng();
    var marker = new google.maps.Marker({ position: ev.latLng, map: gMap })
    renderWrittenLocation(location)
    weatherService.weather(latCoord, lngCoord)
        .then(weatherController.renderWeather)
    mapService.addLocation(location, latCoord, lngCoord);
    renderMap()
}

function showLocation(position) {
    initMap(position.coords.latitude, position.coords.longitude);
}


function onCopyLocation() {
    var $temp = $("<input>");
    var $url = $(location).attr('href');
    $('.copy-location').on('click', function() {
      $("body").append($temp);
      $temp.val($url).select();
      document.execCommand("copy");
      $temp.remove();
      $("small").text("URL copied!");
    })
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