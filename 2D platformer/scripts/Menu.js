let value;
if(localStorage.getItem("value")){
    value = localStorage.getItem("value");
    value = parseInt(value);
}
else{
    value = 100;
}

let Ngame, Lgame, settings, Main, firstpass, running, plus, minus, current, back, backdrop;

Main = true;
firstpass = false;
running = true;

function setup(){
    createCanvas(windowWidth, windowHeight);

    Ngame = new Sprite(windowWidth/2, windowHeight/2 - windowHeight/3, windowWidth/2, windowHeight/10, "s");
    Ngame.text = "New Game";
    Ngame.textSize = 40;
    Ngame.color = "#3D5A80";

    Lgame = new Sprite(windowWidth/2, windowHeight/2, windowWidth/2, windowHeight/10, "s");
    Lgame.text = "Load Game";
    Lgame.textSize = 40;
    Lgame.color = "#3D5A80";

    settings = new Sprite(windowWidth/2, windowHeight/2 + windowHeight/3, windowWidth/2, windowHeight/10, "s");
    settings.text = "Settings";
    settings.textSize = 40;
    settings.color = "#3D5A80";

    plus = new Sprite(windowWidth/2 - 75, windowHeight/2 + windowHeight/3, 50, 50, "n");
    plus.text = "+";
    plus.textSize = 20;
    plus.color = "#98C1D9";
    plus.visible = false;

    minus = new Sprite(windowWidth/2 + 75, windowHeight/2 + windowHeight/3, 50, 50, "n");
    minus.text = "-";
    minus.textSize = 20;
    minus.color = "#98C1D9";
    minus.visible = false;

    current = new Sprite(windowWidth/2, windowHeight/2 + windowHeight/3, 75, 50, "n");
    current.text = value + "%";
    current.textSize = 20;
    current.color = "#98C1D9";
    current.visible = false;

    backdrop = new Sprite(windowWidth/2, windowHeight/2, windowWidth/2, windowHeight/2, "n");
    backdrop.color = "#3D5A80";
    backdrop.visible = false;

    back = new Sprite(windowWidth/2 - backdrop.w/2, windowHeight/2 - backdrop.h/2, 75, 50, "n");
    back.color = "98C1D9";
    back.text = "<-"
    back.visible = false;

    firstpass = true;

}



function draw(){
    background("#293241");
    if(running){
        if(firstpass){
            if(Main){
                mainhandler();
            }
            else{
                settingshandler();
            }
        }
        if(!firstpass){
            switchinghandler();
        }
    }

}

function mainhandler(){
    if(Ngame.mouse.pressed()){
        running = false;
        window.location.href = "lvl1.html";
    }
    if(Lgame.mouse.pressed()){
        // store local storage data e.g. localStorage.setItem("gameloaded") so that save files are existent
        running = false;
        window.location.href = "lvl1.html";
    }
    if(settings.mouse.pressed()){
        Main = false;
    }

}

function settingshandler(){
    if(!firstpass){
        Ngame.visible = false;
        Ngame.collider = "n";

        Lgame.visible = false;
        Lgame.collider = "n";

        settings.visible = false;
        settings.collider = "n";

        plus.visible = true;
        plus.collider = "s";

        minus.visible = true;
        minus.collider = "s";
    }
}

function switchinghandler(){

}