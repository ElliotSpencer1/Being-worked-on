let newGameButton, loadGameButton, settingsButton, beansettings, plus, minus, current, value, back;

if(localStorage.getItem("soundval") != null){
    value = localStorage.getItem("soundval");
    value = parseInt(value);
    console.log("true")
}
else{
    value = 1;
}

function preload() {

    backgroundImg = loadImage('images/backgroundImg11.png')
  
}

function setup() {
    createCanvas(windowWidth, windowHeight, 'pixelated');
    // createCanvas(480, 384);
    background(backgroundImg)

    newGameButton = new Sprite(windowWidth/2, windowHeight/2 - windowHeight/8, windowWidth/6, windowHeight/10, "s");
    newGameButton.text = "New Game!";
    newGameButton.color = "blue";
    newGameButton.textSize = "30";

    loadGameButton = new Sprite(windowWidth/2, windowHeight/2, windowWidth/6, windowHeight/10, "s");
    loadGameButton.text = "Load Game!";
    loadGameButton.color = "blue";
    loadGameButton.textSize = "30";

    settingsButton = new Sprite(windowWidth/2, windowHeight/2 + windowHeight/8, windowWidth/6, windowHeight/10, "s");
    settingsButton.text = "Settings!";
    settingsButton.color = "blue";
    settingsButton.textSize = "30";

}

function draw() {
    background(backgroundImg)
    if(newGameButton && loadGameButton && settingsButton){
        if(newGameButton.mouse.hovering()){
            mouse.cursor = "pointer";
            newGameButton.textColor = "white"
            newGameButton.textSize = "50";
        }
        if(newGameButton.mouse.pressed()){
            newGame();
            mouse.cursor = "default";
        }

        if(loadGameButton.mouse.hovering()){
            mouse.cursor = "pointer";
            loadGameButton.textColor = "white"
            loadGameButton.textSize = "50";
        }
        if(loadGameButton.mouse.pressed()){
            loadGame();
            mouse.cursor = "default";
        }

        if(settingsButton.mouse.hovering()){
            mouse.cursor = "pointer";
            settingsButton.textColor = "white"
            settingsButton.textSize = "50";
        }
        if((!settingsButton.mouse.hovering()) && (!loadGameButton.mouse.hovering()) && (!newGameButton.mouse.hovering())){
            mouse.cursor = "default";
            settingsButton.textColor = "yellow";
            settingsButton.textSize = "30";
            mouse.cursor = "default";
            loadGameButton.textColor = "yellow";
            loadGameButton.textSize = "30";
            mouse.cursor = "default";
            newGameButton.textColor = "yellow";
            newGameButton.textSize = "30";
        }
        if(settingsButton.mouse.pressed()){
            settings();
            mouse.cursor = "default";
        }
    }
    if(beansettings){
        current.text = ((value.toFixed(1)) * 100) + "%";
        current.text = Math.trunc(parseInt(current.text), 0) + "%";
        if(plus.mouse.hovering()){
            plus.color = "#444";
            mouse.cursor = "pointer";
        }
        if(plus.mouse.pressed()){
            if(value < 2){
                value += 0.1;
                console.log("up")
            }
            else{
                setTimeout(() => {
                    plus.textColor = "red";
                    setTimeout(() => {
                        plus.textColor = "white";
                        setTimeout(() => {
                            plus.textColor = "red";
                            setTimeout(() => {
                                plus.textColor = "white";
                                setTimeout(() => {
                                    plus.textColor = "red";
                                    setTimeout(() => {
                                        plus.textColor = "white";
                                        setTimeout(() => {
                                            plus.textColor = "red";
                                            setTimeout(() => {
                                                plus.textColor = "white";
                                                setTimeout(() => {
                                                    plus.textColor = "red";
                                                    setTimeout(() => {
                                                        plus.textColor = "white";
                                                        setTimeout(() => {
                                                            plus.textColor = "red";
                                                            setTimeout(() => {
                                                                plus.textColor = "white";
                                                            },200)
                                                        },200)
                                                    },200)
                                                },200)
                                            },200)
                                        },200)
                                    },200)
                                },200)
                            },200)
                        },200)
                    },200)
                },200)
            }
        }

        if(minus.mouse.hovering()){
            minus.color = "#444";
            mouse.cursor = "pointer";
        }
        if(minus.mouse.pressed()){
            if(value > 0.1){
                value -= 0.1;
            }
            else{
                setTimeout(() => {
                    minus.textColor = "red";
                    setTimeout(() => {
                        minus.textColor = "white";
                        setTimeout(() => {
                            minus.textColor = "red";
                            setTimeout(() => {
                                minus.textColor = "white";
                                setTimeout(() => {
                                    minus.textColor = "red";
                                    setTimeout(() => {
                                        minus.textColor = "white";
                                        setTimeout(() => {
                                            minus.textColor = "red";
                                            setTimeout(() => {
                                                minus.textColor = "white";
                                                setTimeout(() => {
                                                    minus.textColor = "red";
                                                    setTimeout(() => {
                                                        minus.textColor = "white";
                                                        setTimeout(() => {
                                                            minus.textColor = "red";
                                                            setTimeout(() => {
                                                                minus.textColor = "white";
                                                            }, 200)
                                                        }, 200)
                                                    }, 200)
                                                }, 200)
                                            }, 200)
                                        }, 200)
                                    }, 200)
                                }, 200)
                            }, 200)
                        }, 200)
                    }, 200)
                }, 200)
            }
        }

        if((!plus.mouse.hovering()) && (!minus.mouse.hovering)){
            plus.color = "#333";
            minus.color = "#333";
            mouse.cursor = "default";
        }

        if(back.mouse.hovering()){
            back.textColor = "#8b0000";
            mouse.cursor = "pointer";
        }
        if(!back.mouse.hovering()){
            back.textColor = "white";
            mouse.cursor = "default";
        }

        if(back.mouse.pressed()){
            beansettings.remove();
            current.remove();
            current.visible = false;
            beansettings.visible = false;
            console.log("done4")
            try{
                plus.remove();
                minus.remove();
                console.log("done3")
            }
            catch(error){
                console.log("error:", error)
                console.log("done2")
            }
            back.remove();
            console.log("done1")

            newGameButton = new Sprite(windowWidth/2, windowHeight/2 - windowHeight/8, windowWidth/6, windowHeight/10, "s");
            newGameButton.text = "New Game!";
            newGameButton.color = "blue";
            newGameButton.textSize = "30";
        
            loadGameButton = new Sprite(windowWidth/2, windowHeight/2, windowWidth/6, windowHeight/10, "s");
            loadGameButton.text = "Load Game!";
            loadGameButton.color = "blue";
            loadGameButton.textSize = "30";
        
            settingsButton = new Sprite(windowWidth/2, windowHeight/2 + windowHeight/8, windowWidth/6, windowHeight/10, "s");
            settingsButton.text = "Settings!";
            settingsButton.color = "blue";
            settingsButton.textSize = "30";
            
            localStorage.setItem("soundval", value);
            console.log(localStorage.getItem("soundval"));
        }
    }
}


function newGame(){
    window.open("game.html", "_self")
}
function loadGame(){
    window.open("game.html", "_self")
}

function settings(){
    newGameButton.remove();
    loadGameButton.remove();
    settingsButton.remove();

    beansettings = new Sprite(windowWidth/2, windowHeight/2, windowHeight/2, windowHeight/2, "s");
    beansettings.color = "#333";

    current = new Sprite(windowWidth/2, windowHeight/2, beansettings.w/12, beansettings.h/12, "s");
    current.text = value;
    current.color = "gray";
    current.textSize = "18";
    current.textColor = "white";

    back = new Sprite(windowWidth/2, beansettings.y - beansettings.h/2.5, windowWidth/6, windowHeight/50, "s");
    back.text = "back";
    back.textColor = "white";
    back.color = "#444";

    try{
        plus = new Sprite(windowWidth/2 - windowWidth/30*2, windowHeight/2, windowWidth/35, windowHeight/35, "s");
        plus.textSize = "30";
        plus.text = "+";
        plus.textColor = "white";
        plus.color = "#333";
        console.log("plus");

        minus = new Sprite(windowWidth/2 + windowWidth/30*2, windowHeight/2, windowWidth/35, windowHeight/35, "s");
        minus.textSize = "30";
        minus.text = "-";
        minus.color = "#333";
        minus.textColor = "white";
        console.log("minus");
    }
    catch(error){
        console.log("error: ", error);
    }
}