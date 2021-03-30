// todo.js
// 작은 모듈로 나눠 만드는 법을 배우면, 같은 이름을 사용해도 무관 
// but 배우지 않았으니, greeting.js 파일과는 다른 이름을 사용하여야 함
// 이는 함수명도 마찬가지! but 함수는 중복 선언이 가능
const todoForm = document.querySelector(".js-todoForm"),
    todoInput = todoForm.querySelector("input"),
    doingTodoList = document.querySelector(".js-doingTodoList"),
    finishedTodoList = document.querySelector(".js-finishedTodoList");

const DOING_TODOS_LS = "doingTodos";
const FINISHED_TODOS_LS = "finishedTodos";

const DEL_BTN = "delBtn";
const FIN_BTN = "finBtn";
const FIN_TODO = "finTodo";

let doingTodos = []; // todo 업데이트를 위해 const에서 let으로 변경
let finishedTodos = [];

function toggleTodo(event) {
    const li = event.target.parentNode;
    const btn = li.querySelector(`.${FIN_BTN}`);

    const text = li.querySelector("span").innerText;
    const isFin = li.classList.contains(FIN_TODO);

    if (isFin) { // 끝났던 일정을 다시 복구
        // 1. 버튼 모양 바꿈
        li.classList.remove(FIN_TODO);
        btn.innerText = "🤍";

        // 2. HTML에서 제거/삭제
        finishedTodoList.removeChild(li);
        doingTodoList.appendChild(li);
    } else { // 안 끝난 일정을 끝냄
        li.classList.add(FIN_TODO); // 끝났음 표시
        btn.innerText = "💗";

        doingTodoList.removeChild(li);
        finishedTodoList.appendChild(li);
    }

    // 3. LS에 수정사항 반영
    addTodoObj(parseInt(li.id), text, !isFin); // 여기서, parseInt() 적용하지 않으면 문자열로 저장됨
    delTodoObj(li.id, isFin);
    saveTodos();
}

function deleteTodo(event) {
    // console.dir(event.target); // 이를 통해 parentNode의 존재 확인
    const btn = event.target;
    const li = btn.parentNode; 

    const isFin = li.classList.contains(FIN_TODO);
    
    // 1. HTML 문서에서 삭제 
    if (isFin) finishedTodoList.removeChild(li);
    else doingTodoList.removeChild(li);
    
    // 2. LS에서 삭제 (id 중복될 일 X, 그냥 그대로 삭제해버리면 됨)
    // todos.pop(); // 이건 마지막 요소를 pop하는 함수임
    delTodoObj(li.id, isFin);
    saveTodos();
}  

function addTodoObj(id, text, isFin) { 
    const todoObj = {
        text,
        id // 1부터 시작해서, 몇 번째 todo인지 기록
    };

    if (isFin) finishedTodos.push(todoObj);
    else doingTodos.push(todoObj);
}

function delTodoObj(id, isFin) {
    if (isFin) {
        const cleanTodos = finishedTodos.filter(function(todo) {
            return todo.id !== parseInt(id); 
        }); 
        finishedTodos = cleanTodos; 
    } else {
        const cleanTodos = doingTodos.filter(function(todo) {
            // !! (추가) local storage에 id값 수정, 저장도 필요
            return todo.id !== parseInt(id); 
        }); 
        doingTodos = cleanTodos; // 바꿔치기, 이것 때문에 todos가 let으로 선언되었어야 함
    }
}

function mkRandomID() {
    return new Date().getTime(); // ms로 만들기
}

function saveTodos() {
    localStorage.setItem(DOING_TODOS_LS, JSON.stringify(doingTodos));
    localStorage.setItem(FINISHED_TODOS_LS, JSON.stringify(finishedTodos));
}

function paintTodo(text, isFin) {
    // console.log(text);
    const li = document.createElement("li"); // HTML에 무언가를 생성할 때

    const span = document.createElement("span");
    span.innerText = text; // 입력한 todo

    const delBtn = document.createElement("button");
    // li 안에 넣을 요소 생성
    delBtn.innerText = "❌"; // 삭제 버튼 
    delBtn.classList.add(DEL_BTN);
    delBtn.addEventListener("click", deleteTodo); // 버튼 클릭시 todo 삭제
    delBtn.addEventListener("mouseenter", handleBtnBigger);
    delBtn.addEventListener("mouseleave", handleBtnSmaller);

    const finBtn = document.createElement("button");
    if (isFin) {
        finBtn.innerText = "💗"; // 완료 버튼
        li.classList.add(FIN_TODO);
    } else finBtn.innerText = "🤍"; // 복구 버튼
    finBtn.classList.add(FIN_BTN);
    finBtn.addEventListener("click", toggleTodo);
    finBtn.addEventListener("mouseenter", handleBtnBigger);
    finBtn.addEventListener("mouseleave", handleBtnSmaller);

    // li 안에 순서대로 요소 추가
    li.appendChild(finBtn);
    li.appendChild(delBtn);
    li.appendChild(span); // li의 자식으로 span 추가

    // todoList에 li 추가 
    if (isFin) finishedTodoList.appendChild(li);
    else doingTodoList.appendChild(li);

    // li에 id 부여, 버튼 클릭 시 어떤 li 지울지 확인하기 위해
    const newID = mkRandomID();
    li.id = newID;

    // 객체로 만들어 todos들에 추가
    addTodoObj(newID, text, isFin);
    // 여기서 saveTodos()는 필요 없음, 이미 LS에 저장되어 있는 내용을 출력할 수도
}

function handleBtnBigger(event) {
    event.target.classList.add("bigger");
}

function handleBtnSmaller(event) {
    event.target.classList.remove("bigger");
}

function handleSubmitTodo(event) {
    event.preventDefault();
    const todoCurrentValue = todoInput.value;
    paintTodo(todoCurrentValue);
    saveTodos(); // 값을 push한 뒤에 local storage에 저장해야 함
    todoInput.value = ""; // 입력값을 다 받은 뒤, 상자에 보이는 입력값을 지움
}

function loadTodos(todosName) {
    const loadTodos = localStorage.getItem(todosName);
    const isFin = (todosName === FINISHED_TODOS_LS ? true : false);

    if (loadTodos !== null) { // todo에 뭔가 있을 때만 보여주면 됨
        // console.log(loadTodos);
        const parsedTodos = JSON.parse(loadTodos); // 가져온 string을 object로 변환
        // console.log(parsedTodos);

        parsedTodos.forEach(function(todo) { // object의 원소를 순서대로 하나씩 출력
            paintTodo(todo.text, isFin);
        });
    }
}

function init() {
    loadTodos(DOING_TODOS_LS);
    loadTodos(FINISHED_TODOS_LS);
    
    todoForm.addEventListener("submit", handleSubmitTodo);
}

init();