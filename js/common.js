$.datepicker.setDefaults({
  dateFormat : 'yy-mm-dd',
  prevText : '이전달',
  nextText : '다음달',
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
  showMonthAfterYear: true,
  yearSuffix: '년'
});

$(window).on('load', function(){
  contentFullHeight();
});

var contentFullHeightDelay = 100;
var contentFullHeightTimer = null;

$(window).resize(function(){
  clearTimeout(contentFullHeightTimer);
  contentFullHeightTimer = setTimeout(contentFullHeight, contentFullHeightDelay);
});

function contentFullHeight(){
  var contentsHeight = 0;

  if($('.sub_cont_wrap').length > 0) $('.sub_cont_wrap').outerHeight('');
  else if($('#contents').length > 0) $('#contents').outerHeight('');

  if($('#wrap').height() < $(window).height()){
    contentsHeight = $(window).height();
    if($('.membership-menu').length > 0) contentsHeight -= $('.membership-menu').outerHeight();
    if($('.header').length > 0) contentsHeight -= $('.header').outerHeight();
    if($('.footer').length > 0) contentsHeight -= $('.footer').outerHeight();

    if($('.sub_cont_wrap').length > 0) $('.sub_cont_wrap').outerHeight(contentsHeight);
    else if($('#contents').length > 0) $('#contents').outerHeight(contentsHeight);
  }
}

function inputDate(obj){
  var string = obj.value.replace(/[^0-9]/g, "");
  var data = '';

  if(string.length < 4){
    return string;
  }else if(string.length < 6){
    data += string.substr(0, 4);
    data += '-';
    data += string.substr(4);
  }else{
    data += string.substr(0, 4);
    data += '-';
    data += string.substr(4, 2);
    data += '-';
    data += string.substr(6, 2);
  }

  obj.value = data;
}

function filterNum(obj){
  obj.value = obj.value.replace(/[^0-9]/g, "");
}

function filterFloat(obj){
  obj.value = obj.value.replace(/[^0-9\.]/g, "");
}

// 소수점까지 입력 가능하도록 설정
function inputFloat(obj, event){
  filterFloat(obj);

  var code = event.keyCode;

  // 숫자키 허용
  if(code > 95 && code < 106){
    return;
  }else if (code > 47 && code < 58) {
    return;
  }

  // 정수가 아닌 소숫점 입력 가능하도록 점(.) 허용
  if (code === 110 || code === 190) {
    return;
  }

  // 단축키 입력 허용
  if (event.ctrlKey || event.altKey) {
    return;
  }

  // 특수 키 입력 허용 (TAB(9), HOME(36), END(35), LEFT(37), RIGHT(39), BACKSPACE(8), DELETE(46))
  if (code === 9 || code === 36 || code === 35 || code === 37 ||
      code === 39 || code === 8 || code === 46) {
    return;
  }
  event.preventDefault();
}

// 숫자만 입력 가능하도록 설정
function inputNum(obj, event){
  filterNum(obj);

  var code = event.keyCode;

  // 숫자키 허용
  if(code > 95 && code < 106){
    return;
  }else if (code > 47 && code < 58) {
    return;
  }

  // 단축키 입력 허용
  if (event.ctrlKey || event.altKey) {
    return;
  }

  // 특수 키 입력 허용 (TAB(9), HOME(36), END(35), LEFT(37), RIGHT(39), BACKSPACE(8), DELETE(46))
  if (code === 9 || code === 36 || code === 35 || code === 37 ||
      code === 39 || code === 8 || code === 46) {
    return;
  }
  event.preventDefault();
}

$(document).ready(function(){
  /* url에 hash 있는 경우 scroll 스르륵 */
  if(window.location.hash) {
    var hash = window.location.hash;

    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 1000, 'swing');
  }

  // 폼메일 체크박스 오류 보완
  $(document).on('submit', 'form', function(){
    $('input[type=checkbox]').each(function(){
      if(!$(this).is(':checked')){
        $(this).after('<input type="hidden" name="'+$(this).attr('name')+'" value="" />');
        $(this).attr('name', '');
      }
    });
  });
});

function toolMenu(obj){
  if($(obj).siblings('ul').hasClass('active')){
    $(obj).siblings('ul').removeClass('active');
  }else{
    $('.tool-wrap').find('ul').removeClass('active');
    $(obj).siblings('ul').addClass('active');
  }
}

/* S : iframe 리사이징 */
// 일반 게시판 같이 클릭으로 이동되는 게시판에 사용
function resize_frame(obj) {
    var iframeHeight = (obj).contentWindow.document.getElementById('boardWrap').clientHeight;
    (obj).height = iframeHeight + 30;
}

// fap 게시판 같이 클릭으로 높이가 변경되는 게시판에 사용
function resize_faq_frame(obj) {
    var iframeHeight = (obj).contentWindow.document.getElementById('boardWrap').clientHeight;
    (obj).height = iframeHeight + 30;

    (obj).contentWindow.document.getElementById('boardWrap').onclick = function(){
      setTimeout(function(){
        resize_frame(obj);
      }, 250);
    }
}
/* E : iframe 리사이징 */
