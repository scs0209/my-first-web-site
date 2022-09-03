const clock = document.querySelector("h2#clock");

function getClcok() {
  //Date 객체는 코드를 실행한 그 시점의 밀리초, 초, 시간 등을 알려준다.
  const date = new Date();
  //padStart(2,"0")=A의 글자수는 2글자이며 2글자가 아닐경우 앞에 "0"을 붙여준다.
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}


getClcok();//시계가 즉시 실행하게 해주는 코드 없으면 0부터 시작한다.
setInterval(getClcok, 1000);