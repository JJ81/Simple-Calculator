'use strict';
// 선생님 하신것
// var itemList = [] ; 

// /**
//  * 유저가 입력한 값을 추출하는 기능
//  */
// function extractUserValue() {
// }

// function validateUserInput() {
// }

// /**
//  * 데이터 구조를 만들어서 리스트에 넣고 리턴한다. 
//  */
// function makeDataList() {
// }

// /**
//  * 유니크 아이디 생성
//  */
// function createUniqueId() {
// }

// /**
//  * HTML을 그려넣는다. 
//  */
// function drawList() {

// }

// /**
//  * 고유 아이디값을 통해서 배열의 순서를 리턴해준다. 
//  */
// function searchListByUniqueId() {

// }




//복습1-------------------------------------------------------------

// var itemList = [] ; 

// /**
//  * 사용자가 입력한 값을 추출하는 함수
//  */
// function exractUserValue() {

// }

// /**
//  * 입력한 값의 유효성을 검사하는 함수
//  */
// function validateUserInput() {

// }

// /**
//  * 데이터 구조를 만들어서 리스트에 넣고 리턴한다. 
//  */
// function makeDataList() {

// }


// /**
//  * data list의 고유한 ID를 생성한다. 
//  */
// function createUniqueId() {

// }

// /**
//  * 데이타를 HTML에 그려 넣는다. 
//  */

// function drawList() {

// }

// /**
//  * 고유 아이디값을 통해 순서를 리턴한다. 
//  */
// function searchListByUniqueId() {

// }




// 복습2----------------------------------------------------------------------------- 

var itemList = [] ; 
var input_item =  $(".txt_item") ;
var input_price = $(".txt_price") ; 
var order_table = $(".item_table") ;   
var btn_add_item = $(".btn_add_item"); 

btn_add_item.bind("click", userInputHandler) ; 
/** 
 * 사용자가 입력한 값을 추출해야 한다. 
 */

 function extractUserValue() {
    var 
    menu = input_item.val(),
    price = input_price.val(); 
    
    console.log(menu);
    if(validateUserInput(menu,price)===false) {
        return; 
    }

    return {                            //객체이기 때문에 ; 이 들어가면 안 된다. 
        menu : menu, 
        price : parseInt(price, 10), 
        amount : 1                      // 임시로(dummy) amount : 1 을 입력해 준다. 
    };                                 // {} brace 바깥에 ; 써야 한다. 

}

/**
 * 입력한 값의 유효성을 체크한다. 
 */

 function validateUserInput(menu,price) {
    if(menu==="" || price==="") {
        alert ("입력값을 확인해 주세요") ; 
        return false ; 
    }

    if(isNaN(price)) {                    //isNaN = is Not a Number 라는 뜻의 내장함수
        alert("가격은 숫자만 입력 가능합니다.") ; 
        return false ; 
    }
    return true ; 
}

/**
 * 추출한 값으로 data list를 만들어 리턴한다.  
 */
 function makeDataList() {
    var tmp = extractUserValue(); 
    if(tmp===false) {
        return; 
    } 

    var dataSettings = {
        id : createUniqueId(5), 
        menu : tmp.menu,
        price : tmp.price,
        amount : tmp.amount 
    } ; 
    itemList.push(dataSettings); 
    return dataSettings ; 
 }
    



/**
 * 고유아이디 생성
 */
function createUniqueId(len){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


/**
 * HTML에 값을 그려준다. append per a list
 */
 function drawList(data) {
    var html="" ; 
    html += "<tr data-id='"+data.id+"'>";
    html += "<td><input type='checkbox' class='check_item'></td>"; 
    html += "<td class='menu'>"+data.menu+"</td>"; 
    html += "<td class='price' data-price='"+data.price+"'>￦"+commaNumber(data.price)+"</td>"
    html +="</tr>" ; 
    order_table.append(html) ; 
    return html ; 
 }

/**
 * 고유 아이디값을 통해 순서를 리턴한다. 
 */

 function searchListByUniqueId() {

 }

 /**
  * 콤마 삽입
  */
 function commaNumber(val){
	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 유저의 입력창 초기화
 */
function resetUserInput(){
    input_item.val("") ; 
    input_price.val("") ; 
    input_item.focus() ; 
}

/**
 * 유저의 이벤트 핸들러
 */
function userInputHandler(e){
    e.preventDefault() ; 

    var data = makeDataList() ; 
    if(data===false){
        return ; 
    }
    drawList(data) ; 
    setTimeout(function(){
        resetUserInput() ; 
    }, 300);
    return data;  
}

function getWholeDataList() {
    return itemList ; 
}