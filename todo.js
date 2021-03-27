// todo.js
// 작은 모듈로 나눠 만드는 법을 배우면, 같은 이름을 사용해도 무관 
// but 배우지 않았으니, greeting.js 파일과는 다른 이름을 사용하여야 함
// 이는 함수명도 마찬가지! but 함수는 중복 선언이 가능
const todoForm = document.querySelector(".js-todoForm"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".js-todoList");

const TODOS_LS = "todos";

const todos = [];

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