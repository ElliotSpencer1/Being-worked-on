let tileMap
let tileSize = 10;
let score = 0;
let player, walls,floor,shadows,goal,coin,pain,big,tiny,mini
 
function setup( ) {
createCanvas(windowWidth, windowHeight);
background(255);
walls = new Group( )
walls.color = "black"
walls.tile = '-'
walls.collider = 's'
walls.w = tileSize;
walls.h = tileSize;
walls.layer = 2;
 
coin = new Group();
coin.color = "yellow"
coin.tile = 'c'
coin.collider = 's'
//coin.image = '🪙';
coin.w = tileSize/2;
coin.h = tileSize/2;
coin.layer = 1;
 
pain = new Group();
pain.color = "red"
pain.tile = 'p'
pain.collider = 's'
pain.w = tileSize/2;
pain.h = tileSize/2;
pain.layer = 0;
 
tiny = new Group();
tiny.color = "red"
tiny.tile = 't'
tiny.collider = 's'
tiny.w = tileSize/4;
tiny.h = tileSize/4;
tiny.layer = 0;
 
mini = new Group();
mini.color = "red"
mini.tile = 'm'
mini.collider = 's'
mini.w = tileSize/6;
mini.h = tileSize/6;
mini.layer = 0;
 
big = new Group();
big.color = "red"
big.tile = 'b'
big.collider = 's'
big.w = tileSize;
big.h = tileSize;
big.layer = 0;
 
spawnpoint = new Group();
spawnpoint.color = "pink"
spawnpoint.tile = 'L'
spawnpoint.collider = 'none'
spawnpoint.w = tileSize;
spawnpoint.h = tileSize;
spawnpoint.layer = 0;
 
floor = new Group( )
floor.color = "darkgrey"
floor.collider = 'none'
floor. tile = 'f'
floor.w = tileSize;
floor.h = tileSize
floor.layer = 0;
 
shadows = new Group( )
shadows.color = "grey"
shadows.collider = 'none'
shadows.tile = 's'
shadows.w = tileSize;
shadows.h = tileSize
shadows.layer = 2;
 
goal = new Group( )
goal.collider = 'none'
goal.tile = 'g'
goal.w = tileSize;
goal.h = tileSize;
goal.layer = 1;
 
tileMap = new Tiles(
    [
      "                   bbbbbbbbbbbbbbbb                                                           ",
      "                   bttttttttttttttb  bttb                                                     ",
      "                   bttttttttttttttbbbbttb                                                     ",
      "                   bttbbbbbbbbbbttttttttb                                                     ",
      "                   bttb    bfffbttttttttb                                                     ",
      "                   bttb    bfbfbbbbbbbbbb-----------------------------------------------------",
      "                   bttbbbbbbfbffffffffpfffffffpfffffpfffffpfcffpfffpfffpfffpfffpfffpfffpff-",    
      "                   bttttttttfb--fffpfffffffpffffffpfffffpffffpffffpfffpfffpfffpfffpfffpfffp-",  
      "                   bttttttttfb--ff-----------------------------fpfffpfffpfffpfffpfffpfffpff-",
      "                   bbbbbbbbbbb-ff-------------ppppppcffffpcff-fffpfffpfffpfffpfffpfffpfffp-             bbbbbbbbbbb",
      "                              -ff-------------pffffpppppfpfpf-fpfffpfffpfffpfffpfffpfffpff--------------bmmmmbbfffbbb",
      "-------------------------------ff---bbbbppp--pffppfpfffffpfpf-fffpfffpfffpfffpfffpfffpfffp---bbbbbbbbbbbbmmmmmbfbfffb",
      "-Lfffffffff-ffffffffff-ffffffffff---bfffffffpffp-pfpfpppfffpfffpfffpfffpfffpfffpfffpfffpffffffffffffffffffmmmfffbbbfb",
      "-ffffffffff-fffffffffffffffffffff---bfbbpppfffp--pfpfp-pppfpf-fffpfffpfffpfffpfffpfffpfffp---bbbbbbbbbbbbmmmmmbbb bfb",
      "-fffffffffffffffffffffpffffffffff---bcb---pppp---pfffp-c-pcpc-fpfffpfffpfffpfffpfffpfffpff--------------bmmmmb",
      "-ffffffffffpfffffffffffffffffffff----------------------f------fffpfffpfffpfffpfffpfffpfffp-             bbbbbb",
      "-fffffffffffffffffffff-ffffffffffffftffffffffffffffftf-fff----fpfffpfffpfffpfffpfffpfffpff-",
      "-ffffffffff-ffffffffff-ffffffffffffftffffffffffffffftc---f----fffpfffpfffpfffpfffpfffpfffp-",
      "--------------------------------------------------ff-----f-----------ff--------------------",
      "                                                 -fffffpcffpppffcpfffff-                   ",
      "                                                 -ppffffppfffffppffffpp-                   ",
      "                                                 ---fffffpffpffpfffff---                   ",
      "                                                   ---ffffffpffffff---                     ",
      "                                                     ---------------"
    ], 50, 50, tileSize, tileSize)
 
    player = new Sprite(70,70, tileSize / 2, tileSize/2,'d')
    player.rotationLock = true;
    player.layer = 5;
 
    for(s of spawnpoint){
        player.x = s.x
        player.y = s.y
    }
}
// function setup(){
//  createCanvas(windowWidth, windowHeight);
//  background(255);
//  player = new Sprite(70,70, tileSize / 2, tileSize/2,'d')
//  player.rotationLock = true;
// }
 
function draw(){
    background(190)
    cameraControl()
    movement()
    textSize(20);
    text('Coins: ' + score, 50, 50);
 
 
    coindelete()
    paindelete()
    bigdelete()
    tinydelete()
    minidelete()
 
}
 
function paindelete(){
    for(p of pain){
        if(player.collides(p)){
            for(s of spawnpoint){
                player.x = s.x
                player.y = s.y
            }
       
    }
}
}
 
function tinydelete(){
    for(t of tiny){
        if(player.collides(t)){
            for(s of spawnpoint){
                player.x = s.x
                player.y = s.y
            }
       
    }
}
}
 
function minidelete(){
    for(m of mini){
        if(player.collides(m)){
            for(s of spawnpoint){
                player.x = s.x
                player.y = s.y
            }
       
    }
}
}
 
function bigdelete(){
    for(b of big){
        if(player.collides(b)){
            for(s of spawnpoint){
                player.x = s.x
                player.y = s.y
            }
       
    }
}
}
 
function coindelete(){
    for(c of coin){
        if(player.collides(c)){
            new floor.Sprite(c.x, c.y)
            floor.layer = 0;
            c.remove();
            score +=1;
            text('Coins ' + score, 50, 50);
        }
    }
}
function cameraControl(){
    camera.zoom = 7
    camera.x = player.x;
    camera.y = player.y
}
 
function movement (){
    if(mouse.pressed()){
        player.x = mouse.x;
        player.y = mouse.y;
    }
         
 
    if (kb.pressing('w')) {
        player.vel.y = -1
    }
    if (kb.pressing('s')) {
    player.vel.y = 1
    }
 
    if (kb.pressing('a' )) {
    player.vel.x = -1
    }
 
    if (kb.pressing('d')) {
    player.vel.x = 1
    }
 
    if((!kb.pressing('w')) && (!kb.pressing('s'))){
        player.vel.y = 0;
    }
 
    if((!kb.pressing('a')) && (!kb.pressing('d'))){
        player.vel.x = 0;
    }
 
}
 