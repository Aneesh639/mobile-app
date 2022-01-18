"use strict";
let n ="";
let nBefore = "";
window.addEventListener("DOMContentLoaded",
    function(){
        $("header").textillate({
            loop: false, // ループのオンオフ
            minDisplayTime: 2000, // テキストが置き換えられるまでの表示時間
            initialDelay: 2000, // 遅延時間
            autoStart: true, // アニメーションを自動的にスタート
            in: { // フェードインのエフェクトの詳細設定
            effect: "fadeInLeftBig", // エフェクトの名前(animate.css参照)
            delayScale: 1.5, // 遅延時間の指数
            delay: 50, // 文字ごとの遅延時間
            sync: false, // trueはアニメーションをすべての文字に同時に適用
            shuffle: true // trueは文字を順番にではなく、ランダムに
            }   
        });
        // おみくじボタン(id="btn1") ボヤァと表示させる
        $(function(){
            ScrollReveal().reveal("#button1", { duration: 9000 });
        });

        setTimeout(
            function(){
            //pop up message
            let popMessage="いらっしゃい！おみくじ引いてって！";
            window.alert(popMessage);
            },
            "5000"
        );
    
    },false
);
//omikuji button
const button1 = document.getElementById("button1");
button1.addEventListener("click",
    function(){
        // let n = Math.floor(Math.random()*3);
        // switch(n){
            //  case 0:
            //     button1.textContent="Very Happy!!";
            //     button1.style.color="#FF0000";
            //     button1.style.fontSize="40px";
            //     break;
            //  case 1:
            //     button1.textContent="Happy!!";
            //     button1.style.color="#fff001";
            //     button1.style.fontSize="35px";
            //     break;
            //  case 2:
            //     button1.textContent="UnHappy...";
            //     button1.style.color="#261e1c";
            //     button1.style.fontSize="30px";
            //     break;
        // }
    
        const omikujiText = document.getElementById("omikujiText");
        // let resultText = ["大吉!!!!!","吉!!!!","中吉!!!","小吉!!","末吉!","凶。"];
        // let resultColor = ["#ff0000","#c71585","#ff1493","#ff69b4","#ff8c00","#1e90ff"];
        // let resultFontSize = ["55px","50px","45px","40px","35px","30px"];
        let resultText=["img/daikichi.png","img/chukichi.png","img/syokichi.png","img/suekichi.png","img/daikyo.png"]
        let resultMaxSpeed = [12,11,10,8,6,];
        let resultMaxSize = [30,27,25,20,15,];
        let resultImage = ["img/star.png","img/flower.png","img/rose.png","img/sakura_hanabira.png","img/snowflakes.png"];
        let resultSound = ["sound/omikuji_sound1.mp3","sound/omikuji_sound2.mp3","sound/omikuji_sound3.mp3","sound/omikuji_sound4.mp3","sound/omikuji_sound5.mp3"]
        // let n = Math.floor(Math.random() * resultText.length);
        while(n===nBefore){
            n = Math.floor(Math.random() * resultText.length);
        }
        nBefore = n;
        // omikujiText.textContent = resultText[n];
        // omikujiText.style.color = resultColor[n];
        // omikujiText.style.fontSize = resultFontSize[n];

        // omikuji text image
        omikujiTextImage.src = resultText[n];
        omikujiTextImage.classList.add("omikujiPaper");

        // animation ends together with class
        omikujiTextImage.addEventListener("animationend",
            function(){
                omikujiTextImage.classList.remove("omikujiPaper");
            },false
        );

        // snowfall stop
        $(document).snowfall("clear");
        
        // jQueryのsnowfall
        $(document).ready(function(){
            $(document).snowfall({
                maxSpeed : resultMaxSpeed[n], // 最大速度
                minSpeed : 1, // 最小速度
                maxSize : resultMaxSize[n], // 最大サイズ
                minSize : 1, // 最小サイズ
                image : resultImage[n]
            });
        });
        let music = new Audio(resultSound[n]);
        music.curentTime = 1;
        music.play();
    },false
);