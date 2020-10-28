'use strict';

function onInitMap() {
    initLocations();
    renderMap();
}

function renderMap() {
let locs = getLocation();
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
    saveLocationsToStorage(STORAGE_MAP_KEY, gLocations);
    renderMap();
}