const images = ["0.jpg", "1.jpg", "2.jpg"];

const chosenImage = (images[Math.floor(Math.random()*images.length)]);

const bgImage = document.createElement("img");

//img 폴더에 있는 사진들을 가져와서 랜덤하게 보여주는 코드
bgImage.src = `img/${chosenImage}`;

document.body.appendChild(bgImage); // appendChild는 body에 bgImage를 추가시켜줌
//appendChild 대신 insertBefore를 사용하면 body에 넣고 싶은 위치에 정확히 넣을 수 있다. ex) document.body.insertBefore(bgImage, h2);
