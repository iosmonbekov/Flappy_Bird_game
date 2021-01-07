const cvs = document.getElementById("canvas");

const ctx = cvs.getContext("2d");

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeDown = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeDown.src = "img/down.png";
pipeUp.src = "img/up.png";

let gap = 90;
let score = 0;
let flag = false;

let pause = true;
// Audio of Game

let fly = new Audio();
let score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

// Onclick on any button
document.addEventListener("keydown", moveUp);

function moveUp() {
  yPos -= 25;
  //   fly.play(); very slow. I decided to not use this sound
}

//Creating Blocks

let pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0,
};

// Position of Bird

let xPos = 10;
let yPos = 50;
let grav = 1.5;

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + pipeUp.height + gap);

    pipe[i].x--;

    if (pipe[i].x == 100) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
      });
    }

    if (
      (xPos + bird.width >= pipe[i].x &&
        xPos + bird.width <= pipe[i].x + pipeUp.width &&
        (yPos + bird.height <= pipe[i].y + pipeUp.height ||
          yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) ||
      yPos + bird.height >= cvs.height - fg.height
    ) {
      clearInterval(game);
      showModal();
    }

    if (pipe[i].x === 10) {
      score++;
      score_audio.play();
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);

  ctx.drawImage(bird, xPos, yPos);

  yPos += grav;

  ctx.fillStyle = "#000";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 10, cvs.height - 20);
}

const game = setInterval(draw, 14);

//Aditional Design
function showModal() {
  modal[0].style.display = "block";
}

const modal = document.getElementsByClassName("shadow");
const button = document.getElementsByTagName("button");

button[0].onclick = restart;

function restart() {
  location.reload();
}
