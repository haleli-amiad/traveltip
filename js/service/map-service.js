'use strict'

import { storageService } from './storage-service.js'
export const mapService = {
    initLocations,
    makeId,
    saveLocationsToStorage,
    getLocations,
    addLocation
}

const STORAGE_MAP_KEY = 'mapDB';
var gLocations;




function initLocations() {
    _createLocs();

}


function getLocations() {
    return gLocations;
}


function addLocation(latCoord, lngCoord) {
    gLocations.push(_createLoc(location, latCoord, lngCoord))
    // marker = new google.maps.Marker({ position: ev.latLng, map: map })
    mapService.saveLocationsToStorage(STORAGE_MAP_KEY, gLocations);
}

function _createLoc(name, latitude, longitude) {
    var location = {
        id: makeId(),
        locName: name,
        time: Date.now(),
        positionLat: latitude,
        positionLong: longitude,
        // wheather,
        // updatedAt
    }
    return location;
}

function _createLocs() {
    let locations = storageService.loadFromStorage(STORAGE_MAP_KEY);
    if (!locations) {
        locations = [];
        locations.push(_createLoc('Place'));
    }
    gLocations = locations;
    saveLocationsToStorage(STORAGE_MAP_KEY, gLocations);
}

function saveLocationsToStorage() {
    storageService.saveToStorage(STORAGE_MAP_KEY, gLocations);
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}



