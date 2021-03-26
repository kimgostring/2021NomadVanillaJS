const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1"); // h1의 탐색은 js-clock의 자식들에 한정

function getTime() {
    const date = new Date(); // 현재 시간 정보를 담은 객체 생성
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    // 객체 안에 텍스트 넣음(h1에 해당)
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}` // 
        + `:${minutes < 10 ? `0${minutes}` : minutes}`
        + `:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
    getTime(); // 처음 한 번은 setInterval로 실행 X
    setInterval(getTime, 1000); // 실행시킬 함수, 실행할 시간 간격 (ms)
    // 이렇게 되면 실제 시간과는 약 1초가 다를 수 있는데 ㅠㅠ 어떻게 처리해야 할까? 
}

init();