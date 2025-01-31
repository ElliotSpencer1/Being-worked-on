let cols, rows;
let cellSize = 40;
let walls, doorways, items, bossSpawns;
let rooms = [];
let numRooms = 12;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / cellSize);
  rows = floor(height / cellSize);
  
  walls = new Group();
  walls.collider = "S";
  walls.color = "gray";
  doorways = new Group();
  doorways.collider = "S";
  doorways.color = "brown";
  items = new Group();
  items.collider = "S"
  bossSpawns = new Group();
  bossSpawns.collider = "S";
  
  // Generate rooms
  for (let i = 0; i < numRooms - 1; i++) {
    let w = floor(random(3, 6));
    let h = floor(random(3, 6));
    let x = floor(random(0, cols - w));
    let y = floor(random(0, rows - h));
    rooms.push(new Room(x, y, w, h));
  }
  
  // Generate boss room
  let bossRoom = new Room(floor(random(0, cols - 10)), floor(random(0, rows - 10)), 10, 10);
  rooms.push(bossRoom);
  
  // Connect rooms
  for (let i = 0; i < rooms.length - 1; i++) {
    connectRooms(rooms[i], rooms[i + 1]);
  }
  
  // Add items
  for (let i = 0; i < 5; i++) {
    let room = random(rooms);
    let x = floor(random(room.x, room.x + room.w));
    let y = floor(random(room.y, room.y + room.h));
    let item = createSprite(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, cellSize, cellSize);
    item.shapeColor = color(0, 255, 0); // Green for items
    items.add(item);
  }
  
  // Add boss spawn tile
  let bossSpawnX = bossRoom.x + floor(bossRoom.w / 2);
  let bossSpawnY = bossRoom.y + floor(bossRoom.h / 2);
  let bossSpawn = createSprite(bossSpawnX * cellSize + cellSize / 2, bossSpawnY * cellSize + cellSize / 2, cellSize, cellSize);
  bossSpawn.shapeColor = color(255, 165, 0); // Orange for boss spawn
  bossSpawns.add(bossSpawn);
}

function draw() {
  background(220);
//   drawSprites();
}

class Room {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.createRoom();
  }

  createRoom() {
    for (let i = this.x; i < this.x + this.w; i++) {
      for (let j = this.y; j < this.y + this.h; j++) {
        let wall = createSprite(i * cellSize + cellSize / 2, j * cellSize + cellSize / 2, cellSize, cellSize);
        wall.shapeColor = color(0);
        walls.add(wall);
      }
    }
  }
}

function connectRooms(room1, room2) {
  let x1 = floor(random(room1.x, room1.x + room1.w));
  let y1 = floor(random(room1.y, room1.y + room1.h));
  let x2 = floor(random(room2.x, room2.x + room2.w));
  let y2 = floor(random(room2.y, room2.y + room2.h));
  while (x1 != x2 || y1 != y2) {
    let wall = createSprite(x1 * cellSize + cellSize / 2, y1 * cellSize + cellSize / 2, cellSize, cellSize);
    wall.shapeColor = color(0);
    walls.add(wall);
    if (x1 < x2) x1++;
    else if (x1 > x2) x1--;
    else if (y1 < y2) y1++;
    else if (y1 > y2) y1--;
  }
  // Make corridors 2 squares wide
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (x1 + i >= 0 && x1 + i < cols && y1 + j >= 0 && y1 + j < rows) {
        let wall = createSprite((x1 + i) * cellSize + cellSize / 2, (y1 + j) * cellSize + cellSize / 2, cellSize, cellSize);
        wall.shapeColor = color(0);
        walls.add(wall);
      }
    }
  }
  // Add doorway tiles before corridors
  if (x1 > 0 && walls[x1 - 1][y1]) {
    let doorway = createSprite((x1 - 1) * cellSize + cellSize / 2, y1 * cellSize + cellSize / 2, cellSize, cellSize);
    doorway.shapeColor = color(139, 69, 19); // Brown for doorways
    doorways.add(doorway);
  }
  if (x1 < cols - 1 && walls[x1 + 1][y1]) {
    let doorway = createSprite((x1 + 1) * cellSize + cellSize / 2, y1 * cellSize + cellSize / 2, cellSize, cellSize);
    doorway.shapeColor = color(139, 69, 19); // Brown for doorways
    doorways.add(doorway);
  }
  if (y1 > 0 && walls[x1][y1 - 1]) {
    let doorway = createSprite(x1 * cellSize + cellSize / 2, (y1 - 1) * cellSize + cellSize / 2, cellSize, cellSize);
    doorway.shapeColor = color(139, 69, 19); // Brown for doorways
    doorways.add(doorway);
  }
  if (y1 < rows - 1 && walls[x1][y1 + 1]) {
    let doorway = createSprite(x1 * cellSize + cellSize / 2, (y1 + 1) * cellSize + cellSize / 2, cellSize, cellSize);
    doorway.shapeColor = color(139, 69, 19); // Brown for doorways
    doorways.add(doorway);
  }
}