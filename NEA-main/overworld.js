const tileSize = 18
let movementActive = true
let walls, wall, floors, tileMap, grass, boundary, doors, trapDoorTL, trapDoorTR, trapDoorBL, trapDoorBR
let wallImg, grassImg, boundaryImg, trapDoorOpenTLImg, trapDoorOpenTRImg,trapDoorOpenBLImg, shieldImg, trapDoorOpenBRImg, trapDoorClosedTLImg, trapDoorClosedTRImg, trapDoorClosedBLImg, trapDoorClosedBRImg
let countdownTime = 0.15; // Countdown time in seconds
let startTime;
let isCountingDown = false;
let swing = false
let swordLeft = false
let timerOver = true
let idleHorizontal = true
let idleVertical = true
let swordBoundary = 111
let sLeft = false
let sRight = false
let enemies, move, attacking;
let enemyspawnbrick, firstpass;

function preload() {

  grassImg = loadImage('images/zeldaGrass.png')
  sandImg = loadImage('images/sandImg.png')
  waterImg = loadImage('images/water2.png')
  wallUpperImg = loadImage('images/wallUpperImg.png')
  wallLowerImg = loadImage('images/wallLowerImg.png')
  wallMidImg = loadImage('images/wallMidImg.png')
  boundaryImg = loadImage('images/ZeldaWall.png')
  trapDoorClosedTLImg = loadImage('images/ClosedTrapDoorTL.png')
  trapDoorClosedTRImg = loadImage('images/ClosedTrapDoorTR.png')
  trapDoorClosedBLImg = loadImage('images/ClosedTrapDoorBL.png')
  trapDoorClosedBRImg = loadImage('images/ClosedTrapDoorBR.png')
  trapDoorOpenTLImg = loadImage('images/OpenTrapDoorTL.png')
  trapDoorOpenTRImg = loadImage('images/OpenTrapDoorTR.png')
  trapDoorOpenBLImg = loadImage('images/OpenTrapDoorBL.png')
  trapDoorOpenBRImg = loadImage('images/OpenTrapDoorBR.png')
  stairsImg = loadImage('images/stairsPic2.png')
  swordImg = loadImage('images/sword2.png')
  spriteImg = loadImage('images/spriteSheet.png')
  shieldImg = loadImage('images/sheild.png')
  //shieldImg2 = loadImage('sheild.png')
  //shieldImg3 = loadImage('sheild.png')

}

firstpass = false;

function guySetup(){
  guy = new Sprite(350,350,58,58,'d')
  guy.rotationLock = true
  guy.layer = 2
  guy.spriteSheet = spriteImg
  guy.anis.frameDelay = 4
  guy.addAnis({
    moveDown: {row:0, frames:4},
    moveUp: {row:1, frames:4},
    moveLeft: {row:2, frames:4},
    moveRight: {row:3, frames:4},
    idle:{row:0, frames:1}
  })
  guy.scale = 0.7

  guy.cooldown = false;
  guy.health = 200;
}

function swordSetup(){
  startTime = millis(); // Record the start time
  sword = new Sprite(342,351,220,1240,'d')
  rotationSensor = new Sprite(342,351,8,30,'d')
  sword.img = swordImg
  sword.scale = 0.025
  sword.layer = 3
  rotationSensor.scale = 0.025
  sword.offset.y = -12
  rotationSensor.offset.y = (-((50/350)*100)) + 3
  sword.img.offset.y = -450
  rotationSensor.visible = false

  //sword.debug = true
  //rotationSensor.debug = true
  //allSprites.debug = true
}

function shieldSetup(){
  shield = new Sprite(358,351,17.4,21.8,'d')
  shield.rotationLock = true
  shield.layer = 2
  shield.img = shieldImg
  shield.scale = 0.025/2.1
}

function Map_Setup() {

  enemyspawnbrick = new Group();
  enemyspawnbrick.collider = "none";
  enemyspawnbrick.w = tileSize;
  enemyspawnbrick.h = tileSize;
  enemyspawnbrick.tile = "F";

  walls = new Group();
  walls.collider = 's'
  walls.w = tileSize
  walls.h = tileSize

  boundary = new walls.Group()
  boundary.tile = 't'
  boundary.img = boundaryImg

  // wall = new walls.Group()
  // wall.tile = 'w'
  // wall.img = wallImg


  wallLower = new walls.Group()
  wallLower.tile = 'z'
  //wallLower.img = wallLowerImg
  wallLower.color = 'gray'

  floors = new Group();
  floors.collider = 'none'
  floors.w = tileSize
  floors.h = tileSize

  grass = new floors.Group()
  grass.tile = 'g'
  //grass.img = grassImg
  grass.color = 'green'

  stairsWall = new floors.Group()
  stairsWall.tile = 'Z'
  //stasirsWallall.img = 
  stairsWall.color = 'gray'

  wallMid = new floors.Group()
  wallMid.tile = 'b'
  //wallMid.img = wallMidImg
  wallMid.color = 'black'

  water = new floors.Group()
  water.tile = 'W'
  //water.img = waterImg
  water.color = 'blue'

  sand = new floors.Group()
  sand.tile = 'S'
  //sand.img = sandImg
  sand.color = 'yellow'

  wallMidtunnel = new floors.Group()
  wallMidtunnel.tile = 'B'
  //wallMidtunnel.img = wallMidImg
  wallMidtunnel.color = 'black'

  wallLowertunnel = new floors.Group()
  wallLowertunnel.tile = 'q'
  //wallLowertunnel.img = wallMidImg
  wallLowertunnel.color = 'gray'

  trapDoorTL = new floors.Group()
  trapDoorTL.tile = 'L'
  trapDoorTL.img = trapDoorClosedTLImg
  trapDoorTL.scale = 0.4

  trapDoorTR = new floors.Group()
  trapDoorTR.tile = 'R'
  trapDoorTR.img = trapDoorClosedTRImg
  trapDoorTR.scale = 0.4

  trapDoorBL = new floors.Group()
  trapDoorBL.tile = 'l'
  trapDoorBL.img = trapDoorClosedBLImg
  trapDoorBL.scale = 0.4

  trapDoorBR = new floors.Group()
  trapDoorBR.tile = 'r'
  trapDoorBR.img = trapDoorClosedBRImg
  trapDoorBR.scale = 0.4

  doors = new Group();
  doors.collider = 's'
  doors.w = tileSize
  doors.h = tileSize

  stairs = new floors.Group()
  stairs.tile = 'n'
  //stairs.img = stairsImg
  stairs.color = '#686767'
}

function Camera_Setup() {
  if ((guy.x > 936 && guy.x < 1220) && (guy.y > 900 && guy.y < 1058)){
    if (camera.x > 1062 && camera.x < 1094){
      camera.x = 1080
    }
    if (camera.y > 980){
      camera.y -=2.6
    }
    if(camera.zoom < 1.3){
      camera.zoom +=0.01
    }
  }
  else{
    if (guy.y > 1080 && camera.y != guy.y){
      camera.y +=2.6
    }
    if(camera.zoom > 1){
      camera.zoom -=0.01
    }
    camera.x = guy.x
    camera.y = guy.y 
  }
}

function setup() {
  createCanvas(480, 384, 'pixelated');
  Map_Setup()

  tileMap1 = new Tiles(
    ["gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggFgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggFgggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggFgggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggFgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggFgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggFggggggggggggggggggggggggggggggggggggggggggggggggggggggggggFggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "ggggggggggggggggggggz...zggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "zzzzzzzzzzzzzzzzzzzzz...zzzzzzzzzzzzzzzzzzzzzzzzzzzgggggggggggggggggggggggggggggggggggggggggggFggggg",
    "bbbbbbbbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbzggggggggggggggggggggggggggggggggggggggggggggggggg",
    "bbbbbbbbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbzzzzzzzzzzzzzzzzzzzzzzzggggggggggggggggggggggggggg",
    "bbbbbbbbbbbbbbbbbbbbz...zbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbzggggggggggggggggggggggggggg",
    "zzzzzzzzzzzzzzzzzzzzzgggzzzzzzzzzzzzzzzzzzzzzzzbbbbbbbbbbbbbbbbbbbbbbbbbzggggggggggggggggggggggggggg",
    "zzzzzzzzzzzzzzzzzzzzzgggzzzzzzzzzzzzzzzzzzzzzzzbbbbbbbbbbbbbbbbbbbbbbbbbzggggggggggggggggggggggggggg",
    "ggggggggggggggggggggggggggggggggggggggggggggggzbbbzzzzzzzzzzzzzzzzzzzbbbzggggggggggggggggggggggggggg",
    "ggggggggggggggggggggggggggggggggggggggggggggggzbbbzzzzzzzzzzzzzzzzzzzbbbzggggggggggggggggggggggggggg",
    "ggggggggggggggggggggggggggggggggSSggggggggggggzbbbzgggggggggggggggggzbbbzggggggggggggggggggggggggggg",
    "gggFgggggggggggggggggggggggggggSWWWSggggggggggzbbbzgggggggggggggggggzbbbzggggggggggggggggggggggggggg",
    "gggggggggggggggggggFgggggggggggWWWWWWWSSSgggggzbbbzgggggggggggggggggzbbbzggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggWWWWWWWWWWWSgggzbbbzggggggggLRgggggggzbbbzggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggSWWWWWWWWWWSSggzbbbzgggggggglrgggggggzbbbzggggggggggggggggggggggggggg",
    "ggggggggggggggggggggggggggggggSWWWWWWWWWWWWSggzbbbzgggggggggggggggggzbbbzggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggWWWWWWWWWWWWSggzbbbzgggggggggggggggggzbbbzggggggggggggggggggggggggggg",
    "ggggggggggggggggggggggggggggggggWWWWWWWWWWWSggzbbbzgggggggggggggggggzbbbzggggggggggggggggggggggggggg",
    "ggggggggggFgggggggggggggggggggggWWWWWWWWWWSSggzbbbzgggggggggggggggggzbbbzggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggSWWWWWWWWSgggzbbbzggggggz...zggggggzbbbzggzzzzggggggggggggggggggggg",
    "ggggggggggggggggggggggggggggggggggSSSSWWWSggggzbbbzzzzzzzz...zzzzzzzzbbbzzzzbbnggzzzzzzzzzzzzzzzzzzz",
    "gggggggggggggggggggggggggggggFggggggSSSSSgggggzbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    "ggggggggggggggggggggggggggggggggggggggggggggggzbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    "gggggggggggggggz...zggggggggggggggggggggggggggzbbbbbbbbbbz...zbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    "zzzzzzzzzzzzzzzz...zzzzzzzzzzzzzzzzzzzzzzzzzzzzbbbzzzzzzzzSSSzzzzzzzzzzzzzzzzzzznZZZzzzzzzzzzzzzzzzz",
    "bbbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbzzzzzzzzSSSzzzzzzzzzzzzzzzzzzzznZZzzzzzzzzzzzzzzzz",
    "bbbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbzSSSSSSSSSSSSSSSSSSSSSSSSSSSSzzznSSSSSSSSSSSSSSSSS",
    "bbbbbbbbbbbbbbbz...zbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbzSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "zzzzzzzzzzzzzzzzSSSzzzzzzzznZZZzzzzzzzzzzzzzzzzzzzzSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "zzzzzzzzzzzzzzzzSSSzzzzzzzzznZZzzzzzzzzzzzzzzzzzzzzSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSzzznSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSWWWWWWWWWWWWWWW",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSWWWWWWWWWWWWWWWWWWWWWWWW",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "SSWWWWWWWWWWWWSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWSSSSSSSSSSSSSSSSSSSSSSWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWSSSSSSSSSSSSSSWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  ],16, 16, tileSize, tileSize)

  guySetup()
  swordSetup()
  shieldSetup()
  tileMap1.layer = 1

  sword.overlaps(guy)
  rotationSensor.overlaps(guy)
  shield.overlaps(guy)
  sword.overlaps(rotationSensor)
  shield.overlaps(rotationSensor)
  sword.overlaps(shield)


  tileMap2 = new Tiles(
    ["....................................................................................................",
      "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    ".....................qqq............................................................................",
    ".....................qqq............................................................................",
    ".....................BBB............................................................................",
    ".....................BBB............................................................................",
    ".....................qqq............................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "..........................................................qqq.......................................",
    "..........................................................qqq.......................................",
    "..........................................................BBB.......................................",
    "..........................................................BBB.......................................",
    "................qqq.......................................qqq.......................................",
    "................qqq.................................................................................",
    "................BBB.................................................................................",
    "................BBB.................................................................................",
    "................qqq.................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
  ],
  16, 16, tileSize, tileSize)
  tileMap2.layer = 4

  // fresh code


  // enemies can be spawned by adding an "x" into the tilemap

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

  new enemies.Sprite(359,  358, 20, 20);

  setInterval(() => {
    if(move){
      move = false;
    }
    else{
      move = true;
    }
  }, 5000)


  // end of fresh code
}

function draw() {
  clear()
  Camera_Setup()
  swordDraw()
  Movement()
  if (guy.overlaps(trapDoorBL) || guy.overlaps(trapDoorBR) || guy.overlaps(trapDoorTL) || guy.overlaps(trapDoorTR)){
    enterDungeon()
  }
  enemypathfinding();
}

function enemypathfinding(){
  if(!firstpass){
    let count = 0;
    for(b of enemyspawnbrick){
      if(count < enemyspawnbrick.length){
        new enemies.Sprite(b.x, b.y);
        count++
      }
      if(count > enemyspawnbrick.length - 1){
        firstpass = true;
      }
    }
  }

  if(enemies){
    for(e of enemies){
      e.vel.x = 0;
      e.vel.y = 0;
      e.rotationLock = true;

      e.startX = e.pos.x;
      e.moveCount = 0;

      if((move)){
        e.moveTo(e.startX + 20);
      }
      if((!move)){
        e.moveTo(e.startX - 20);
      }

      let distance = dist(guy.x, guy.y, e.x, e.y);

      if(distance <= 100){
        e.moveTo(guy.x, guy.y)
      }

      if(sword.collides(e)){
        e.health -= 25;
        e.cooldown = true;
        console.log("bean")
        setTimeout(() => {
          e.cooldown = false;
        }, 25);
      }

      if(e.health == 75){
        e.color = "Yellow";
      }
      if(e.health == 50){
        e.color = "Orange";
      }
      if(e.health == 25){
        e.color = "Red";
      }
      if(e.health == 0){
        // add any drops from the enemy here e.g. 250 silver (this can be done by using new coins.Sprite(e.x, e.y));
        e.color = "black";
        e.attacking = true;
        e.vel.x = 0;
        e.vel.y = 0;
      }
      if(e.health == 0){
        e.remove();
      }

      if((e.colliding(guy)) && !guy.cooldown){
        guy.health -= 25;
        guy.cooldown = true;
        setTimeout(() => {
          guy.cooldown = false;
        }, 25)
      }


      
    }
  }
}

function swordDraw(){
  swordSwing()  // Function for swinging the sword 
  rotationSensor.rotateMinTo(mouse, 10, 90);  // Locks rotationSensor to orientate to the mouse 
  swordRotation()  // Function for moving the sword 
  swordMirroring()  // Function for turning the sword image left and right 
}

function swordRotation(){
  if((rotationSensor.rotation >= swordBoundary || rotationSensor.rotation <= -swordBoundary) && swing == false){
    if(rotationSensor.rotation >= swordBoundary){
      sword.rotation = swordBoundary
    }
    else if(rotationSensor.rotation <= -swordBoundary){
      sword.rotation = -swordBoundary
    }
  }
  else if (rotationSensor.rotation < swordBoundary || rotationSensor.rotation > -swordBoundary){
      if (swing == false) sword.rotation = rotationSensor.rotation
  }
}


function swordMirroring(){
  if(rotationSensor.rotation >=0 && swing == false && swordLeft == true){
    sword.mirror.x = false
    swordLeft = false
  }
  else if(rotationSensor.rotation <0 && swing == false && swordLeft == false){
    sword.mirror.x = true
    swordLeft = true
  }
  else{
    if(swordLeft == true){
      sword.mirror.x = true
    }
    else{
      sword.mirror.x = false
    }
  }
}


function swordSwing(){
  if(mouse.presses() && timerOver == true && sLeft == false && sRight == false){
    startTime = millis();
    isCountingDown = true;
    swing = true
    if(swordLeft == true){
      if(sword.rotation <=0 && sword.rotation >-10) sword.rotateMinTo(sword.rotation - 90, 20);
      if(sword.rotation <=-10 && sword.rotation >-20) sword.rotateMinTo(sword.rotation - 80, 20);
      if(sword.rotation <=-20 && sword.rotation >-30) sword.rotateMinTo(sword.rotation - 70, 20);
      if(sword.rotation <=-30 && sword.rotation >-40) sword.rotateMinTo(sword.rotation - 65, 20);
      if(sword.rotation <=-40 && sword.rotation >-50) sword.rotateMinTo(sword.rotation - 60, 20);
      if(sword.rotation <=-50 && sword.rotation >-60) sword.rotateMinTo(sword.rotation - 55, 20);
      if(sword.rotation <=-60 && sword.rotation >-70) sword.rotateMinTo(sword.rotation - 50, 20);
      if(sword.rotation <=-70 && sword.rotation >-80) sword.rotateMinTo(sword.rotation - 40, 20);
      if(sword.rotation <=-80 && sword.rotation >-90) sword.rotateMinTo(sword.rotation - 30, 20);
      if(sword.rotation <=-90 && sword.rotation >-100) sword.rotateMinTo(sword.rotation - 20, 20);
      if(sword.rotation <=-100 && sword.rotation >-110) sword.rotateMinTo(sword.rotation - 10, 20);
      if(sword.rotation <=-110) sword.rotateMinTo(sword.rotation - 10, 20);
    }
    else{
      if(sword.rotation >=0 && sword.rotation <10) sword.rotateMinTo(sword.rotation + 90, 20);
      if(sword.rotation >=10 && sword.rotation <20) sword.rotateMinTo(sword.rotation + 80, 20);
      if(sword.rotation >=20 && sword.rotation <30) sword.rotateMinTo(sword.rotation + 70, 20);
      if(sword.rotation >=30 && sword.rotation <40) sword.rotateMinTo(sword.rotation + 65, 20);
      if(sword.rotation >=40 && sword.rotation <50) sword.rotateMinTo(sword.rotation + 60, 20);
      if(sword.rotation >=50 && sword.rotation <60) sword.rotateMinTo(sword.rotation + 55, 20);
      if(sword.rotation >=60 && sword.rotation <70) sword.rotateMinTo(sword.rotation + 50, 20);
      if(sword.rotation >=70 && sword.rotation <80) sword.rotateMinTo(sword.rotation + 40, 20);
      if(sword.rotation >=80 && sword.rotation <90) sword.rotateMinTo(sword.rotation + 30, 20);
      if(sword.rotation >=90 && sword.rotation <100) sword.rotateMinTo(sword.rotation + 20, 20);
      if(sword.rotation >=100 && sword.rotation <110) sword.rotateMinTo(sword.rotation + 10, 20);
      if(sword.rotation >=110) sword.rotateMinTo(sword.rotation + 10, 20);
    }
    timerOver = false
  }
  else if(mouse.presses() && timerOver == true && sLeft == true && sRight == false){
    startTime = millis();
    isCountingDown = true;
    swing = true
    if(sword.rotation <=0 && sword.rotation >-10) sword.rotateMinTo(sword.rotation - 90, 20);
    if(sword.rotation <=-10 && sword.rotation >-20) sword.rotateMinTo(sword.rotation - 80, 20);
    if(sword.rotation <=-20 && sword.rotation >-30) sword.rotateMinTo(sword.rotation - 70, 20);
    if(sword.rotation <=-30 && sword.rotation >-40) sword.rotateMinTo(sword.rotation - 65, 20);
    if(sword.rotation <=-40 && sword.rotation >-50) sword.rotateMinTo(sword.rotation - 60, 20);
    if(sword.rotation <=-50 && sword.rotation >-60) sword.rotateMinTo(sword.rotation - 55, 20);
    if(sword.rotation <=-60 && sword.rotation >-70) sword.rotateMinTo(sword.rotation - 50, 20);
    if(sword.rotation <=-70 && sword.rotation >-80) sword.rotateMinTo(sword.rotation - 40, 20);
    if(sword.rotation <=-80 && sword.rotation >-90) sword.rotateMinTo(sword.rotation - 30, 20);
    if(sword.rotation <=-90 && sword.rotation >-100) sword.rotateMinTo(sword.rotation - 20, 20);
    if(sword.rotation <=-100 && sword.rotation >-110) sword.rotateMinTo(sword.rotation - 10, 20);
    if(sword.rotation <=-110 && sword.rotation >-112) sword.rotateMinTo(sword.rotation - 10, 20);
    timerOver = false
  }
  else if(mouse.presses() && timerOver == true && sLeft == false && sRight == true){
    startTime = millis();
    isCountingDown = true;
    swing = true
    if(sword.rotation >=0 && sword.rotation <10) sword.rotateMinTo(sword.rotation + 90, 20);
    if(sword.rotation >=10 && sword.rotation <20) sword.rotateMinTo(sword.rotation + 80, 20);
    if(sword.rotation >=20 && sword.rotation <30) sword.rotateMinTo(sword.rotation + 70, 20);
    if(sword.rotation >=30 && sword.rotation <40) sword.rotateMinTo(sword.rotation + 65, 20);
    if(sword.rotation >=40 && sword.rotation <50) sword.rotateMinTo(sword.rotation + 60, 20);
    if(sword.rotation >=50 && sword.rotation <60) sword.rotateMinTo(sword.rotation + 55, 20);
    if(sword.rotation >=60 && sword.rotation <70) sword.rotateMinTo(sword.rotation + 50, 20);
    if(sword.rotation >=70 && sword.rotation <80) sword.rotateMinTo(sword.rotation + 40, 20);
    if(sword.rotation >=80 && sword.rotation <90) sword.rotateMinTo(sword.rotation + 30, 20);
    if(sword.rotation >=90 && sword.rotation <100) sword.rotateMinTo(sword.rotation + 20, 20);
    if(sword.rotation >=100 && sword.rotation <110) sword.rotateMinTo(sword.rotation + 10, 20);
    if(sword.rotation >=110 && sword.rotation <112) sword.rotateMinTo(sword.rotation + 10, 20);
    timerOver = false
  }
  if (isCountingDown) {
    let elapsedTime = millis() - startTime;
    let remainingTime = countdownTime * 1000 - elapsedTime; // Convert to milliseconds
    
    if (remainingTime <= ((countdownTime/2)+20) && remainingTime >= ((countdownTime/2)-20)) {
      if(swordLeft == true){
        sword.rotateMinTo(sword.rotation + 10, 10);
      }
      else{
        sword.rotateMinTo(sword.rotation - 10, 10);
      }
    }

    if (remainingTime <= 0) {
      remainingTime = 0;
      isCountingDown = false; // Stop the countdown when it reaches zero
      swing = false
      timerOver = true
    }
    //console.log(remainingTime)
  } 
}

function Movement() {
  if (movementActive == true){
    if (kb.pressing('a')) {
      guy.vel.x = -3
      //sword.vel.x = -3
      //rotationSensor.vel.x = -3
      idleHorizontal = false
      GuyAnimation(1)
    }
    else if (kb.pressing('d')) {
      guy.vel.x = 3
      //sword.vel.x = 3
      //rotationSensor.vel.x = 3
      idleHorizontal = false
      GuyAnimation(2)
    }

    else {
      guy.vel.x = 0
      //sword.vel.x = 0
      //rotationSensor.vel.x = 0
      idleHorizontal = true
      GuyAnimation(5)
    }
    if (kb.pressing('s')) {
      guy.vel.y = 3
      //sword.vel.y = 3
      //rotationSensor.vel.y = 3
      idleVertical = false
      GuyAnimation(3)
    }
    else if (kb.pressing('w')) {
      guy.vel.y = -3
      //sword.vel.y = -3
      //rotationSensor.vel.y = -3
      idleVertical = false
      GuyAnimation(4)
    }
    else {
      guy.vel.y = 0
      //sword.vel.y = 0
      //rotationSensor.vel.y = 0
      idleVertical = true
      GuyAnimation(5)
    }
  }
}

function GuyAnimation(pMovement){
  let movement = pMovement 
  if (movement == 1 && idleHorizontal == false){
    guy.ani = 'moveLeft'
    goingLeft = true
    goingRight = false
    guy.layer = 3
    sword.layer = 2
    shield.layer = 2
    sword.x = (guy.x - 8 )  // Locks sword onto guy's x position
    sword.y = (guy.y + 1)  // Locks sword onto guy's y position
    rotationSensor.x = (guy.x - 8 )  // Locks rotationSensor onto guy's x position
    rotationSensor.y = (guy.y + 1)  // Locks rotationSensor onto guy's y position
    shield.x = (guy.x + 6)
    shield.y = (guy.y + 2)
  }
  if (movement == 2 && idleHorizontal == false){
    guy.ani = 'moveRight'
    goingLeft = false
    goingRight = true
    guy.layer = 2
    sword.layer = 3
    shield.layer = 3
    sword.x = (guy.x + 5 )  // Locks sword onto guy's x position
    sword.y = (guy.y + 1)  // Locks sword onto guy's y position
    rotationSensor.x = (guy.x + 5 )  // Locks rotationSensor onto guy's x position
    rotationSensor.y = (guy.y + 1)  // Locks rotationSensor onto guy's y position
    shield.x = (guy.x - 6 )
    shield.y = (guy.y + 2)
  }
  if (movement == 3 && idleVertical == false){
    guy.ani = 'moveDown'
    goingLeft = false
    goingRight = false
    guy.layer = 2
    sword.layer = 3
    shield.layer = 2
    sword.x = (guy.x - 8 )  // Locks sword onto guy's x position
    sword.y = (guy.y + 1)  // Locks sword onto guy's y position
    rotationSensor.x = (guy.x - 8 )  // Locks rotationSensor onto guy's x position
    rotationSensor.y = (guy.y + 1)  // Locks rotationSensor onto guy's y position
    shield.x = (guy.x + 6 )
    shield.y = (guy.y + 2)
  }
  if (movement == 4 && idleVertical == false){
    guy.ani = 'moveUp'
    goingLeft = false
    goingRight = false
    guy.layer = 3
    sword.layer = 2
    shield.layer = 2
    sword.x = (guy.x + 5 )  // Locks sword onto guy's x position
    sword.y = (guy.y + 1)  // Locks sword onto guy's y position
    rotationSensor.x = (guy.x + 5 )  // Locks rotationSensor onto guy's x position
    rotationSensor.y = (guy.y + 1)  // Locks rotationSensor onto guy's y position
    shield.x = (guy.x - 6 )
    shield.y = (guy.y + 2)
  }
  if (movement == 5 && idleVertical == true && idleHorizontal == true){
    guy.ani = 'idle'
    goingLeft = false
    goingRight = false
    guy.layer = 2
    sword.layer = 3
    shield.layer = 2
    sword.x = (guy.x - 8 )  // Locks sword onto guy's x position
    sword.y = (guy.y + 1)  // Locks sword onto guy's y position
    rotationSensor.x = (guy.x - 8 )  // Locks rotationSensor onto guy's x position
    rotationSensor.y = (guy.y + 1)  // Locks rotationSensor onto guy's y position
    shield.x = (guy.x + 6 )
    shield.y = (guy.y + 2)
  }
}

function enterDungeon() {
  movementActive = false
  openTrapDoor()
  window.open("dungeons.html", "_self");
  movementActive = true
  closeTrapDoor()
}

function openTrapDoor(){
  trapDoorTL.image = trapDoorOpenTLImg
  trapDoorTR.image = trapDoorOpenTRImg
  trapDoorBL.image = trapDoorOpenBLImg
  trapDoorBR.image = trapDoorOpenBRImg
}

function closeTrapDoor(){
  trapDoorTL.img = trapDoorClosedTLImg
  trapDoorTR.img = trapDoorClosedTRImg
  trapDoorBL.img = trapDoorClosedBLImg
  trapDoorBR.img = trapDoorClosedBRImg
}