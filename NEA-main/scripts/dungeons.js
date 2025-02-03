const tileSize = 48;
let goingThroughDoor = false;
let movementActive = true;
let camy = 169;
let camx = 216;
let whichLevel = 0;
let countR = 0, countL = 0, countU = 0, countD = 0;
let floorImg, wallImg, stairsImg;
let walls, Wall, floors, brickFloor, stairs, Doors, rightDoor, leftDoor, upDoor, downDoor, tileMap, leftLimiter, rightLimiter, upLimiter, downLimiter;
let countdownTime = 0.15; // Countdown time in seconds
let startTime;
let isCountingDown = false;
let swing = false;
let swordLeft = false;
let timerOver = true;
let idleHorizontal = true;
let idleVertical = true;
let swordBoundary = 111;
let sLeft = false;
let sRight = false;
let enemycount;
let enemies, move, attacking;
let enemyspawnbrick, firstpass, boss;
let thresholdDistance = 50;
let circleStep = 0;
let bossdone = false;
enemycount = 91;

const levels = [
  [
    "======================================================================..............................",
    "=________==________==________==F_______==________==________==____F___=..............................",
    "=________==________==________==________==________==____F___==________=..............................",
    "=________><_____F__><____F___><________==__F_____><________><________=..............................",
    "=________><________><________><________==________><________><________=..............................",
    "=_S______==___F____==________==________==__F_____==______F_==________=..............................",
    "=________==________==_____F__==_______F==________==________==F_______=..............................",
    "==============vv========vv============================vv========vv====..............................",
    "..........====^^========^^============================^^========^^==================================",
    "..........=________==________==___F____==________==________==________==________==____F___==______F_=",
    "..........=____F___==__F_____==________==__F_____==______F_==__F_____==_____F__==________==________=",
    "..........=________==________><________><________><________==________><________><________><________=",
    "..........=________==________><________><________><________==________><____F___><________><________=",
    "..........=________==________==____F___==_______F==____F___==____F___==________==____F___==____F___=",
    "..........=F_______==______F_==________==________==________==________==________==________==________=",
    "..........====vv==================vv================================================================",
    "==============^^====..........====^^====....................====================....................",
    "=________==________=..........=________=....................=__________________=....................",
    "=__F_____==________=..........=________=....................=__________________=....................",
    "=________><_F______=..........=____F___=....................=__________________=....................",
    "=________><____F___=..........=________=....................=__________________=....................",
    "=_____F__==________=..........=_F______=....................=__________________=....................",
    "=________==________=..........=________=....................=__________________=....................",
    "====vv==============..........====vv====....................=__________________=....................",
    "====^^====..........==============^^====....................=__________________=....................",
    "=________=..........=___F____==________=....................=__________________=....................",
    "=____F___=..........=________==________=....................=__________________=....................",
    "=________=..........=________==________=....................=__________________=....................",
    "=__F_____=..........=___F____==___F____=....................=__________________=....................",
    "=________=..........=________==________=....................=__________________=....................",
    "=____F___=..........=______F_==___FF___=....................=__________________=....................",
    "====vv====..........====vv==============....................====vv==============....................", // only open door when enemies defeated
    "====^^==================^^======================================^^====..............................",
    "=________==F_______==______F_==________==_____F__==_______F==________=..............................",
    "=____F___==_______F==________==__F_____==________==________==______F_=..............................",
    "=________><________><__F_____><______F_><____F___==_F______><________=..............................",
    "=___F____><________><________><________><________==________><____FF__=..............................",
    "=________==___F____==________==____F___==________==____FF__==_F______=..............................",
    "=______F_==________==__F_____==________==___F____==________==________=..............................",
    "============================================vv========vv==============..............................",
    "........................................====^^========^^========================....................",
    "........................................=_F______==________==F_______==________=....................",
    "........................................=________==____F__F==____F___==________=....................",
    "........................................=_____F__><________><________><________=....................",
    "........................................=_F______><____FF__><__FF____><________=....................", // change door to open only when boss defeated
    "........................................=________==________==________==______S_=....................",
    "........................................=________==________==________==________=....................",
    "........................................========================================....................",
  ]
];

function preload() {
  floorImg = loadImage('images/ZeldaTileMap.png');
  wallImg = loadImage('images/ZeldaWall.png');
  stairsImg = loadImage('images/stairsPic2.png');
  swordImg = loadImage('images/sword2.png');
  spriteImg = loadImage('images/spriteSheet.png');
  shieldImg = loadImage('images/sheild.png');
}

class Boss {
  constructor(x, y) {
    this.sprite = new Sprite(x, y, 64, 64, 'd');
    this.sprite.color = 'red';
    this.sprite.health = 1000; // Boss health
    this.sprite.speed = 1.5; // Boss movement speed
    this.sprite.rotationLock = true;
    this.sprite.layer = 3;
    this.attackCooldown = 100; // Cooldown between attacks
    this.lastAttack = millis();
  }

  update() {
    // Move toward the player
    let direction = createVector(guy.x - this.sprite.x, guy.y - this.sprite.y).normalize();
    this.sprite.vel.x = direction.x * this.sprite.speed;
    this.sprite.vel.y = direction.y * this.sprite.speed;

    // Attack the player if close enough
    if (dist(this.sprite.x, this.sprite.y, guy.x, guy.y) < 50 && millis() - this.lastAttack > this.attackCooldown) {
      this.attack();
      this.lastAttack = millis();
    }
  }

  attack() {
    // Damage the player
    guy.health -= 50;
    console.log("Boss attacked! Player health: ", guy.health);
  }

  isDefeated() {
    return this.sprite.health <= 0;
  }
}


function guySetup() {
  guy = new Sprite(216, 240, 58, 58, 'd');
  guy.rotationLock = true;
  guy.layer = 2;
  guy.spriteSheet = spriteImg;
  guy.anis.frameDelay = 4;
  guy.addAnis({
    moveDown: { row: 0, frames: 4 },
    moveUp: { row: 1, frames: 4 },
    moveLeft: { row: 2, frames: 4 },
    moveRight: { row: 3, frames: 4 },
    idle: { row: 0, frames: 1 }
  });
  guy.scale = 0.7;
}

function swordSetup() {
  startTime = millis(); // Record the start time
  sword = new Sprite(342, 351, 220, 1240, 'd');
  rotationSensor = new Sprite(342, 351, 8, 30, 'd');
  sword.img = swordImg;
  sword.scale = 0.025;
  sword.layer = 3;
  rotationSensor.scale = 0.025;
  sword.offset.y = -12;
  rotationSensor.offset.y = (-((50 / 350) * 100)) + 3;
  sword.img.offset.y = -450;
  rotationSensor.visible = false;
  sword.mass = 0;
}

function shieldSetup() {
  shield = new Sprite(358, 351, 17.4, 21.8, 'd');
  shield.rotationLock = true;
  shield.layer = 2;
  shield.img = shieldImg;
  shield.scale = 0.025 / 2.1;
}

function stairLimits() {
  leftLimiter = new Sprite(121, 240, 1, 50, 's');
  upLimiter = new Sprite(96, 265, 48, 1, 's');
  downLimiter = new Sprite(96, 215, 48, 1, 's');
  leftLimiter.visible = false;
  upLimiter.visible = false;
  downLimiter.visible = false;
}

function Map_Setup() {
  enemyspawnbrick = new Group();
  enemyspawnbrick.collider = "none";
  enemyspawnbrick.w = tileSize;
  enemyspawnbrick.h = tileSize;
  enemyspawnbrick.img = floorImg;
  enemyspawnbrick.tile = "F";

  walls = new Group();
  walls.collider = 's';
  walls.w = tileSize;
  walls.h = tileSize;

  Wall = new walls.Group();
  Wall.tile = '=';
  Wall.img = wallImg;

  floors = new Group();
  floors.collider = 'none';
  floors.w = tileSize;
  floors.h = tileSize;

  brickFloor = new floors.Group();
  brickFloor.tile = '_';
  brickFloor.img = floorImg;

  stairs = new floors.Group();
  stairs.tile = 'S';
  stairs.img = stairsImg;

  enemies = new Group();
  enemies.width = 20;
  enemies.height = 20;
  enemies.color = "green";
  enemies.tile = "x";
  enemies.collider = "d";
  enemies.startX = 0;
  enemies.moveCount = 0;
  enemies.health = 100;
  enemies.cooldown = false;

  Doors = new Group();
  Doors.collider = 'none';
  Doors.w = tileSize;
  Doors.h = tileSize;

  rightDoor = new Doors.Group();
  rightDoor.tile = '>';
  rightDoor.img = floorImg;

  leftDoor = new Doors.Group();
  leftDoor.tile = '<';
  leftDoor.img = floorImg;

  downDoor = new Doors.Group();
  downDoor.tile = 'v';
  downDoor.img = floorImg;

  upDoor = new Doors.Group();
  upDoor.tile = '^';
  upDoor.img = floorImg;
}

function dungeonCameraSetup() {
  camera.x = camx;
  camera.y = camy;
  camera.zoom = 1;
}

function setup() {
  createCanvas(480, 384, 'pixelated');
  dungeonCameraSetup();
  Map_Setup();

  tileMap = new Tiles(levels[whichLevel], 0, 0, tileSize, tileSize);
  stairLimits();
  guySetup();
  swordSetup();
  shieldSetup();
  tileMap.layer = 1;

  sword.overlaps(guy);
  rotationSensor.overlaps(guy);
  shield.overlaps(guy);
  sword.overlaps(rotationSensor);
  shield.overlaps(rotationSensor);
  sword.overlaps(shield);

  let sensors = new Group();
  topSensor = new sensors.Sprite(guy.x, guy.y - 8);
  bottomSensor = new sensors.Sprite(guy.x, guy.y + guy.h / 2 - 1);
  leftSensor = new sensors.Sprite(guy.x - guy.w / 2 + 1, guy.y);
  rightSensor = new sensors.Sprite(guy.x + guy.w / 2 - 1, guy.y);

  topSensor.w = guy.w / 3;
  topSensor.h = 2;
  bottomSensor.w = guy.w / 1.5;
  bottomSensor.h = 2;
  leftSensor.w = 1;
  leftSensor.h = guy.h / 2;
  rightSensor.w = 1;
  rightSensor.h = guy.h / 2;

  bottomSensor.visible = false;
  topSensor.visible = false;
  leftSensor.visible = false;
  rightSensor.visible = false;

  bottomJoint = new GlueJoint(guy, bottomSensor);
  topJoint = new GlueJoint(guy, topSensor);
  leftJoint = new GlueJoint(guy, leftSensor);
  rightJoint = new GlueJoint(guy, rightSensor);
  topJoint.visible = false;
  bottomJoint.visible = false;
  leftJoint.visible = false;
  rightJoint.visible = false;

  leftSensor.overlaps(rightDoor, () => {
    if (enemycount === 0 && (!boss || boss.isDefeated())) moveCamera(1, 0, 3);
    else console.log("Defeat all enemies first!");
  });

  rightSensor.overlaps(leftDoor, () => {
    if (enemycount === 0 && (!boss || boss.isDefeated())) moveCamera(-1, 0, 3);
    else console.log("Defeat all enemies first!");
  });

  topSensor.overlaps(downDoor, () => {
    if (enemycount === 0 && (!boss || boss.isDefeated())) moveCamera(0, 1, 3);
    else console.log("Defeat all enemies first!");
  });

  bottomSensor.overlaps(upDoor, () => {
    if (enemycount === 0 && (!boss || boss.isDefeated())) moveCamera(0, -1, 3);
    else console.log("Defeat all enemies first!");
  });

  // Spawn boss in the big area
  boss = new Boss(400, 200);
}

function draw() {
  clear();
  if (goingThroughDoor) {
    movementActive = false;
  } else {
    movementActive = true;
  }
  Movement();
  if (guy.overlaps(stairs)) {
    exitDungeon();
  }
  swordDraw();
  enemypathfinding();

  // Update boss
  if (boss) {
    boss.update();
    if (boss.isDefeated()) {
      boss.sprite.remove();
      boss = null;
      console.log("Boss defeated!");
    }
  }
}

function enemypathfinding() {
  if (!firstpass) {
    let count = 0;
    for (let b of enemyspawnbrick) {
      if (count < enemycount && b.tile === 'F') {
        new enemies.Sprite(b.x, b.y);
        count++;
      }
      if (count >= enemycount) {
        firstpass = true;
        break;
      }
    }
  }

  for (let e of enemies) {
    e.vel.x = 0;
    e.vel.y = 0;
    e.rotationLock = true;

    let distance = dist(guy.x, guy.y, e.x, e.y);

    if (distance <= 100) {
      e.moveTo(guy.x, guy.y);
    }

    if (sword.collides(e)) {
      e.health -= 25;
      e.cooldown = true;
      setTimeout(() => {
        e.cooldown = false;
      }, 25);
    }

    if (e.health <= 0) {
      e.remove();
      enemycount--;
    }

    if (e.colliding(guy) && !guy.cooldown) {
      guy.health -= 25;
      guy.cooldown = true;
      setTimeout(() => {
        guy.cooldown = false;
      }, 25);
    }
  }
}

function swordDraw() {
  swordSwing();
  rotationSensor.rotateMinTo(mouse, 10, 90);
  swordRotation();
  swordMirroring();
}

function swordRotation() {
  if ((rotationSensor.rotation >= swordBoundary || rotationSensor.rotation <= -swordBoundary) && !swing) {
    if (rotationSensor.rotation >= swordBoundary) {
      sword.rotation = swordBoundary;
    } else if (rotationSensor.rotation <= -swordBoundary) {
      sword.rotation = -swordBoundary;
    }
  } else if (rotationSensor.rotation < swordBoundary && rotationSensor.rotation > -swordBoundary) {
    if (!swing) sword.rotation = rotationSensor.rotation;
  }
}

function swordMirroring() {
  if (rotationSensor.rotation >= 0 && !swing && swordLeft) {
    sword.mirror.x = false;
    swordLeft = false;
  } else if (rotationSensor.rotation < 0 && !swing && !swordLeft) {
    sword.mirror.x = true;
    swordLeft = true;
  } else {
    if (swordLeft) {
      sword.mirror.x = true;
    } else {
      sword.mirror.x = false;
    }
  }
}

function swordSwing() {
  if (mouse.presses() && timerOver && !sLeft && !sRight) {
    startTime = millis();
    isCountingDown = true;
    swing = true;
    if (swordLeft) {
      if (sword.rotation <= 0 && sword.rotation > -10) sword.rotateMinTo(sword.rotation - 90, 20);
      if (sword.rotation <= -10 && sword.rotation > -20) sword.rotateMinTo(sword.rotation - 80, 20);
      if (sword.rotation <= -20 && sword.rotation > -30) sword.rotateMinTo(sword.rotation - 70, 20);
      if (sword.rotation <= -30 && sword.rotation > -40) sword.rotateMinTo(sword.rotation - 65, 20);
      if (sword.rotation <= -40 && sword.rotation > -50) sword.rotateMinTo(sword.rotation - 60, 20);
      if (sword.rotation <= -50 && sword.rotation > -60) sword.rotateMinTo(sword.rotation - 55, 20);
      if (sword.rotation <= -60 && sword.rotation > -70) sword.rotateMinTo(sword.rotation - 50, 20);
      if (sword.rotation <= -70 && sword.rotation > -80) sword.rotateMinTo(sword.rotation - 40, 20);
      if (sword.rotation <= -80 && sword.rotation > -90) sword.rotateMinTo(sword.rotation - 30, 20);
      if (sword.rotation <= -90 && sword.rotation > -100) sword.rotateMinTo(sword.rotation - 20, 20);
      if (sword.rotation <= -100 && sword.rotation > -110) sword.rotateMinTo(sword.rotation - 10, 20);
      if (sword.rotation <= -110) sword.rotateMinTo(sword.rotation - 10, 20);
    } else {
      if (sword.rotation >= 0 && sword.rotation < 10) sword.rotateMinTo(sword.rotation + 90, 20);
      if (sword.rotation >= 10 && sword.rotation < 20) sword.rotateMinTo(sword.rotation + 80, 20);
      if (sword.rotation >= 20 && sword.rotation < 30) sword.rotateMinTo(sword.rotation + 70, 20);
      if (sword.rotation >= 30 && sword.rotation < 40) sword.rotateMinTo(sword.rotation + 65, 20);
      if (sword.rotation >= 40 && sword.rotation < 50) sword.rotateMinTo(sword.rotation + 60, 20);
      if (sword.rotation >= 50 && sword.rotation < 60) sword.rotateMinTo(sword.rotation + 55, 20);
      if (sword.rotation >= 60 && sword.rotation < 70) sword.rotateMinTo(sword.rotation + 50, 20);
      if (sword.rotation >= 70 && sword.rotation < 80) sword.rotateMinTo(sword.rotation + 40, 20);
      if (sword.rotation >= 80 && sword.rotation < 90) sword.rotateMinTo(sword.rotation + 30, 20);
      if (sword.rotation >= 90 && sword.rotation < 100) sword.rotateMinTo(sword.rotation + 20, 20);
      if (sword.rotation >= 100 && sword.rotation < 110) sword.rotateMinTo(sword.rotation + 10, 20);
      if (sword.rotation >= 110) sword.rotateMinTo(sword.rotation + 10, 20);
    }
    timerOver = false;
  } else if (mouse.presses() && timerOver && sLeft && !sRight) {
    startTime = millis();
    isCountingDown = true;
    swing = true;
    if (sword.rotation <= 0 && sword.rotation > -10) sword.rotateMinTo(sword.rotation - 90, 20);
    if (sword.rotation <= -10 && sword.rotation > -20) sword.rotateMinTo(sword.rotation - 80, 20);
    if (sword.rotation <= -20 && sword.rotation > -30) sword.rotateMinTo(sword.rotation - 70, 20);
    if (sword.rotation <= -30 && sword.rotation > -40) sword.rotateMinTo(sword.rotation - 65, 20);
    if (sword.rotation <= -40 && sword.rotation > -50) sword.rotateMinTo(sword.rotation - 60, 20);
    if (sword.rotation <= -50 && sword.rotation > -60) sword.rotateMinTo(sword.rotation - 55, 20);
    if (sword.rotation <= -60 && sword.rotation > -70) sword.rotateMinTo(sword.rotation - 50, 20);
    if (sword.rotation <= -70 && sword.rotation > -80) sword.rotateMinTo(sword.rotation - 40, 20);
    if (sword.rotation <= -80 && sword.rotation > -90) sword.rotateMinTo(sword.rotation - 30, 20);
    if (sword.rotation <= -90 && sword.rotation > -100) sword.rotateMinTo(sword.rotation - 20, 20);
    if (sword.rotation <= -100 && sword.rotation > -110) sword.rotateMinTo(sword.rotation - 10, 20);
    if (sword.rotation <= -110 && sword.rotation > -112) sword.rotateMinTo(sword.rotation - 10, 20);
    timerOver = false;
  } else if (mouse.presses() && timerOver && !sLeft && sRight) {
    startTime = millis();
    isCountingDown = true;
    swing = true;
    if (sword.rotation >= 0 && sword.rotation < 10) sword.rotateMinTo(sword.rotation + 90, 20);
    if (sword.rotation >= 10 && sword.rotation < 20) sword.rotateMinTo(sword.rotation + 80, 20);
    if (sword.rotation >= 20 && sword.rotation < 30) sword.rotateMinTo(sword.rotation + 70, 20);
    if (sword.rotation >= 30 && sword.rotation < 40) sword.rotateMinTo(sword.rotation + 65, 20);
    if (sword.rotation >= 40 && sword.rotation < 50) sword.rotateMinTo(sword.rotation + 60, 20);
    if (sword.rotation >= 50 && sword.rotation < 60) sword.rotateMinTo(sword.rotation + 55, 20);
    if (sword.rotation >= 60 && sword.rotation < 70) sword.rotateMinTo(sword.rotation + 50, 20);
    if (sword.rotation >= 70 && sword.rotation < 80) sword.rotateMinTo(sword.rotation + 40, 20);
    if (sword.rotation >= 80 && sword.rotation < 90) sword.rotateMinTo(sword.rotation + 30, 20);
    if (sword.rotation >= 90 && sword.rotation < 100) sword.rotateMinTo(sword.rotation + 20, 20);
    if (sword.rotation >= 100 && sword.rotation < 110) sword.rotateMinTo(sword.rotation + 10, 20);
    if (sword.rotation >= 110 && sword.rotation < 112) sword.rotateMinTo(sword.rotation + 10, 20);
    timerOver = false;
  }
  if (isCountingDown) {
    let elapsedTime = millis() - startTime;
    let remainingTime = countdownTime * 1000 - elapsedTime;

    if (remainingTime <= ((countdownTime / 2) + 20) && remainingTime >= ((countdownTime / 2) - 20)) {
      if (swordLeft) {
        sword.rotateMinTo(sword.rotation + 10, 10);
      } else {
        sword.rotateMinTo(sword.rotation - 10, 10);
      }
    }

    if (remainingTime <= 0) {
      remainingTime = 0;
      isCountingDown = false;
      swing = false;
      timerOver = true;
    }
  }
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function Movement() {
  if (movementActive) {
    if (kb.pressing('a')) {
      guy.vel.x = -3;
      idleHorizontal = false;
      GuyAnimation(1);
    } else if (kb.pressing('d')) {
      guy.vel.x = 3;
      idleHorizontal = false;
      GuyAnimation(2);
    } else {
      guy.vel.x = 0;
      idleHorizontal = true;
      GuyAnimation(5);
    }
    if (kb.pressing('s')) {
      guy.vel.y = 3;
      idleVertical = false;
      GuyAnimation(3);
    } else if (kb.pressing('w')) {
      guy.vel.y = -3;
      idleVertical = false;
      GuyAnimation(4);
    } else {
      guy.vel.y = 0;
      idleVertical = true;
      GuyAnimation(5);
    }
  }
}

function GuyAnimation(pMovement) {
  let movement = pMovement;
  if (movement == 1 && !idleHorizontal) {
    guy.ani = 'moveLeft';
    guy.layer = 3;
    sword.layer = 2;
    shield.layer = 4;
    sword.x = guy.x - 8;
    sword.y = guy.y + 1;
    rotationSensor.x = guy.x - 8;
    rotationSensor.y = guy.y + 1;
    shield.x = guy.x - 5;
    shield.y = guy.y + 2;
  }
  if (movement == 2 && !idleHorizontal) {
    guy.ani = 'moveRight';
    guy.layer = 3;
    sword.layer = 4;
    shield.layer = 2;
    sword.x = guy.x + 5;
    sword.y = guy.y + 1;
    rotationSensor.x = guy.x + 5;
    rotationSensor.y = guy.y + 1;
    shield.x = guy.x + 6;
    shield.y = guy.y + 2;
  }
  if (movement == 3 && !idleVertical) {
    guy.ani = 'moveDown';
    guy.layer = 2;
    sword.layer = 4;
    shield.layer = 3;
    sword.x = guy.x - 8;
    sword.y = guy.y + 1;
    rotationSensor.x = guy.x - 8;
    rotationSensor.y = guy.y + 1;
    shield.x = guy.x + 6;
    shield.y = guy.y + 2;
  }
  if (movement == 4 && !idleVertical) {
    guy.ani = 'moveUp';
    guy.layer = 4;
    sword.layer = 2;
    shield.layer = 3;
    sword.x = guy.x + 5;
    sword.y = guy.y + 1;
    rotationSensor.x = guy.x + 5;
    rotationSensor.y = guy.y + 1;
    shield.x = guy.x - 6;
    shield.y = guy.y + 2;
  }
  if (movement == 5 && idleVertical && idleHorizontal) {
    guy.ani = 'idle';
    guy.layer = 2;
    sword.layer = 3;
    shield.layer = 2;
    sword.x = guy.x - 8;
    sword.y = guy.y + 1;
    rotationSensor.x = guy.x - 8;
    rotationSensor.y = guy.y + 1;
    shield.x = guy.x + 6;
    shield.y = guy.y + 2;
  }
}

async function moveCamera(dirX = 0, dirY = 0, speed = 1) {
  dirX = Math.round(dirX);
  dirY = Math.round(dirY);
  dirX = Math.min(Math.max(dirX, -1), 1);
  dirY = Math.min(Math.max(dirY, -1), 1);
  if (!goingThroughDoor) {
    goingThroughDoor = true;
    if (dirX) {
      for (let i = 0; i < 480 / Math.abs(speed); i++) {
        camera.x = camera.x + speed * dirX;
        guy.x = guy.x + speed / 4 * dirX;
        await delay(0.5);
      }
    }
    if (dirY) {
      for (let i = 0; i < 384 / Math.abs(speed); i++) {
        camera.y = camera.y + speed * dirY;
        guy.y = guy.y + speed / 3 * dirY;
        await delay(0.5);
      }
    }
    goingThroughDoor = false;
  }
}

function exitDungeon() {
  window.open("game.html", "_self");
}