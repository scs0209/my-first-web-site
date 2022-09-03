const toDoForm = document.getElementById("todo-form");
//위에서 이미 todo-form을 찾았기 때문에 그 안에 있는 input태그만을 찾을 수 있는 코드를 선언할 수 있다.
//const toDoInput = document.querySelector("#todo-form input");같은 의미
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";


//데이터베이스에 To Do 내용을 추가하는 곳
// (todo)에 들어오는 텍스트를 배열로 묶어 보관하기 위해 빈 array를 생성해준다.
let toDos = [];

function saveToDos () {
  //JSON.stringify는 array자체를 문자열로 만들어준다.(localStorage에서 배열 형태로 저장됨.)
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}


// 버튼에 delete기능을 추가한 코드
function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  //클릭했던 li의 id를 갖고 있는 toDo를 지우는 코드
  //즉, toDo의 id가 li의 id와 다른 걸 남기고 싶다는 뜻
  /*toDo.id는 number 타입이고 li.id는 string 타입이기 때문에 변환해주지 않으면 실행 x 그래서 li.id를 number타입으로 변환해주는 코드 사용*/ 
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  //DB에서 to do를 지운 후 저장을 한 번 더 해줘야하기 때문에 사용
  saveToDos(); 
}


//화면에 (표시)그리는 것을 담당
function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  //원래는 paintToDo가 Text를 받았지만 이제는 object를 받기 때문에 .text가 붙는다.
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❌"
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);//위에 span과 li를 만들었는데, 내가 하고싶은거 span이 li안에 들어가는 거기 때문에 이 코드를 써서 span을 li에 넣어준다.
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event){
  event.preventDefault();
  const newTodo = toDoInput.value;
  //text 상자 안에 글을 작성하고 enter를 눌렀을 때 그 글이 초기화 되게 만들기 위해 toDoInput.value = ""; 을 통해 value를 빈 텍스트로 한다.
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };//id와 text를 생성해서 넣어줌
  toDos.push(newTodoObj);//데이터베이스로 매번 사용자가 적어둔 객체를 push
  paintToDo(newTodoObj);//위에 있는 paintToDo 함수 호출
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
//forEach함수는 이 paintToDo를 parsedToDos 배열의 요소마다 실행한다.


//localStorage는 배열은 저장 x 오직 텍스트만 저장 가능
//JSON.parse는 string을 JS가 이해할 수 있는 살아있는 array로 만든다
/*
function sayHello(item) {
  console.log("this is the turn of ", item);
}
= (item) => console.log("this is the turn of ", item)
이 두 코드는 같은 의미이다.
*/

//(todo)를 submit 할 때마다 newTodo를 빈 array였던 toDos array에 push를 함 그리고 여기에서 saveToDos()를 호출하고 그러면 빈 array 였다가 이제는 "a"하나만 갖고 있는 array를 저장하는 거임
//그렇지만 우기ㅏ 원하는건 이전 toDo들을 복원하는 것이다. 그래서 toDos array를 가지고 와서 toDos array에 복원해주었다.
