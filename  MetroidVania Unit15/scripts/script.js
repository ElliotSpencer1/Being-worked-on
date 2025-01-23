let player;

// hud
let upperbar;

// defining inner map variables
let tilesize;
let backdrop, floor, stone, mudpile, enemy, boss, door, bossdoor, origin, walls, lootroom, otherfloor;

// defining map variables
let mapA, mapB, mapC, mapD;

// defining

function maps(){
}

function setup(){
    createCanvas(windowWidth, windowHeight);

    maps();

    player = new Sprite(0,0, tilesize--, tilesize--, "d");
    player.rotationLock = "true";
    player.color = "green";

} 

function draw(){
    background(0);

    movement();
}
