const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1"); // h1의 탐색은 js-clock의 자식들에 한정

function getTime() {
    const date = new Date(); // 현재 시간 정보를 담은 객체 생성
    const minutes = date.getMinutes();
    const hours = date.getHours();

    // 객체 안에 텍스트 넣음(h1에 해당)
    clockTitle.innerText = `${hours}:${minutes}`;
}

function init() {
    getTime(); // 작동을 위해서는 f5를 눌러주어야만 함
}

init();