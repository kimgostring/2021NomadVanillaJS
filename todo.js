// todo.js
// 작은 모듈로 나눠 만드는 법을 배우면, 같은 이름을 사용해도 무관 
// but 배우지 않았으니, greeting.js 파일과는 다른 이름을 사용하여야 함
// 이는 함수명도 마찬가지! but 함수는 중복 선언이 가능
const todoForm = document.querySelector(".js-todoForm"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".js-todoList");

const TODOS_LS = "todos";

let todos = []; // todo 업데이트를 위해 const에서 let으로 변경

function deleteTodo(event) {
    // console.dir(event.target); // 이를 통해 parentNode의 존재 확인

    // 1. HTML 문서에서 삭제 
    const btn = event.target;
    const li = btn.parentNode; 
    todoList.removeChild(li);

    // !! id값 수정 저장도 필요 
        // todo의 id는 object의 요소 id값, li는 HTML문서 tag li의 id값
        // object가 2개인 상황에서 id=1인 것을 삭제하고, 새로 하나를 생성하면 id=2개인 요소가 2개가 됨
        // 이 상태에서 둘 중 하나의 것을 제거하게 되면, 둘 다 id=2이므로 이 함수에서 둘 다 false를 반환하고
        // 결국 local storage에는 두 값이 모두 삭제됨

	// 여기에서 굳이 id값을 1, 2, 3... 순서대로 지정할 필요 없음, 그렇게 되면 문제 해결 쉬워짐
    
    // 2. 배열에서 삭제 및 local storage에 결과 저장
   
    // - 내 방법, 여기서 추가로 id값을 하나하나 바꿔주어야 함 
    // todos.pop(parseInt(li.id) - 1);
   
    // - nicolas 방법
    // todo를 clean
    // 배열.filter()를 사용하면 각 item에 대해 함수 실행됨
    // 함수에서 true 리턴하는 것들을 모아 새로운 array 만들어 리턴
    const cleanTodos = todos.filter(function(todo) {
        // !! (추가) local storage에 id값 수정, 저장도 필요
        const result = (todo.id !== parseInt(li.id)); 
        
        if (todo.id > li.id) todo.id--;
        return result; 
    }); 
    todos = cleanTodos; // 바꿔치기, 이것 때문에 todos가 let으로 선언되었어야 함

    // !! (추가) 3. html 문서의 id값도 index 맞추기
    const liList = todoList.querySelectorAll("li");
    for (let i = li.id - 1; i < liList.length; i++) {
        liList[i].id = i + 1;
    }

    saveTodos();
}

function saveTodos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function paintTodo(text) {
    // console.log(text);
    const li = document.createElement("li"); // HTML에 무언가를 생성할 때

    // li 안에 넣을 요소 생성
    const span = document.createElement("span");
    span.innerText = text; // 입력한 todo
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌"; // 삭제 버튼 
    delBtn.addEventListener("click", deleteTodo); // 버튼 클릭시 todo 삭제

    const newID = todos.length + 1 ;

    // li 안에 순서대로 요소 추가
    li.appendChild(span); // li의 자식으로 span 추가
    li.appendChild(delBtn);

    // todoList에 li 추가 
    todoList.appendChild(li);

    // li에 id 부여, 버튼 클릭 시 어떤 li 지울지 확인하기 위해
    li.id = newID;

    const todoObj = {
        text: text,
        id: newID // 1부터 시작해서, 몇 번째 todo인지 기록
    };

    todos.push(todoObj);
    saveTodos(); // 값을 push한 뒤에 local storage에 저장해야 함
}

function handleSubmitTodo(event) {
    event.preventDefault();
    const todoCurrentValue = todoInput.value;
    paintTodo(todoCurrentValue);
    todoInput.value = ""; // 입력값을 다 받은 뒤, 상자에 보이는 입력값을 지움
}

function loadTodos() {
    const loadTodos = localStorage.getItem(TODOS_LS);

    if (loadTodos !== null) { // todo에 뭔가 있을 때만 보여주면 됨
        // console.log(loadTodos);
        const parsedTodos = JSON.parse(loadTodos); // 가져온 string을 object로 변환
        // console.log(parsedTodos);

        parsedTodos.forEach(function(todo) { // object의 원소를 순서대로 하나씩 출력
            paintTodo(todo.text);
        });
    }
}

function init() {
    loadTodos();
    todoForm.addEventListener("submit", handleSubmitTodo);
}

init();