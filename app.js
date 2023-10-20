const container = document.querySelector('.container');
const sliderInput = document.getElementById('slider-input');
const sliderValue = document.getElementById('slider-value');

function createGrid(rows, columns) {
  // Remove existing square elements
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  // Calculate the square size based on the slider value and container width
  const containerWidth = container.clientWidth;
  const squareSize = containerWidth / columns;
  // Create and append the grid squares with adjusted size
  for (let i = 0; i < rows * columns; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = squareSize + 'px';
    square.style.height = squareSize + 'px';
    container.appendChild(square);
    // Add event listener for the new square
    square.addEventListener('mouseenter', function () {
      // Change the background color to a random color
      square.style.backgroundColor = getRandomColor();
    });
  }
}
// Event listener to update the slider value display and create the grid
sliderInput.addEventListener('input', function () {
  createGrid(sliderInput.value, sliderInput.value); // Create the grid based on the slider value
  sliderValue.textContent = `${sliderInput.value}x${sliderInput.value}`; //to make slider value display num x num instead of just num
});

createGrid(1, 1);

// let squares = document.querySelectorAll('.square');
// squares.forEach(function (square) {
//   square.addEventListener('mouseenter', function () {
//     // Change the background color to a random color
//     square.style.backgroundColor = getRandomColor();
//   });
// });

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
