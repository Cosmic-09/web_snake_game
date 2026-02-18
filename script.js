const restart = document.getElementById("restart")
const canvas = document.getElementById("snakegame");
const ctx = canvas.getContext("2d");
const scale = 20;
let rows;
let columns;
let touchStartX,touchEndX
let touchStartY,touchEndY
let count = 0
let snake = [
 {x:10,y:10},
 {x:9,y:10},
 {x:8,y:10}
]
let direction = "RIGHT"
let basespeed = 250
let speed = basespeed
let pause = false
let food

function draw(){
    ctx.fillStyle = "green"
    for(let i=0;i<snake.length;i++){
        ctx.fillRect(snake[i].x * scale,snake[i].y * scale,scale,scale)
    }
}

function resizeCanvas(){
    const width = window.innerWidth*0.9
    const height = window.innerHeight*0.8

    rows = Math.floor(height / scale);
    columns = Math.floor(width / scale);

    canvas.width = columns*scale
    canvas.height = rows*scale


    draw()

    food = {
    x: Math.floor(Math.random() * columns),
    y: Math.floor(Math.random() * rows)
}
}

resizeCanvas()
window.addEventListener("resize",resizeCanvas)
food = {
x: Math.floor(Math.random() * columns),
y: Math.floor(Math.random() * rows)
}



function restartGame(){
    clearInterval(interval)
    snake = [
        {x:10,y:10},
        {x:9,y:10},
        {x:8,y:10}
    ]
    direction = "RIGHT"
    count = 0
    speed = basespeed
    document.getElementById("score").innerText = count
    restart.style.visibility = "hidden"
    clearInterval(interval)
    interval = setInterval(() => {
        update(snake)
    }, speed)
}

function togglePause(){

    if(!pause){
        clearInterval(interval)
        pause = true
    }
    else{
        clearInterval(interval)
        interval = setInterval(() => {
            update(snake)
        }, speed)
        pause = false
    }
}


function update(arr){

    let newHead = {
        x: arr[0].x,
        y: arr[0].y
    }

    if(direction === "RIGHT"){
        newHead.x++
    }
    else if(direction === "UP"){
        newHead.y--
    }
    else if(direction === "LEFT"){
        newHead.x--
    }
    else if(direction === "DOWN"){
        newHead.y++
    }

    arr.unshift(newHead)
    
    //food eaten
    if(newHead.x === food.x && newHead.y === food.y){

    count++
    document.getElementById("score").innerText = count

    //speed control
    if(count%4 === 0 && count !== 0 && speed >= 60){
    speed -= 20
    clearInterval(interval)
    interval = setInterval(() => {
        update(snake)
    }, speed)

    }

    // generate safe food
    let valid = false

    while(!valid){

        food = {
            x: Math.floor(Math.random() * columns),
            y: Math.floor(Math.random() * rows)
        }

        valid = true

        for(let i=0;i<arr.length;i++){
            if(food.x === arr[i].x && food.y === arr[i].y){
                valid = false
                break
            }
        }

    }

    }
    else{
        arr.pop()
    }
    //self collition
    for(let i = 1;i<arr.length;i++){
        if(newHead.x === arr[i].x && newHead.y === arr[i].y){
            clearInterval(interval)
            restart.style.visibility = "visible"
            restart.addEventListener("click",restartGame)
        }
    }
    //wall collition
    if( newHead.x === -1||
        newHead.y === -1||
        newHead.x >= columns||
        newHead.y >= rows
    ){
        clearInterval(interval)
        restart.style.visibility = "visible"
        restart.addEventListener("click",restartGame)
    }



    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)


    ctx.fillStyle = "red"
    ctx.fillRect(food.x * scale, food.y * scale, scale, scale)

    ctx.fillStyle = "green"
    for(let i=0;i<arr.length;i++){
        ctx.fillRect(
            arr[i].x * scale,
            arr[i].y * scale,
            scale,
            scale
        )
    }
}


let interval = setInterval(() => {
    update(snake)
}, speed);

document.addEventListener("keydown",(event)=>{
    if (event.key === "ArrowUp" && direction !== "DOWN"){
        direction = "UP"
    }
    else if (event.key === "ArrowDown" && direction !== "UP"){
        direction = "DOWN"
    }
    else if (event.key === "ArrowLeft" && direction !== "RIGHT"){
        direction = "LEFT"
    }
    else if (event.key === "ArrowRight" && direction !== "LEFT"){
        direction = "RIGHT"
    }
    else if(event.key === " "){
        togglePause()
    }
})

canvas.addEventListener("touchstart",(e) => {
    touchStartX = e.touches[0].clientX
    touchStartY = e.touches[0].clientY
})

canvas.addEventListener("touchend",(e)=>{
    touchEndX =e.changedTouches[0].clientX
    touchEndY =e.changedTouches[0].clientY

    console.log(handleSwipe());
})

function handleSwipe(){

    let dx = touchEndX - touchStartX
    let dy = touchEndY - touchStartY


    if(dx === 0 && dy === 0){
        togglePause()
    }
    else if(Math.abs(dx) > Math.abs(dy)){
        if(dx > 0  && direction !=="LEFT"){
            direction = "RIGHT"
        }
        else if(dx < 0 && direction !== "RIGHT"){
            direction = "LEFT"
        }
    }
    else{
        if(dy < 0 && direction !== "DOWN"){
            direction = "UP"
        }
        else if(dy > 0 && direction !== "UP"){
            direction = "DOWN"
        }
    }
}

