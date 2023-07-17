let fill = 'black';
const eraser = document.getElementById('eraser');
const black = document.getElementById('black');
const colorPicker = document.getElementById('colorPicker');
const rainbow = document.getElementById('rainbow');
const reset = document.getElementById('reset');
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
const grid = document.getElementById('grid');
let currentIndex = 0;
let intervalId = null;

eraser.addEventListener('click', function() {
    fill = 'white';
    stopRainbow();
});

black.addEventListener('click', function() {
    fill = 'black';
    stopRainbow();
});

colorPicker.addEventListener('input', function() {
    fill = this.value;
    stopRainbow();
});

rainbow.addEventListener('click', function() {
    stopRainbow();
    startRainbow();
});

grid.addEventListener('mouseover', function(event) {
    const blockDiv = event.target;
    if (!intervalId) {
        blockDiv.style.backgroundColor = fill;
    }
});

reset.addEventListener('click', function() {
    resetGrid();
});

function createGrid(n) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const blockDiv = document.createElement('div');
            blockDiv.classList.add('block');
            blockDiv.style.width = `${500 / n}px`;
            blockDiv.style.height = `${500 / n}px`;
            grid.appendChild(blockDiv);

            blockDiv.addEventListener('mouseover', function() {
                blockDiv.style.backgroundColor = fill;
            });
        }
    }
}

function eraseGrid() {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function startRainbow() {
    intervalId = setInterval(function() {
        currentIndex = (currentIndex + 1) % colors.length;
        fill = colors[currentIndex];
        applyColor();
    }, 0.1);
}

function stopRainbow() {
    clearInterval(intervalId);
    intervalId = null;
}

function applyColor() {
    const blocks = document.querySelectorAll('.block');
    blocks.forEach(function(block) {
        if (!intervalId) {
            block.style.backgroundColor = fill;
        }
    });
}

createGrid(40);

const slider = document.getElementById('slider');
let sliderValue = document.getElementById('sliderValue');
sliderValue.textContent = '40';

slider.addEventListener('input', function() {
    sliderValue.textContent = this.value;
    eraseGrid();
    createGrid(this.value);
});

function resetGrid() {
    eraseGrid();
    createGrid(sliderValue.textContent);
    stopRainbow();
    fill = 'black';
}
