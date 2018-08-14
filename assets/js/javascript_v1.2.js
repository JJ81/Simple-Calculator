'use strict';

var input_item = $('.txt_item');
var input_price = $('.txt_price');
var order_table =  $('.item_table');
var btn_add_item = $('.btn_add_item');
var btn_delete_item=$('.js-btn-delete');
var itemList = [];

btn_add_item.bind('click', userInputHandler);

/**
 * 유저가 입력한 값을 추출하는 기능
 */
function extractUserValue(){
	var
		name=input_item.val(),
		price=input_price.val();

	console.log(name);

	if(!validateUserInput(name, price)){
		return;
	}

	return {
		name : name,
		price : parseInt(price, 10),
		amount: 1
	};
}

/**
 * 유저가 입력한 값에 대해서 유효한지 검사를 진행한다.
 */
function validateUserInput(name, price){
	if(name === '' || price === ''){
		alert('입력값을 확인해주세요.');
		return false;
	}

	if(isNaN(price)){
		alert('가격은 숫자만 입력가능합니다.');
		return false;
	}

	return true;
}

/**
 * 데이터 구조를 만들어서 리스트에 넣고 리턴한다.
 */
function makeDataList(){
		var tmp = extractUserValue();

		if(!tmp){
			return;
		}

		var dataSettings = {
			id : createUniqueId(5),
			name: tmp.name,
			price: tmp.price,
			amount: tmp.amount,
			is_checked : false
		};

		// 데이터를 저장소에 추가한다.
		itemList.push(dataSettings);

		return dataSettings;
}

/**
 * 고유 아이디 생성
 * @param len 자릿수
 * @returns {string}
 */
function createUniqueId(len){
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < len; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

/**
 * HTML을 그려 넣는다. append data per a list
 */
function drawList(data){
	if(data === null){
		return;
	}

	var html = '';
	html += '<tr data-id="'+data.id+'">';
	html += '<td><input type="checkbox" class="check_item" data-id="'+data.id+'" onchange="checkHandler(this);" /></td>';
	html += '<td class="name">'+data.name+'</td>';
	html += '<td class="price" data-price="'+data.price+'">₩' + commaNumber(data.price) + '</td>';
	html += '<td class="amount">'+data.amount+'</td>';
	html += '</tr>';
	order_table.find('tbody').append(html);

	return html;
}

/**
 * 고유 아이디값을 통해서 배열의 순서를 리턴해준다.
 */
function searchListByUniqueId(target){
	var uid=$(target).attr('data-id');
	console.log(uid);

	for(var i=0,size=itemList.length;i<size;i++){
		if(itemList[i] === null){
			continue;
		}

		if(itemList[i]['id'] === uid){
			if(itemList[i]['is_checked']){
				itemList[i]['is_checked']=false;
			}else{
				itemList[i]['is_checked']=true;
			}

			return i;
		}
	}
	return -1;
}

/**
 * 체크박스 선택시
 * @param id
 */
function checkHandler(id){
	searchListByUniqueId(id);
	displaySelectedCount();
}

/**
 * 숫자 사이에 콤마를 붙여준다.
 * @param val
 * @returns {string}
 */
function commaNumber(val){
	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 유저의 입력창을 초기화 한다.
 */
function resetUserInput(){
	input_item.val('');
	input_price.val('');
	input_item.focus();
}

/**
 * 유저의 이벤트 핸들러
 */
function userInputHandler(e){
	e.preventDefault();

	var data = makeDataList();

	if(!data){
		return;
	}

	drawList(data);

	setTimeout(function () {
		resetUserInput();
		displayPriceAmount();
	}, 300);


	return data;
}


function getWholeDataList(){
	return itemList;
}



// 자동 가격 필드 데이터 검증
input_price.bind('keydown', checkNumberValue);
input_price.bind('keyup', checkNumberValue);

/**
 * 금액값을 처리
 */
function checkNumberValue(){
	var target = $(this);

	if(target.val() === ''){
		target.val('');
		return;
	}

	if(target.val().split('')[0] === '0'){
		target.val('');
		return;
	}

	if(target.val().length >= 8){
		alert('입력하신 금액이 너무 높습니다.');
		target.val('');
		return;
	}
}

// 선택한 아이템을 삭제
btn_delete_item.bind('click', function (){
	var checked_list = [];

	// 선택된 리스트를 수집
	for(var i=0,size=itemList.length;i<size;i++){
		if(itemList[i] === null){
			continue;
		}
		if(itemList[i]['is_checked']){
			checked_list.push(i);
		}
	}

	// length가 0이라면 삭제할 리스트를 선택하세요.
	if(checked_list.length === 0){
		alert('삭제할 리스트를 확인하세요.');
		return;
	}

	// console.log(checked_list);

	// 삭제 처리
	for(var j=0,len=checked_list.length;j<len;j++){
		// console.log('deleted number : ' + j);

		itemList[checked_list[j]]=null;

	}

	alert('삭제되었습니다.');
	drawWholeList();
	displayPriceAmount();
	displaySelectedCount();

});


function drawWholeList(){
	order_table.find('tbody').children().remove();

	for(var i=0,size=itemList.length;i<size;i++){
		drawList(itemList[i]);
	}
}

/**
 *
 * @returns {number}
 */
function getPriceAmount(){
	var amount=0;
	for(var i=0,size=itemList.length;i<size;i++){
		if(itemList[i] === null){
			continue;
		}
		amount+=parseInt(itemList[i]['price'], 10);
	}
	return amount;
}

function displayPriceAmount(){
	$('.txt-amount').text(commaNumber(getPriceAmount()));
}

/**
 * 삭제할 때와 리스트를 선택할 때 호출하여 총 선택된 리스트 갯수를 찾을 수 있도록 한다.
 * @returns {Array}
 */
function getSelectedCount(){
	var count=0;
	for(var i=0,size=itemList.length;i<size;i++){
		if(itemList[i] === null){
			continue;
		}

		if(itemList[i]['is_checked']){
			count+=1;
		}
	}
	return count;
}

function displaySelectedCount(){
	$('.txt-count').text(commaNumber(getSelectedCount()));
}