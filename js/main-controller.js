'use strict';

import {mapService} from './service/map-service.js'
window.addEventListener('load', onInitMap)
document.querySelector('.center').addEventListener('click', onCenter)

function onInitMap() {
    initMap()
    // mapService.initLocations();
    // renderMap();
}

// var gLocations;

// function renderMap() {
// // let locs = getLocation();
// var locsUl = locs.map((loc) => {
//     var time = new Date(loc.time).toLocaleString();
//     return `
//         <li> Latitude </li>
//         <span>'${loc.positionLat}'</span>
//         <li>Longitude</li>
//         <span>'${loc.positionLong}'</span>
//         <li>Timestamp</li>
//         <span>'${time}'</span>
//         <button onclick="deleteLoc('${loc.id}')">🗑️</button>
//         </br>
//     `
// })
// document.querySelector('.marked').innerHTML = locsUl;
// }

function onCenter() {
    getPosition();
}

// function deleteLoc(locId) {
//     var locIdx = gLocations.findIndex(function (loc) {
//         return locId === loc.id
//     })
//     gLocations.splice(locIdx, 1)
//     mapService.saveLocationsToStorage(STORAGE_MAP_KEY, gLocations);
//     renderMap();
// }



// function getLocation() {
//     return gLocations;
// }

// function initMap(lat = 32.0749831, lng = 34.9120554) {
//     var elMap = document.querySelector('#map');
//     var options = {
//         center: { lat, lng },
//         zoom: 16
//     };
//     var map = new google.maps.Map(
//         elMap,
//         options
//     );
//     map.addListener('click', ev => {
//         console.log(ev)
//         const location = prompt('enter location name:')
//         const latCoord = ev.latLng.lat();
//         const lngCoord = ev.latLng.lng();

//         gLocations.push(_createLoc(location,latCoord,lngCoord))
//         marker = new google.maps.Marker({ position: ev.latLng, map: map })
//         mapService.saveLocationsToStorage(STORAGE_MAP_KEY, gLocations);
//         renderMap()


//     })

//     var marker = new google.maps.Marker({
//         position: { lat, lng },
//         map,
//         title: 'Hello World!'
//     });

// }

function initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
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