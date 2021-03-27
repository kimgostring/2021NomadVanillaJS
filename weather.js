// weather.js
const API_KEY = "***REMOVED***";
const COORDS = "coords";

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, // key와 value 변수 이름이 같을 때, 그냥 이렇게 작성 가능
        longitude
    };

    saveCoords(coordsObj);
}

function handleGeoError() {
    console.log("Can't access geo location. ");
}

function askForCoords() { // navigator API 이용
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) { 
        askForCoords();
    } else { 
        
    }
}

function init() {
    loadCoords();
}

init();