const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const color = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const paintBtn = document.getElementById("jsPaintBtn");
const fillBtn = document.getElementById("jsFillBtn");
const clearBtn = document.getElementById("jsClearBtn");
const saveBtn = document.getElementById("jsSaveBtn");

const INITIAL_STYLE = "#2c2c2c";

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.strokeStyle = INITIAL_STYLE;
ctx.fillStyle = INITIAL_STYLE;
ctx.lineWidth = 2.5;

let drawing = false;
let fill = false;
let paint = true;

function startDrawing() {
    drawing = true;
}

function stopDrawing() {
    drawing = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!drawing) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleCanvas() {
    if(fill) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleContextMenu(event) {
    event.preventDefault();
}

function handleRange(event) {
    const value = event.target.value;
    ctx.lineWidth = value;
}

function handleCanvasPaint() {
    paint = true;
    fill = false;
}

function handleCanvasFill() {
    paint = false;
    fill = true;
}

function handleClear() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function handleSave(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();    
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);
    canvas.addEventListener("click",handleCanvas);
    canvas.addEventListener("contextmenu",handleContextMenu)
}

if(range) {
    range.addEventListener("input",handleRange);
}

if(paintBtn){
    paintBtn.addEventListener("click",handleCanvasPaint);
}

if(fillBtn) {
    fillBtn.addEventListener("click",handleCanvasFill);
}

if(clearBtn) {
    clearBtn.addEventListener("click",handleClear);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSave);
}

Array.from(color).forEach(colors => colors.addEventListener("click",handleColor));