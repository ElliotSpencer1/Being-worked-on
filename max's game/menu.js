let start, sigmamax, sigmamax2;

function setup(){
    createCanvas(windowWidth, windowHeight);

    start = new Sprite(windowWidth/2, windowHeight/2 - 150, windowWidth/6, windowHeight/8, "s");
    start.color = "grey";
    start.text = "Sigma Max";
    start.textSize = 32;
    start.textColor = "white";

    sigmamax = new Sprite(windowWidth/2, windowHeight/2, windowWidth/6, windowHeight/8, "s");
    sigmamax.color = "grey";
    sigmamax.text = "Sigma Max";
    sigmamax.textSize = 32;

    sigmamax2 = new Sprite(windowWidth/2, windowHeight/2 + 150, windowWidth/6, windowHeight/8, "s");
    sigmamax2.color = "grey";
    sigmamax2.text = "Sigma Max";
    sigmamax2.textSize = 32;

}

function draw(){
    background("black");
    interactions();

}

function interactions(){
    if(start.mouse.hovering()){
        start.color = "white";
        start.textColor = "black";
        mouse.cursor = "pointer";
    }
    if(sigmamax.mouse.hovering()){
        sigmamax.color = "white";
        sigmamax.textColor = "black";
        mouse.cursor = "pointer";
    }
    if(sigmamax2.mouse.hovering()){
        sigmamax2.color = "white";
        sigmamax2.textColor = "black";
        mouse.cursor = "pointer";
    }

    if(!start.mouse.hovering()){
        start.color = "grey";
        start.textColor = "white";
    }
    if(!sigmamax.mouse.hovering()){
        sigmamax.color = "grey";
        sigmamax.textColor = "white";
    }
    if(!sigmamax2.mouse.hovering()){
        sigmamax2.color = "grey";
        sigmamax2.textColor = "white";
    }
    if((!sigmamax2.mouse.hovering()) && (!sigmamax.mouse.hovering()) && (!start.mouse.hovering())){
        mouse.cursor = "default";
    }

    if(start.mouse.pressed()){
        window.location.href = "game.html";
    }
    if(sigmamax.mouse.pressed()){
        window.location.href = "";
    }
    if(sigmamax2.mouse.pressed()){
        window.location.href = "";
    }
}