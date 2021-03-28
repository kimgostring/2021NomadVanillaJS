// bg.js
const body = document.querySelector("body");

const IMG_NUM = 6;

// function handleImgLoad() {
//     console.log("finished");
// 만일 이 함수 사용되었다면, 이 위치에서 body에 요소 추가해야 함
// }

function paintImage(imgNum) {
    const imgFilter = document.createElement("div"); // 어두움 효과 filter 씌우기 위함
    const img = new Image();
    img.src = `images/${imgNum}.jpg`;
    img.classList.add("bgImage");
    body.prepend(img);
    // 이미지를 원격으로 불러올 때는(API 사용할 때) loading에 시간이 걸림
    // 천천히 위에서부터 이미지가 불러지는 모습을 보고 싶지 않을 때, 이 라인 필요
    // img.addEventListener("loadend", handleImgLoad); 
}

function genRandom() {
    const num = Math.floor(Math.random() * IMG_NUM) + 1; // 정수를 random으로 만들어내는 식
    return num;
}

function init() {
    const randomNum = genRandom();
    paintImage(randomNum);
}

init();