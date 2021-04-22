const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let isIn = false;

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.moveTo(x, y);
    ctx.beginPath();
  } else if (painting && isIn) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function leaveMouse() {
  isIn = false;
  ctx.closePath();
}

function enterMouse() {
  isIn = true;
  ctx.beginPath();
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
}

function handleRangeChange(event) {
  const range = event.target.value;
  ctx.lineWidth = range;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  window.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", leaveMouse);
  canvas.addEventListener("mouseenter", enterMouse);
}

Array.from(colors).forEach(color => 
  color.addEventListener("click", handleColorClick)
);

if(range) {
  range.addEventListener("input", handleRangeChange);
}