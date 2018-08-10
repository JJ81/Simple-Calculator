'use strict';

var amount = 0;
var obj = [];
var item = $('.txt_item');
var price = $('.txt_price');
var btnAddItem = $('.btn_add_item');
var item_table = $('.item_table');



// 리스트 추가
btnAddItem.bind('click', function (e) {
  e.preventDefault();

    if(item.val().trim().length === 0){
      item.focus();
      alert('아이템 이름을 확인해 주세요.');
      return;
    }

    if(price.val().trim().length === 0){
      price.focus();
      price.val('');
      alert('아이템 가격을 확인해 주세요.');
      return;
    }

    // add new menu
    appendList( item_table, item.val().trim(), price.val().trim() );


    // reset input fields.
    item.val('');
    price.val('');

    // focus on the name field.
    setTimeout(function () {
      item.focus();
    }, 300);
});


// 금액 입력 필드에서 처음 숫자가 0이 되지 않도록 방지한다.
price.bind('keydown', checkNumberValue);
price.bind('keyup', checkNumberValue);

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


function commaNumber(val){
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function searchList(id){
  for(var i=0,size=obj.length;i<size;i++){
    if(obj[i]['id'] === id){
      return i;
    }
  }
  return null;
}


function calcAmount(el){
  var
  id = $(el).parent().parent().attr('data-id'),
  name = $(el).parent().parent().find('.name').text(),
  price = parseInt($(el).parent().parent().find('.price').attr('data-price'), 10),
  isChecked = $(el).is(":checked"),
  idx = searchList($(el).parent().parent().attr('data-id'));

  if(idx == null){
      obj.push({
      id: id,
      name: name,
      price: price,
      isChecked: isChecked
    });
  }else{
    obj[idx]['name'] = name;
    obj[idx]['price'] = price;
    obj[idx]['isChecked'] = isChecked;
  }

  console.log(obj);

  $('.txt-amount').text( commaNumber(getTotalAmount()) );
  $('.txt-count').text( commaNumber(getListCount()) );
}


function getTotalAmount(){
  var amount = 0;

  console.log('calc amount');

  for(var i=0,size=obj.length;i<size;i++){
    if(obj[i]['isChecked']){
        amount += obj[i]['price'];
    }
  }

  console.log(amount);
  return amount;
}


function getListCount(){
  var amount = 0;

  console.log('calc amount');

  for(var i=0,size=obj.length;i<size;i++){
    if(obj[i]['isChecked']){
        amount += 1;
    }
  }

  console.log(amount);
  return amount;
}

// 리스트 추가
function appendList(target, name, price){
    var str = '';
    str += '<tr data-id="'+makeRandomId(5)+'">';
    str += '<td><input type="checkbox" class="check_item" onClick="calcAmount(this);" /></td>';
    str += '<td class="name">'+name+'</td>';
    str += '<td class="price" data-price="'+price+'">₩' + commaNumber(price) + '</td>';
    str += '</tr>';
    target.append(str);

    // insert list into list obj

}


function makeRandomId(len) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


/*
  TODO
  1. 입력을 받을 때 중복된 아이템이 있다면 건너뛸 수 있도록 한다.
  2. 잘못된 금액이 입력되지 않도록 설정한다. 0부터 시작이 되고 있다면 앞에 0은 빼고 다시 붙여준다.
*/

$( "#sortable" ).sortable({
  revert: true
});

$( "ul, li" ).disableSelection();


// 아직 정상적으로 실행이 되지 않음
$('.js-btn-delete').bind('click', function () {
  if(obj.length === 0 || obj === null){
    alert('삭제할 리스트가 없습니다.');
    return;
  }

  for(var i=0,size=obj.length;i<size;i++){
    if(obj[i]['isChecked']){
      obj.splice(i,1);
    }
  }

  alert('삭제되었습니다.');
});

// TODO 8 전체 리스트를 다시 그려주는 로직이 필요하다.
// TODO 개선포인트, append를 할 때마다 전체 데이터를 다시 그려줄 수 있도록 하고
// TODO obj에 쌓을 수 있도록 하자.
function drawOrderedList(target, list){
  // obj를 통해서 list 내용을 스트링으로 만들어서
  // target에 append하도록 한다.
  for(var i=0,size=obj.length;i<size;i++){

  }
}




// TODO 1. 숫자를 입력할 때 가장 앞자리에 0을 입력하면 0이 빠질 수 있도록 한다.
// TODO 2. 추가한 리스트를 삭제할 수 있도록 한다.
// TODO 3. 추가한 리스트를 금액만 변경하거나 이름을 변경할 수 있도록 한다.
// TODO 4. 추가한 리스트를 전체 선택할 수 있도록 한다.
// TODO 5. 선택한 리스트를 주문하기 버튼을 동작시켰을 때 주문하기 이벤트를 발생시킨 후에 주문된 리스트가 사라질 수 있도록 한다.
// TODO 6. 주문된 리스트의 내용은 주문된 리스트 영역에 출력이 될 수 있도록 한다.
// TODO 7. 수량 컬럼을 추가하여 수량을 선택할 수 있도록 한다.

