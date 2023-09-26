const container = document.querySelector('.container');

function createGrid(rows, columns) {
  for (let i = 0; i < rows * columns; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    container.appendChild(square);
  }
}

createGrid(16, 16);

const squares = document.querySelectorAll('.square');

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
