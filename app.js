const container = document.querySelector('.container');
const sliderInput = document.getElementById('slider-input');
const sliderValue = document.getElementById('slider-value');

function createGrid(rows, columns) {
  // Clear the container by removing all child elements
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  for (let i = 0; i < rows * columns; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    container.appendChild(square);
  }
}

// Event listener to update the slider value display and create the grid
sliderInput.addEventListener('input');

createGrid(16, 16);

let squares = document.querySelectorAll('.square');

squares.forEach(function (square) {
  square.addEventListener('mouseenter', function () {
    // Change the background color to a random color
    square.style.backgroundColor = getRandomColor();
  });
});

// Function to generate a random color in hex format (#RRGGBB)
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// const changeGrid = prompt('Enter grid size', '1-64x1-64');

// if (changeGrid )
