// js-form과 input 두 개를 선택해야 함
const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser", // LS = local storage
    SHOWING_CN = "showing"; // CN = class name

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault(); // 기본 동작을 막기 위한 함수
    const currentValue = input.value; // 네모 상자 안에 있는 값을 가져옴
    // console.log(currentValue);
    paintGreeting(currentValue); 
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN); // form 보여줌
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN); // 다음 시간에 form에 showing을 추가할 듯
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) { // 이름 없는 경우
        askForName();
    } else { // 이름 있는 경우
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();