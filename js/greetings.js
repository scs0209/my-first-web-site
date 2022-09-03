const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");


const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username"; //username이 반복되므로 변수를 선언해줘서 값도 쉽게 변경하고 오타가 나도 알기 쉽게 해준다.

function onLogInSubmit(event){
  event.preventDefault();//기본동작이 실행되는 것을 막아줌
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;//input의 값을 username이라는 변수로 선언
  localStorage.setItem(USERNAME_KEY, username);//local storage에 username을 saving 하는 코드
  paintGreetings(username);//input값을 인자로 넣어줌
}

loginForm.addEventListener("submit", onLogInSubmit);


function paintGreetings (username) {
  greeting.innerText = `Hello ${username}`; //h1에 이름을 넣어준다
  greeting.classList.remove(HIDDEN_CLASSNAME);
}
const savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername === null) {
  //show the form
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLogInSubmit); //submit을 하면 onLogInSubmit 함수를 호출해서 작동한다.
} else {
  //show the greetings
  paintGreetings(savedUsername); //savedUsername이 null이 아니면 savedUsername의 값을 함수에 인자로 넣어준다.
}