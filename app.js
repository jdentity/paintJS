const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const clear = document.getElementById("jsClear");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
ctx.strokeStyle = "INITIAL_COLOR";
ctx.fillStyle = "INITIAL_COLOR";
ctx.lineWidth = 2.5;

let painting = false;
let isIn = false;
let filling = false;

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
  if(filling === false) {
    painting = true;
  }
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

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  Array.from(colors).forEach(color =>
    color.classList.remove("selected")
  );
  event.target.classList.add("selected");
}

function handleRangeChange(event) {
  const range = event.target.value;
  ctx.lineWidth = range;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleClearClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "INITIAL_COLOR";
  ctx.fillStyle = "INITIAL_COLOR";
  ctx.lineWidth = 2.5;
  Array.from(colors).forEach(color =>
    color.classList.remove("selected")
  );
  colors[3].classList.add("selected");
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png", 1.0);
  const link = document.createElement("a");
  link.download = "PaintJS🎨";
  link.href = image;
  link.click();
}

function handleContextMenu(event) {
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  window.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", leaveMouse);
  canvas.addEventListener("mouseenter", enterMouse);
  canvas.addEventListener("contextmenu", handleContextMenu);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if(range) {
  range.addEventListener("input", handleRangeChange);
}

if(mode) {
  mode.addEventListener("click", handleModeClick);
}

if(clear) {
  clear.addEventListener("click", handleClearClick);
}

if(save) {
  save.addEventListener("click", handleSaveClick);
}