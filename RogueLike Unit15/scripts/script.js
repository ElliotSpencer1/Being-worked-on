let cols, rows;
let grid = [];
let cellSize = 40;

function setup() {
  createCanvas(800, 800);
  cols = width / cellSize;
  rows = height / cellSize;
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }
}

function draw() {
  background(220);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.x = i * cellSize;
    this.y = j * cellSize;
    this.obstacle = random(1) < 0.3; // 30% chance of being an obstacle
  }

  show() {
    stroke(0);
    noFill();
    rect(this.x, this.y, cellSize, cellSize);
    if (this.obstacle) {
      fill(0);
      rect(this.x, this.y, cellSize, cellSize);
    }
  }
}