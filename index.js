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
*/ 

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