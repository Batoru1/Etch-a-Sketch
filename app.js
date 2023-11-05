document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.container');
  const sliderInput = document.getElementById('slider-input');
  const sliderValue = document.getElementById('slider-value');
  let squares = [];
  let isRainbowMode = false; // Flag to track rainbow mode
  let isDarkenerMode = false; // Flag to track darkener mode

  function createGrid(rows, columns) {
    // Remove existing square elements and their event listeners
    while (container.firstChild) {
      container.firstChild.removeEventListener(
        'mouseenter',
        changeColorOnHover
      );
      container.firstChild.removeEventListener('click', changeColorOnClick);
      if (isDarkenerMode) {
        container.firstChild.removeEventListener('click', darkenSquareOnClick);
      }
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
      square.addEventListener('mouseenter', function () {}); // So that nothing happens initially
      square.addEventListener('click', changeColorOnClick);
      if (isDarkenerMode) {
        square.addEventListener('click', darkenSquareOnClick);
      }
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
    if (isRainbowMode) {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    } else {
      return 'black'; // Return black in black mode
    }
  }

  function changeColorOnHover() {
    // Change the background color to a random color on hover
    this.style.backgroundColor = getRandomColor();
  }

  let interactions = 0;
  const maxInteractions = 10; // Adjust the number of interactions required

  function changeColorOnClick() {
    // Change the background color to a random color on click
    this.style.backgroundColor = getRandomColor();
  }

  function darkenSquareOnClick() {
    if (interactions < maxInteractions) {
      // Calculate the darkening factor
      const currentColor = getComputedStyle(this).backgroundColor;
      const currentColorRGB = currentColor.match(/\d+/g);
      const newColorRGB = currentColorRGB.map((value) =>
        Math.max(0, value - 25)
      ); // Darken the color

      this.style.backgroundColor = `rgb(${newColorRGB[0]}, ${newColorRGB[1]}, ${newColorRGB[2]})`;

      interactions++; // Increment the interactions counter
    } else {
      interactions = 0; // Reset the interactions counter to 0
    }
  }

  // Event listener to change the behavior when the hoverColorBtn is clicked
  document
    .getElementById('hoverColorBtn')
    .addEventListener('click', function () {
      isRainbowMode = !isRainbowMode; // Toggle between rainbow and black mode
      // Change event listeners for squares
      squares.forEach(function (square) {
        square.removeEventListener('click', changeColorOnClick);
        square.removeEventListener('mouseenter', changeColorOnHover);
        if (isRainbowMode) {
          square.addEventListener('mouseenter', changeColorOnHover);
          square.style.cursor = 'pointer'; // Add pointer cursor on hover
        } else {
          square.addEventListener('click', changeColorOnClick);
          square.style.cursor = 'default'; // Remove pointer cursor
        }
      });
    });

  // Event listener to change the behavior when the clickColorBtn is clicked
  document
    .getElementById('clickColorBtn')
    .addEventListener('click', function () {
      isRainbowMode = !isRainbowMode; // Toggle between rainbow and black mode
      // Change event listeners for squares
      squares.forEach(function (square) {
        square.removeEventListener('mouseenter', changeColorOnHover);
        square.removeEventListener('click', changeColorOnClick);
        if (isRainbowMode) {
          square.addEventListener('mouseenter', changeColorOnHover);
          square.style.cursor = 'pointer'; // Add pointer cursor on hover
        } else {
          square.addEventListener('click', changeColorOnClick);
          square.style.cursor = 'pointer'; // Add pointer cursor on click
        }
      });
    });

  // Event listener to toggle darkener mode when the darker button is clicked
  document.getElementById('darker').addEventListener('click', function () {
    isDarkenerMode = !isDarkenerMode; // Toggle darkener mode
    // Change event listeners for squares
    squares.forEach(function (square) {
      if (isDarkenerMode) {
        square.addEventListener('click', darkenSquareOnClick);
        square.style.cursor = 'pointer'; // Add pointer cursor for darkening
      } else {
        square.removeEventListener('click', darkenSquareOnClick);
        square.style.cursor = 'default'; // Remove pointer cursor
      }
    });
  });

  // Event listener for the black button
  document.getElementById('blackBtn').addEventListener('click', function () {
    isRainbowMode = false; // Set to black mode
  });

  // Event listener for the rainbow button
  document.getElementById('rainbowBtn').addEventListener('click', function () {
    isRainbowMode = true; // Set to rainbow mode
  });
});
