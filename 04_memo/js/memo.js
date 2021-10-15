"use strict";
window,addEventListener("DOMContentLoaded",
    function(){
        //confirm use of local storage
        if(typeof localStorage === "undefined"){
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        }else{
            saveLocalStorage();    //2.LocalStorageへの保存
        }
    },false
);
//2.LocalStorageへの保存
function saveLocalStorage(){
    const save = document.getElementById("save");
    save.addEventListener("click",
        function(e){
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value; 
            //value input check
            if (key=="" || value==""){
                window.alert("Key,Memoはいずれも必須です。");
                return;
            }else{
                localStorage.setItem(key,value);
                let w_msg = "LocalStorageに" + key + value + "を保存しました";
                window.alert(w_msg);
                document.getElementById("textKey").value = ""; 
                document.getElementById("textMemo").value = ""; 
            }
        },false
    );
};