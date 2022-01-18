"use strict";
window,addEventListener("DOMContentLoaded",
    function(){
        //confirm use of local storage
        if(typeof localStorage === "undefined"){
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        }else{
            viewStorage();  //display data from local storage to table
            saveLocalStorage();    //2.LocalStorageへの保存
            selectTable();  //selects table
            delLocalStorage(); // delets saved file
            allClearLocalStorage(); //clears all local storage
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
                let w_confirm = window.confirm("LocalStorageに"+"\n[" + key +" "+ value +"]\n"+ "を保存しますか？");
                if(w_confirm === true){
                    localStorage.setItem(key,value);
                    viewStorage();  //display data from local storage to table
                    let w_msg = "LocalStorageに"+ "\n[" + key +" "+ value +"]\n"+ "を保存しました";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = ""; 
                    document.getElementById("textMemo").value = ""; 
                }//version-up1 add
            }
        },false
    );
};

//3. LocalStorage delete
function delLocalStorage(){
    const del = document.getElementById("del");
    del.addEventListener("click",
        function(e){
            e.preventDefault();
            let w_sel="0"; //if selected one make to 1
            w_sel = selectCheckBox();
            if(w_sel==="1"){
                const key = document.getElementById("textKey").value;
                const value = document.getElementById("textMemo").value;
                let w_confirm = window.confirm("LocalStorage から"+ "\n["  + key +" "+ value +"]\n"+ "を削除(delete)しますか？");
                if(w_confirm === true){
                    localStorage.removeItem(key);
                    viewStorage();
                    let w_msg = "LocalStorage から"+ "\n["+ key +" "+ value +"]\n"+ "を削除(delete)しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = ""; 
                    document.getElementById("textMemo").value = "";
                }//version-up1 add
            }
        },false
    )
};

//4. local storage all delete
function allClearLocalStorage(){
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function(e){
            e.preventDefault();
            let w_confirm = confirm("LocalStorageのデータをすべて削除(all clear)します。\nよろしいですか？");
            //dialog box click OK to clear all
            if (w_confirm === true){
                localStorage.clear();
                viewStorage(); //display data from local storage to table
                let w_msg = "LocalStorage のデータからすべて削除(all clear)しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        },false
    );
};

//5. selecting data
function selectTable(){
    const select = document.getElementById("select");
    select.addEventListener("click",
        function(e){
            e.preventDefault();
            selectCheckBox();
        },false
    );
};
//selects data from table
function selectCheckBox(){
    let w_sel = "0"; //if selected 1
    let w_cnt = 0; //selected check box //version-up 2
    const chkbox1 = document.getElementsByName("chkbox1");//version-up 2 add
    const table1 = document.getElementById("table1");//version-up 2 change  radio1==>chkbox1
    let w_textKey = "";  // work version-up2 add
    let w_textMemo = ""; // work version-up2 add
    for(let i=0; i < chkbox1.length; i++){
        if(chkbox1[i].checked){
            if(w_cnt===0){
                w_textKey = table1.rows[i+1].cells[1].firstChild.data; 
                w_textMemo = table1.rows[i+1].cells[2].firstChild.data;
                //return w_sel ="1"; // v2 del
            }
            w_cnt++; //selected table count
        }
    }

    document.getElementById("textKey").value=w_textKey;
    document.getElementById("textMemo").value=w_textMemo;
    if(w_cnt===1){
        return w_sel="1";
    }else{
        window.alert("一つ選択（select）してください。");
    }
};

//display data from local storage to table
function viewStorage(){
    const list = document.getElementById("list");
    while(list.rows[0])list.deleteRow(0);

    //local storage information
    for(let i=0; i<localStorage.length; i++){
        let w_key = localStorage.key(i);
        //display local storage key
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }
    //jQueryのplugin tablesorterを使ってテーブルのソート
    //sortList: 引数１。。。最初からソートしておく列を指定、引数２．。。０昇順、１降順
    $("#table1").tablesorter({       //tablesort add
        sortList:[[1, 0]]            //tablesort add
    });                             //tablesort add

    $("#table1").trigger("update"); //tablesort add
};