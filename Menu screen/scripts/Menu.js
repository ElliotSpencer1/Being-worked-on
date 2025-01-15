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

    backdrop = new Sprite(windowWidth/2, windowHeight/2, windowWidth*0.8, windowHeight*0.8, "n");
    backdrop.color = "#3D5A80";
    backdrop.visible = false;

    plus = new Sprite(windowWidth/2 - 100, windowHeight/2 + windowHeight/3, 50, 50, "n");
    plus.text = "+";
    plus.textSize = 20;
    plus.color = "#98C1D9";
    plus.visible = false;

    minus = new Sprite(windowWidth/2 + 100, windowHeight/2 + windowHeight/3, 50, 50, "n");
    minus.text = "-";
    minus.textSize = 20;
    minus.color = "#98C1D9";
    minus.visible = false;

    current = new Sprite(windowWidth/2, windowHeight/2 + windowHeight/3, 125, 50, "n");
    current.text = value + "%";
    current.textSize = 20;
    current.color = "#98C1D9";
    current.visible = false;

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
    if(Ngame.mouse.hovering()){
        Ngame.color = "#E0FBFC";
        mouse.cursor = "pointer";
    }
    if(!Ngame.mouse.hovering()){
        Ngame.color = "#3D5A80";
        mouse.cursor = "default";
    }

    if(Lgame.mouse.hovering()){
        Lgame.color = "#E0FBFC";
        mouse.cursor = "pointer";
    }
    if(!Lgame.mouse.hovering()){
        Lgame.color = "#3D5A80";
        mouse.cursor = "default";
    }

    if(settings.mouse.hovering()){
        settings.color = "#E0FBFC";
        mouse.cursor = "pointer";
    }
    if(!settings.mouse.hovering()){
        settings.color = "#3D5A80";
        mouse.cursor = "default";
    }

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
        firstpass = false;
    }

}

function settingshandler(){
    if(firstpass){
        if(plus.mouse.hovering()){
            plus.color = "#E0FBFC";
            mouse.cursor = "pointer";
        }
        if(!plus.mouse.hovering()){
            plus.color = "#98C1D9";
            mouse.cursor = "default";
        }

        if(minus.mouse.hovering()){
            minus.color = "#E0FBFC";
            mouse.cursor = "pointer";
        }
        if(!minus.mouse.hovering()){
            minus.color = "#98C1D9";
            mouse.cursor = "default";
        }

        if(back.mouse.hovering()){
            back.color = "#E0FBFC";
            mouse.cursor = "pointer";
        }
        if(!back.mouse.hovering()){
            back.color = "#98C1D9";
            mouse.cursor = "default";
        }

        current.text = "Music " + value + "%";

        if(plus.mouse.pressed()){
            value += 20;
        }
        if(minus.mouse.pressed()){
            value -= 20;
        }
        if(back.mouse.pressed()){
            localStorage.setItem("value", value)

            Main = true;
            firstpass = false;
        }




    }
}

function switchinghandler(){
    if(Main){
        mouse.cursor = "default";
        
        Ngame.visible = true;
        Ngame.collider = "s";

        Lgame.visible = true;
        Lgame.collider = "s";

        settings.visible = true;
        settings.collider = "s";

        plus.visible = false;
        plus.collider = "n";

        minus.visible = false;
        minus.collider = "n";

        current.visible = false;
        current.collider = "s";

        back.visible = false;
        back.collider = "s";
        
        backdrop.visible = false;
        backdrop.collider = "n";

        firstpass = true;
    }
    if(!Main){
        mouse.cursor = "default";

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

        current.visible = true;
        current.collider = "s";

        back.visible = true;
        back.collider = "s";
        
        backdrop.visible = true;
        backdrop.collider = "s";

        firstpass = true;
    }

}