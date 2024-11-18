let count = 0;
let answer = false;
let score = 0;

let a1 = document.getElementById("answer1").innerText;
let a2 = document.getElementById("answer2").innerText;
let a3 = document.getElementById("answer3").innerText;
let a4 = document.getElementById("answer4").innerText;

setInterval(() => {
    if(answer){
        score++
        count++
        newquestion();
        answer = false;
    }
}, 5)

function startRevision() {
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('title').innerText = 'Your Question Here';
    document.getElementById('questionContainer').classList.remove('hidden');

    document.getElementById("title").innerText = "What is a Holder of information?";
}



function newquestion(){
    if(count == 1){
        a1 = "Something random";
        a2 = "something"
        a3 = "something more random";
        a4 = "answer";
    }
}

function A1(){
    if(count = 0){
        answer = true;     
    }
    if(count = 1){
        answer = false;
    }
}

function A2(){
    if(count = 0){
        answer = false;
    }
    if(count = 1){
        answer = false;
    }
}

function A3(){
    if(count = 0){
        answer = false;
    }
    if(count = 1){
        answer = false;
    }
}

function A4(){
    if(count = 0){
        answer = false;
    }
    if(count = 1){
        answer = true;
    }
}