"use strict"

//if flag = pen-flag = penguin turn ,bear-flag = bear turn
let flag = "pen-flag";

//data count
let counter = 9;

//class = square
const squares = document.getElementsByClassName("square");
//change to array
const squaresArray = Array.from(squares);
//console.log(squaresArray);

//squaresの要素（ようそ）を取得（しゅとく）する
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

//NewGameボタン取得（しゅとく）
const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");

//Win or Lose Judgement Line
const line1 = JudgLine(squaresArray, ["a_1","a_2","a_3"]);
const line2 = JudgLine(squaresArray, ["b_1","b_2","b_3"]);
const line3 = JudgLine(squaresArray, ["c_1","c_2","c_3"]);
const line4 = JudgLine(squaresArray, ["a_1","b_1","c_1"]);
const line5 = JudgLine(squaresArray, ["a_2","b_2","c_2"]);
const line6 = JudgLine(squaresArray, ["a_3","b_3","c_3"]);
const line7 = JudgLine(squaresArray, ["a_1","b_2","c_3"]);
const line8 = JudgLine(squaresArray, ["a_3","b_2","c_1"]);

const lineArray = [line1 ,line2 ,line3 ,line4,line5,line6,line7,line8];

let winningLine = null;

//message
const msgtxt1 = '<p class="image"><img src="img/penguins.jpg" width=61px height=61px></p><p class="text">Penguin Attack!(your turn)</p>';
const msgtxt2 = '<p class="image"><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text">Whitebear Attack!(computer turn)</p>';
const msgtxt3 = '<p class="image"><img src="img/penguins.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInRight">Penguin Win!!</p>';
const msgtxt4 = '<p class="image"><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInLeft">Whitebear Win!!</p>';
const msgtxt5 = '<p class="image"><img src="img/penguins.jpg" width=61px height=61px><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text animate__bounceIn">Draw!!</p>';

//sound
let gameSound =["sound/click_sound1.mp3","sound/click_sound2.mp3","sound/penwin_sound.mp3","sound/bearwin_sound.mp3","sound/draw_sound.mp3"];

//page loading time code

window.addEventListener("DOMContentLoaded",
    function(){
        //message(first penguin turn)
        setMessage("pen-turn");
        //squareがクリック可能かを判断するクラスを追加
        squaresArray.forEach(function(square){
            square.classList.add("js-clickable");
        });
    },false
);

//Win or lose Judgement Line 配列化
//use of filter in java
function JudgLine(targetArray, idArray){
    return targetArray.filter(function(e){
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}
//square をクリックするときにイベント発火（はっか）
//display bear or penguin in square ,make unable to click if image displayed ,win or lose judgement calling
squaresArray.forEach(function(square){
    square.addEventListener("click",()=>{
        let gameOverFlg = isSelect(square); //game status
        //if not game over auto turn
        if(gameOverFlg === "0"){
            const squaresBox = document.getElementById("squaresBox");
            squaresBox.classList.add("js-unclickable"); //squares box cannot be clicked
            setTimeout(
                function(){
                    bearTurn();
                },
                "1500"
            );
        }
    });
});

// clicked square display penguin or bear

function isSelect(selectSquare){
    let gameOverFlg = "0";
    if(flag==="pen-flag"){
        //click sound
        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play(); //replay

        selectSquare.classList.add("js-pen-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");

        //penguin win
        if(isWinner("penguins")){
            setMessage("pen-win"); //display win message
            gameOver("penguins");
            return gameOverFlg = "1";
        }
        setMessage("bear-turn");
        flag = "bear-flag";
    }else{
        //click sound
        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play(); //play

        selectSquare.classList.add("js-bear-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");

        //bear win
        if(isWinner("bear")){
            setMessage("bear-win"); //display win message
            gameOver("bear");
            return gameOverFlg = "1";
        }
        setMessage("pen-turn");
        flag = "pen-flag";
    }
    // タン数 count - 1
    counter--;
    // ifタン=0 draw
    if (counter === 0){
        setMessage("draw");
        gameOver("draw");
        return gameOverFlg = "1";
    }

    return gameOverFlg = "0";
}
//win lose judgement
//message change
function isWinner(symbol){
    //some if 1 condition meets returns true
    const result = lineArray.some(function(line){
        //every if every condition meets returns true
        const subResult = line.every(function(square){
            if(symbol === "penguins"){
                return square.classList.contains("js-pen-checked");
            }
            if(symbol === "bear"){
                return square.classList.contains("js-bear-checked");
            }
        });
        // true condition goes in winningline
        if(subResult){winningLine = line}
        return subResult;
    });
    return result;
}

function setMessage(id){
    switch(id){
        case "pen-turn":
            document.getElementById("msgtext").innerHTML = msgtxt1;
        break;
        case "bear-turn":
            document.getElementById("msgtext").innerHTML = msgtxt2;
        break;
        case "pen-win":
            document.getElementById("msgtext").innerHTML = msgtxt3;
        break;
        case "bear-win":
            document.getElementById("msgtext").innerHTML = msgtxt4;
        break;
        case "draw":
            document.getElementById("msgtext").innerHTML = msgtxt5;
        break;
        default:
            document.getElementById("msgtext").innerHTML = msgtxt1;
    }
}

//game end 
function gameOver(status){
    //gameover sound
    let w_sound //wk sound type
    switch(status){
        case "penguins":
            w_sound = gameSound[2];
            break;
        case "bear":
            w_sound = gameSound[3];
            break;
        case "draw":
            w_sound = gameSound[4];
            break;
    }

    let music = new Audio(w_sound);
    music.currentTime = 0;
    music.play(); //play

    //all square unclickable
    // squaresArray.forEach(function(square){
    //     square.classList.add("js-unclickable");
    // });
    squaresBox.classList.add("js-unclickable");

    //display new game button display
    newgamebtn_display.classList.remove("js-hidden");

    //win efffect
    if(status==="penguins"){
        //winner line penguins highlight
        if(winningLine){
            winningLine.forEach(function(square){
                square.classList.add("js-pen_highLight");
            });
        }
        //if penguin win snow colour is pink
        $(document).snowfall({
            flakeColor : "rgb(255,240,245)", //snow color
            maxSpeed : 3, 
            minSpeed : 1,
            maxSize : 20,
            minSize : 10,
            round :true //snow shape
        });
    }else if(status ==="bear"){
        //winning line bear highlight
        if (winningLine){
            winningLine.forEach(function(square){
               square.classList.add("js-bear_highLight");
            });
        }
        //if whitebear win snow color is blue
        $(document).snowfall({
            flakeColor : "rgb(175,238,238)", //snow color
            maxSpeed : 3, 
            minSpeed : 1,
            maxSize : 20,
            minSize : 10,
            round :true //snow shape
        });
    }
}

//new game button click new game start

newgamebtn.addEventListener("click",()=>{
    flag = "pen-flag";

    counter = 9;

    winningLine = null;

    squaresArray.forEach(function(square){
        square.classList.remove("js-pen-checked");
        square.classList.remove("js-bear-checked");
        square.classList.remove("js-unclickable");
        square.classList.remove("js-pen_highLight");
        square.classList.remove("js-bear_highLight");
        square.classList.add("js-clickable"); //squares clickable class add
    });

    squaresBox.classList.remove("js-unclickable");

    setMessage("pen-turn");

    newgamebtn_display.classList.add("js-hidden");

    //snowfall stop
    $(document).snowfall("clear");
});

function bearTurn(){
    let bearTurnEnd = "0";
    let gameOverFlg = "0";

    while(bearTurnEnd === "0"){
        //bearのリーチ行検索(attack)
        bearTurnEnd = isReach("bear");
        if(bearTurnEnd === "1"){ //マクのリーチ行あり。。このー手で終わり
            gameOverFlg = "1";
            break;  //while end
        }
        //penguin のリーチ行検索(defense)
        bearTurnEnd = isReach("penguins");
        if (bearTurnEnd === "1"){
            break; //while end
        }
        //when not clicked random clickable area select
        const bearSquare = squaresArray.filter(function(square){
            return square.classList.contains("js-clickable");
        });
        
        let n = Math.floor(Math.random() * bearSquare.length);
        gameOverFlg = isSelect(bearSquare[n]);
        break; // while end
    }
    //if not game over
    if (gameOverFlg === "0"){
        squaresBox.classList.remove("js-unclickable");  //squares box clickable
    }
}

//リーチ行を探す
function isReach(status){
    let bearTurnEnd = "0";  ///bear turn

    lineArray.some(function(line){
        let bearCheckCnt = 0;  //bear Check number
        let penCheckCnt = 0;  //pen Check number

        line.forEach(function(square){
            if(square.classList.contains("js-bear-checked")){
                bearCheckCnt++;
            }
            if(square.classList.contains("js-pen-checked")){
                penCheckCnt++;
            }
        });

        //bearのリーチ行検索時にbearのリーチ行あり
        if(status === "bear" && bearCheckCnt === 2 && penCheckCnt === 0){
            bearTurnEnd = "1";  //bearのリーチ行あり
        }
        //penguinのリーチ行検索時に、penguinのリーチ行あり
        if(status === "penguins" && bearCheckCnt === 0 && penCheckCnt === 2){
            bearTurnEnd = "1";  //penguinのリーチ行あり
        }
        //if both are at reach select empty place
        if(bearTurnEnd === "1"){
           line.some(function(square){
               if(square.classList.contains("js-clickable")){
                   isSelect(square);
                   return true; //loop end 340
               }
           })
           return true; //loop end 317
        }
    });
    return bearTurnEnd;
}