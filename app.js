document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.container');
  const sliderInput = document.getElementById('slider-input');
  const sliderValue = document.getElementById('slider-value');
  let squares = [];

  function createGrid(rows, columns) {
    // Remove existing square elements and their event listeners
    while (container.firstChild) {
      container.firstChild.removeEventListener(
        'mouseenter',
        changeColorOnHover
      );
      container.firstChild.removeEventListener('click', changeColorOnClick);
      container.removeChild(container.firstChild);
    }

    squares = []; // Clear the squares array

    // Calculate the square size based on the slider value and container width
    const containerWidth = container.clientWidth;
    const squareSize = containerWidth / columns;

    // Create and append the grid squares with adjusted size and new event listeners
    for (let i = 0; i < rows * columns; i++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.style.width = squareSize + 'px';
      square.style.height = squareSize + 'px';
      container.appendChild(square);
      squares.push(square); // Add the square to the array
      // Add event listeners for the new square
      square.addEventListener('mouseenter', function () {}); //so that 'nothing happens initially
      square.addEventListener('click', changeColorOnClick);
    }
  }

  // Event listener to update the slider value display and create the grid
  sliderInput.addEventListener('input', function () {
    createGrid(sliderInput.value, sliderInput.value);
    sliderValue.textContent = `${sliderInput.value}x${sliderInput.value}`;
  });

  createGrid(1, 1);

  // Function to generate a random color in hex format (#RRGGBB)
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function changeColorOnHover() {
    // Change the background color to a random color on hover
    this.style.backgroundColor = getRandomColor();
  }

  function changeColorOnClick() {
    // Change the background color to a random color on click
    this.style.backgroundColor = getRandomColor();
  }

  // Event listener to change the behavior when the randomColorBtn is clicked
  document
    .getElementById('randomColorBtn')
    .addEventListener('click', function () {
      // Change both event listeners for squares
      squares.forEach(function (square) {
        square.removeEventListener('click', changeColorOnClick);
        square.removeEventListener('mouseenter', changeColorOnHover);
        square.addEventListener('mouseenter', changeColorOnHover);
        square.style.cursor = 'pointer'; // Add pointer cursor on hover
      });
    });

  // Event listener to change the behavior when the clickColorBtn is clicked
  document
    .getElementById('clickColorBtn')
    .addEventListener('click', function () {
      // Change both event listeners for squares
      squares.forEach(function (square) {
        square.removeEventListener('mouseenter', changeColorOnHover);
        square.removeEventListener('click', changeColorOnClick);
        square.addEventListener('click', changeColorOnClick);
        square.style.cursor = 'pointer'; // Add pointer cursor
      });
    });
});
