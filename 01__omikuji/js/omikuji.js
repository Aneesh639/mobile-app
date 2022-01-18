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

        let resultText = ["大吉!!!!!","吉!!!!","中吉!!!","小吉!!","末吉!","凶。"];
        let resultColor = ["#ff0000","#c71585","#ff1493","#ff69b4","#ff8c00","#1e90ff"];
        let resultFontSize = ["55px","50px","45px","40px","35px","30px"];
        let resultMaxSpeed = [12,11,10,8,6,4];
        let resultMaxSize = [30,27,25,20,15,11];
        let resultImage = ["img/star.png","img/sakura_hanabira.png","img/leaf.png","img/sakura_hanabira.png","img/snowflakes.png","img/star.png"];
        //let n = Math.floor(Math.random() * resultText.length);
        while(n===nBefore){
            n = Math.floor(Math.random() * resultText.length);
        }
        nBefore = n;
        button1.textContent = resultText[n];
        button1.style.color = resultColor[n];
        button1.style.fontSize = resultFontSize[n];

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
    },false
);