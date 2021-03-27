// js-form과 input 두 개를 선택해야 함
const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser", // LS = local storage
    SHOWING_CN = "showing"; // CN = class name

function paintGreeting(text) {
    // form.classList.remove(SHOWING_CN); // 다음 시간에 form에 showing을 추가할 듯
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) { // 이름 없는 경우
        
    } else { // 이름 있는 경우
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();