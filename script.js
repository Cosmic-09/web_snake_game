const canvas = document.getElementById("snakegame");
const ctx = canvas.getContext("2d");
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let count = 0
let snake = [
 {x:10,y:10},
 {x:9,y:10},
 {x:8,y:10}
]
let direction = "RIGHT"


let food = {
    x: Math.floor(Math.random() * columns),
    y: Math.floor(Math.random() * rows)
}


ctx.fillStyle = "green"


for(let i=0;i<snake.length;i++){
    ctx.fillRect(snake[i].x * scale,snake[i].y * scale,20,20)
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
        food = {
        x: Math.floor(Math.random() * columns),
        y: Math.floor(Math.random() * rows)
        }
        count++
        document.getElementById("score").innerText = count
    }
    else{
        arr.pop()
    }
    //self collition
    for(let i = 1;i<arr.length;i++){
        if(newHead.x === arr[i].x && newHead.y === arr[i].y){
            alert("hello")
        }
    }
    //wall collition
    if( newHead.x === -1||
        newHead.y === -1||
        newHead.x >= columns||
        newHead.y >= rows
    ){
        alert("hello")
    }

    ctx.fillStyle = "white"
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


setInterval(() => {
    update(snake)
}, 200);

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
})
