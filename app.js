const container = document.querySelector('.container');

function createGrid(rows, columns) {
  for (let i = 0; i < rows * columns; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    container.appendChild(square);
  }
}

createGrid(16, 16);
