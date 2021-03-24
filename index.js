/* 
// 1.4
// 경고 메세지
// alert('Im working. Im JS. Im Beautiful. Im worth it.');

// 콘솔에 뜸 (f12 누른 뒤 console 항목에서, 테스트에 사용 가능)
console.log('Im working. Im JS. Im Beautiful. Im worth it.');

// 언어에 따라, 프로그램을 실행하기 위해 해당 언어를 다운받아야 할 필요가 있음
// but JS는 브라우저에 이미 구성되어 있음, 별도의 다운로드 필요 X

// 1.6
// 1.7
// 변수 a를 생성, 값을 넣어줌
const a = 221; // const, 변하지 않는 값
let b = a - 5;
// a = 4; // error, 재할당 불가
// a = 221 b = a - 5 // 에러 발생
console.log(b, a); // 계산결과 확인

// let b = 3; // let, 재선언 불가
var d = 1;
var d = 31; // var, 재선언 가능
console.log(d);

// 1.8
// 코멘트(주석), 주석처리되지 않은 코드는 실행의 대상
// 일단은 const로 만들고, 변경할 필요가 있을 때 let으로 만들자

// 1. string
// 모든 걸 같이 붙인 것, 보통 텍스트 스트링을 말함
const what = "5656"; // ""가 없다면, 정의된 키워드(변수)를 찾으려고 함, error
// "" 안에 숫자가 들어가도 텍스트임
console.log(what);

// 2. boolean (텍스트 X)
const wat = false; // 0, true는 1

// 3. number

// 4. float
const wa = 55.1; // 소숫점(floating point) 존재

// 1.9
const monday = "Mon";
const tue = "Tue";
const wed = "Wed";
const thu = "Thu";
const fri = "Fri";
console.log(monday, tue, wed, thu, fri);

// 위의 것을 array로 하나로 묶음
const daysOfWeek = [ "Mon", "Tue", "Wed", "Thu", "Fri" ];
console.log(daysOfWeek);

// 1.10
// 개인 정보의 저장
// array를 쓰면 제대로 정렬할 수 X, 각각의 정보의 순서를 기억해야 의미 있음
const nicoInfo = [ "Nicolas", 55, true, "Seoul" ];
console.log(nicoInfo);

// object
const kayInfo = { 
    name:"Nico",
    age:33,
    gender:"Male",
    isHandsome:true,
    favMovies: [ "LOTR", "Oldboy" ],
    favFood: [
        { name:"Kimchi", fatty:false }, 
        { name:"Cheese burger", fatty:true }
    ]
};

console.log(kayInfo);

kayInfo.gender = "Female";
console.log(kayInfo.gender);

console.log(kayInfo.favFood[1].name);

// 2.0
console.log(console);
console.log("hello kay"); // 메세지가 안에 없으면 동작 X

// 함수 정의
function sayHello(name) {
    console.log("Hello!", name);
}

sayHello("kay");

// 2.1
function sayHello(name, age) {
    // 1. 콤마
    console.log("Hello!", name, 'you are', age, "years old.");
    
    // 2. +로 문자열 잇기
    console.log("Hello! " + name + " you are " + age + " years old.");

    // 3. 백틱 (`)
    console.log(`Hello! ${name} you are ${age} years old.`);

    // 리턴값
    return `Hello! ${name} you are ${age} years old.`;
}

const greetKay = sayHello("kay", 23); // 함수 내 문장들 실행한 뒤, 리턴값 받음
console.log(greetKay); // 리턴값 출력

// 객체 안 함수 생성
const calc = {
    plus: function(a, b) {
        return a + b;
    },

    minus: function(a, b) {
        return a - b;
    }, 

    mult: function(a, b) {
        return a * b;
    },

    div: function(a, b) {
        return a / b;
    },

    power: function(a, b) {
        return a ** b; // power
    }
};

const result = calc.plus(5, 6); // 객체 안의 함수 실행, 리턴값 받음
console.log(result);

// 2.2
// HTML과 JS 같이 사용하기
console.log(document); // f12 눌러서 보면, HTML document가 보임 (그게 JS가 됨)

// 모든 HTML이 객체가 됨, DOM
// id 값을 통해 해당 id의 내용을 객체로 만들어 내용 받아오기
const title = document.getElementById("title");
console.log(title);

title.innerHTML = "Hi! From JS"; // HTML의 제목을 JS를 통해 바꿈

// 2.3
const title = document.getElementById("title");
// 수정 가능, but 위의 것 찾지 못할 경우 innerHTML of null을 반환
title.innerHTML = "Hi! From JS";

console.dir(title); // f12에서 할 수 있는 작업들 확인 가능
console.dir(document);

title.style.color = "red"; // 글자 색 변경
document.title = "I own you now"; // (id="title"이 아닌) 문서 제목 변경 가능

// 노드의 첫 번째 자식 반환 (depth-first, pre-order)
// document로 가서(HTML 문서 전체에서), 모든 자식들 중 특정 name/id 등 해당하는 것을 찾음
const title2 = document.querySelector("#title"); // CSS 선택자와 유사 (id로 찾고 싶으면 #, class의 경우 .)
console.log(title2);

// 2.4
const title = document.querySelector("#title");

function handleResize(event) {
    console.log(event);
}

function handleClick(event) {
    title.style.color = "red";
}

// 함수명()은 바로 그 함수를 호출하는 것, ()를 붙이지 않고 이름만 넘겨주면 필요할 때 호출하게 됨
window.addEventListener("resize", handleResize); // 이벤트, 이벤트 발생 시 실행될 함수명

title.addEventListener("click", handleClick);

// 2.5
// 조건문
if (10 === "10" || "nicolas" === "nicolas") {
    console.log("hi");
} else if ("10" === "10") {
    console.log("hihi");
} else {
    console.log("ho");
}

// 값 입력 전까지는 다음 코드로 안 넘어가게 됨
const age = prompt("How old are you"); // 매우 오래된 JS, 이젠 안 쓰임
console.log(age);

if (age > 18) {
    console.log("you can drink");
} else {
    console.log("you cant");
}
*/

// 2.6
const title = document.querySelector("#title");
const BASE_COLOR = "rgb(52, 73, 94)"; // "#34495e"와 같은 색
const OTHER_COLOR = "#7f8c8d"; // rgb로 하는 것이 좋음, JS는 모든 색을 rgb로 자동 변환해서 사용

function handleClick(event) {
    // console.log(title.style.color);

    // 클릭할 때마다 색이 바뀌도록 조건문 작성
    const currentColor = title.style.color;
    if (currentColor === BASE_COLOR) {
        title.style.color = OTHER_COLOR;
    } else {
        title.style.color = BASE_COLOR;
    }
}

function init() {
    title.style.color = BASE_COLOR;
    title.addEventListener("mouseenter", handleClick); // 마우스가 영역으로 들어올 때 발생
}

// main 함수처럼, 이를 이렇게 실행하는 것이 니콜의 습관 
init();

function handleOnline() {
    console.log("online");
}

window.addEventListener("offline", handleOnline); // 컴퓨터에 인터넷이 막 연결되었을 때만 뜸