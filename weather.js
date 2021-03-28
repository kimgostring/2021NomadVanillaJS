// weather.js
const weather = document.querySelector(".js-weather");

const API_KEY = "ac10ed42bfe4edd315e009c259e6b0db";
const COORDS = "coords";

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    // units=metric, 온도를 미터법으로 표기
    ).then(function(response) { // 데이터가 우리에게 완전히 넘어온 뒤 () 안의 함수 실행
        return response.json();
    }).then(function(json) { // 데이터를 다 json 형식으로 변환한 뒤 () 실행\
        const temperature = json.main.temp;
        const place = json.name;

        weather.innerText = `${temperature} @ ${place}`;
        // console.log(json);
    }); 
}

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
    getWeather(latitude, longitude);
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
        const parsedCoords = JSON.parse(localStorage.getItem(COORDS));
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();