'use strict';
const elementSelect = document.getElementById("calcType");
const elementNum1 = document.getElementById("num1");
const elementNum2 = document.getElementById("num2");
const elementResult = document.getElementById("result");

// record event
elementSelect.addEventListener("change",update);
elementNum1.addEventListener("change",update);
elementNum2.addEventListener("change",update);

/**calculation result display */
//関数(update) create
function update(){
    //result
    const result = calculate(
        Number(elementNum1.value),//1st text
        Number(elementNum2.value),//2nd text
        elementSelect.value//select box
    );
    //display
    elementResult.innerHTML = result;
}

//関数(calculate) create
function calculate(num1,num2,calcType){
    let result;
    //calculation
    switch(calcType){
        case "type-add":
            result = num1 + num2;
        break;
        case "type-substract":
            result = num1 - num2;
            break;
        case "type-multiply":
            result = num1 * num2;
            break;
        case "type-divide":
            result = num1 / num2;
            break;
    }
    return result;
}