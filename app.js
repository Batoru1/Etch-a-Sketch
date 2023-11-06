document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.container');
  const sliderInput = document.getElementById('slider-input');
  const sliderValue = document.getElementById('slider-value');
  let squares = [];
  let isRainbowMode = false; // Flag to track rainbow mode
  let isDarkenerMode = false; // Flag to track the darkener mode

  function createGrid(rows, columns) {
    // Remove existing square elements and their event listeners
    while (container.firstChild) {
      container.firstChild.removeEventListener(
        'mouseenter',
        changeColorOnHover
      );
      container.firstChild.removeEventListener('click', changeColorOnClick);
      container.firstChild.removeEventListener('click', darkenSquare);
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
    if (interactions < maxInteractions) {
      // Calculate the darkening factor
      const darkeningFactor = (interactions / maxInteractions) * 90 + 10;

      // Change the background color to a darker shade
      this.style.backgroundColor = `hsl(0, 0%, ${darkeningFactor}%)`;

      interactions++; // Increment the interactions counter
    } else {
      interactions = 0; // Reset the interactions counter to 0
    }
  }

  function darkenSquare() {
    if (interactions < maxInteractions) {
      if (this.style.backgroundColor === 'rgba(0, 0, 0, 0.1)') {
        // If the square is already completely black, do nothing
        return;
      }

      let currentColor = this.style.backgroundColor;

      if (currentColor === 'rgba(0, 0, 0, 0)' && isRainbowMode) {
        // If the square is empty and it's in rainbow mode, set a random color
        currentColor = getRandomColor();
      }

      // Convert the color to RGB values
      const rgbValues = currentColor.match(/\d+/g);

      // Decrease the color by 10%
      const darkerColor = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, 0.9)`;

      this.style.backgroundColor = darkerColor;
      interactions++; // Increment the interactions counter
    }
  }

  // Event listener for the darker button
  document.getElementById('darker').addEventListener('click', function () {
    isDarkenerMode = !isDarkenerMode; // Toggle the darkener mode

    if (isDarkenerMode) {
      // Change event listeners for squares when darkener mode is activated
      squares.forEach(function (square) {
        square.removeEventListener('mouseenter', changeColorOnHover);
        square.removeEventListener('click', changeColorOnClick);
        square.addEventListener('click', darkenSquare);
        square.style.cursor = 'pointer';
      });
    } else {
      // Restore the default behavior when darkener mode is deactivated
      squares.forEach(function (square) {
        square.removeEventListener('click', darkenSquare);
        square.style.cursor = 'default';
        if (isRainbowMode) {
          square.addEventListener('mouseenter', changeColorOnHover);
        } else {
          square.addEventListener('click', changeColorOnClick);
        }
      });
    }
  });

  // Event listener to change the behavior when the hoverColorBtn is clicked
  document
    .getElementById('hoverColorBtn')
    .addEventListener('click', function () {
      isRainbowMode = !isRainbowMode; // Toggle between rainbow and black mode
      // Change event listeners for squares
      squares.forEach(function (square) {
        square.removeEventListener('click', darkenSquare);
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
        square.removeEventListener('click', darkenSquare);
        square.removeEventListener('mouseenter', changeColorOnHover);
        if (isRainbowMode) {
          square.addEventListener('mouseenter', changeColorOnHover);
          square.style.cursor = 'pointer'; // Add pointer cursor on hover
        } else {
          square.addEventListener('click', changeColorOnClick);
          square.style.cursor = 'pointer'; // Add pointer cursor on click
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
