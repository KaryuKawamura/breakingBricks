// ctx.beginPath()
// ctx.rect(20, 40, 50, 50)
// ctx.fillStyle = "#FF0000"
// ctx.fill()
// ctx.closePath()

// ctx.beginPath()
// ctx.arc(240, 160, 20, 0, Math.PI*2, false)
// ctx.fillStyle = "green"
// ctx.fill()

// ctx.beginPath()
// ctx.rect(160, 10, 100, 40)
// ctx.strokeStyle = "#FF0000"
// ctx.stroke()
// ctx.closePath()





var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false)

//Event Handlers

function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = false;
    }
}

//Ball Variables
let x = canvas.width/2;
let y = canvas.height-30;

let dx = 2;
let dy = -2;

let ballRadius = 10;

//Paddle Variables
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

//Brick Variables
let brickRowCount = 3;
let brickColumnCount = 5;

let brickWidth = 75;
let brickHeight = 20;

let brickPadding = 10;

let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];
for(let c=0; c<brickColumnCount; c++ ){
    bricks[c] = [];
    for(let r = 0; r<brickRowCount; r++){
        bricks[c][r] = {x: 0, y:0, status: 1};
    }
}

//Game Variables

let score = 0;
let lives = 3

//Drawing Functions

function drawBall(){
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI*2)
    ctx.fillStyle = "red"
    ctx.fill()
    ctx.closePath()
}

function drawPaddle(){
    ctx.beginPath()
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight)
    ctx. fillStyle = "black"
    ctx.fill()
    ctx.closePath()
}

function drawBricks(){
    for (let c=0; c<brickColumnCount; c++){
        for(let r=0; r<brickRowCount; r++){
            if(bricks[c][r].status == 1) {
                let brickX = (c*(brickWidth+brickPadding)) + brickOffsetLeft;
                let brickY = (r*(brickHeight+brickPadding)) + brickOffsetTop
                bricks[c][r].x = brickX
                bricks[c][r].y = brickY
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight)
                ctx.fillStyle = "brown"
                ctx.fill()
                ctx.closePath();
            }
        }
    }
}

function drawScore(){
    ctx.font = '16px Arial'
    ctx.fillStyle = 'black'
    ctx.fillText('Score: ' + score, 8, 20)
}

function drawLives(){
    ctx.font = '16px Arial'
    ctx.fillStyle = 'black'
    ctx.fillText('Lives: ' + lives, 412, 20)
}

//Collison Function

function collisionDetection(){
    for(let c = 0; c<brickColumnCount; c++){
        for(let r = 0; r<brickRowCount; r++){
            let b = bricks[c][r];
            if(b.status == 1){
                if(x> b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
                    dy = -dy;
                    b.status=0;
                    score ++
                    if(score == 15){
                        alert("You Won")
                    }
                }
            }
        }
    }
}

//Main Draw

function draw(){
    ctx.clearRect( 0, 0, canvas.width, canvas.height)
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    drawScore();
    drawLives();

    x += dx;
    y += dy;

    if(y+dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height - ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy
        } else {
            lives --;    
            
        if(!lives) {
        alert("Game Over");
        document.location.reload();
        clearInterval(interval)
    }else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width-paddleWidth)/2;
    }
        }
    } 
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx
    } 

    if(rightPressed){
        paddleX += 4;
        if(paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth
        }
    } else if (leftPressed){
        paddleX -= 4;
        if(paddleX < 0){
            paddleX = 0;
        }
    }
}

let interval = setInterval(draw, 1)