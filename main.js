let fcar = document.getElementById("fcar");
let bcar = document.getElementById("bcar");
let sp = document.getElementById("sp");
let s1 = document.getElementById("s1");
let startBtn = document.getElementById("startBtn");
let pauseBtn = document.getElementById("pauseBtn");
let gameArea = document.getElementById("game");

let score = 0;
let gameOver = false;
let isPaused = true;

let lanes = [50, 200, 350];
let playerLane = 1;

let speed = 2;       // enemy animation duration
let roadSpeed = 2;   // road animation duration

bcar.style.left = lanes[playerLane] + "px";

/* START */
startBtn.addEventListener("click", function(){
    if(gameOver) return;

    isPaused = false;

    fcar.style.animationPlayState = "running";
    gameArea.style.animation = "roadMove " + roadSpeed + "s linear infinite";
});

/* PAUSE */
pauseBtn.addEventListener("click", function(){
    if(gameOver) return;

    isPaused = true;

    fcar.style.animationPlayState = "paused";
    gameArea.style.animationPlayState = "paused";
});

/* ENEMY LOOP */
fcar.addEventListener("animationiteration", function(){

    if(gameOver || isPaused) return;

    let randomLane = Math.floor(Math.random() * 3);
    fcar.style.left = lanes[randomLane] + "px";

    score++;
    sp.innerHTML = score < 10 ? "0" + score : score;

    /* Increase speed every 5 score */
    if(score % 5 === 0 && speed > 0.6){
        speed -= 0.2;
        roadSpeed = speed;

        fcar.style.animationDuration = speed + "s";
        gameArea.style.animation = "roadMove " + roadSpeed + "s linear infinite";
    }
});

/* MOVE LEFT */
function left(){
    if(gameOver || isPaused) return;

    if(playerLane > 0){
        playerLane--;
        bcar.style.left = lanes[playerLane] + "px";

        bcar.style.transform = "rotate(-10deg)";
        setTimeout(()=> bcar.style.transform="rotate(0deg)",200);

        s1.play();
    }
}

/* MOVE RIGHT */
function right(){
    if(gameOver || isPaused) return;

    if(playerLane < 2){
        playerLane++;
        bcar.style.left = lanes[playerLane] + "px";

        bcar.style.transform = "rotate(10deg)";
        setTimeout(()=> bcar.style.transform="rotate(0deg)",200);

        s1.play();
    }
}

/* KEYBOARD */
document.addEventListener("keydown", function(e){
    if(e.key === "ArrowLeft") left();
    if(e.key === "ArrowRight") right();
});

/* COLLISION */
setInterval(function(){

    if(gameOver || isPaused) return;

    let enemyRect = fcar.getBoundingClientRect();
    let playerRect = bcar.getBoundingClientRect();

    if(
        enemyRect.bottom > playerRect.top &&
        enemyRect.top < playerRect.bottom &&
        enemyRect.left < playerRect.right &&
        enemyRect.right > playerRect.left
    ){
        gameOver = true;

        fcar.style.animationPlayState = "paused";
        gameArea.style.animationPlayState = "paused";

        alert("💥 GAME OVER\nScore: " + score);
        location.reload();
    }

}, 10);
