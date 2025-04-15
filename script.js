const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

let painting = false;
let currentColor = document.getElementById('colorPicker').value;
let currentBrushSize = document.getElementById('brushSize').value;
let isErasing = false;

document.getElementById('colorPicker').addEventListener('input', function() {
    currentColor = this.value;
    isErasing = false;
});

document.getElementById('brushSize').addEventListener('input', function() {
    currentBrushSize = this.value;
});

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;

    ctx.lineWidth = currentBrushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isErasing ? '#ffffff' : currentColor;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function activateEraser() {
    isErasing = true;
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);
