$.fx.speeds._default = 1000;

$(document).ready(function() { 
    
//Галерея
$('#small a').click(function(eventObject) {
    if ($('#big img').attr('src') != $(this).attr('href')) {
    
    $('#big img').hide().attr('src',$(this).attr('href'));
    $('#big img').load(function() {
        $(this).fadeIn(2000);
    });
    }
    eventObject.preventDefault();
});

$('#switchGal').toggle(function() {
$('#gallery').slideDown(2000);
},
function() {
$('#gallery').slideUp(2000);
});

$('#small a img').click(function() {
    $('#small a img').fadeTo(1000,1);
    $(this).fadeTo(1000, 0.6);
});

//Проверка email адреса пользователя
var regV = /[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}/;
var myEmail = $('#email');

myEmail.focus(function(){
    if ($(this).val() == $(this).attr('defaultValue')) {
    $(this).val('');
    }

});

myEmail.blur(function(){
    var userEmail = $(this).val();
    
    if (userEmail == '') {
    $(this).val($(this).attr('defaultValue')).css('border','1px solid #cccccc');
    }
    
    else if (userEmail.search(regV) == -1) {
    $(this).css('border','1px solid #cc0000');   
    }
    else {
    $(this).css('border','1px solid #00cc00');    
    }
    

});

//Блокировка кнопки отправки

$('#my_button').click(function(eventObject) {
var myDate = $('#date');
if (myDate.val() == '') {
    myDate.css('background-color','#cc0000').effect('pulsate').effect('shake', function() {
        myDate.css('background-color','#f6f6f6')
    });
}


    $(this).attr('disabled','disabled');
    $(this).attr('value','Отправляю...');
  eventObject.preventDefault();
    
});

//Календарик
$("#date").datepicker({
			changeMonth: true,
			changeYear: true
		});
                
//Русификация календаря
$.datepicker.regional['ru'] = {
		closeText: 'Закрыть',
		prevText: '&#x3c;Пред',
		nextText: 'След&#x3e;',
		currentText: 'Сегодня',
		monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
		'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
		'Июл','Авг','Сен','Окт','Ноя','Дек'],
		dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
		dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
		dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
		weekHeader: 'Не',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ru']);
    
//Код слайдера
$("#slider-range").slider({
			range: true,
			min: 10,
			max: 1000,
			values: [50, 400],
			slide: function(event, ui) {
				$("#amount").val(ui.values[0] + ' - ' + ui.values[1] + ' км');
			}
		});
		$("#amount").val($("#slider-range").slider("values", 0) + ' - ' + $("#slider-range").slider("values", 1) + ' км');

//Код диалогового окна
$('#dialog').dialog({
			autoOpen: false,
			show: 'blind',
			hide: 'explode'
		});
		
		$('#help').click(function() {
			$('#dialog').dialog('open');
			return false;
		});


//Работа кнопок

$("input:submit").button();

//Работа виджет Tabs

$("#tabs").tabs();

//Работа виджета аккордеон
$("#accordion").accordion();

//Работа виджета прогресса
$("#progressbar").progressbar({
			value: 0
		});
        
$('#opros :radio').change(function() {
    
    var chRadio = $('#opros :radio:checked').size();
    $("#progressbar").progressbar({
			value: chRadio * 20
		});
    var questCount = $('#opros div[id*=radio]').size();    
     $('#aswerCount').text('Дано ответов ' + chRadio + ' из ' + questCount);   
        
});

$('#opros').load(function() {
    
    var chRadio = $('#opros :radio:checked').size();
    $("#progressbar").progressbar({
			value: chRadio * 20
		});
    var questCount = $('#opros div[id*=radio]').size();    
     $('#aswerCount').text('Дано ответов ' + chRadio + ' из ' + questCount);   
        
});

//Работа виджета автозаполнения
var availableTags = ["Владимирская", "Волгоградская", "Вологодская", "Воронежская"];
		$("#tags").autocomplete({
			source: availableTags
		});

//Эффект перетаскивания
$('div[id*=helmet]').draggable({
    containment : '#bound',
    revert : 'invalid',
    helper: 'clone',
    cursor : 'move'
});


//Корзина
var helmetsCount = 0;
var summa = 0;

$('#mycart').droppable({
            accept: '#forHelmets div[id*=helmet]',
            activeClass: 'highlight',
            drop: function(event, ui) {
                helmetsCount++;
                if (helmetsCount > 0) {$('#myclear').show();}
                $('#helmetsCount strong').text(helmetsCount);
                            
				var helmet = $(ui.draggable);
                summa += parseInt(helmet.attr('title'));
                $('#helmetsSumm strong').text(summa);
                helmet.fadeOut(200, function() {
                    $(this).appendTo('#mycart').fadeIn(1000).find('img').animate({
                        'width' : '90',
                        'height' : '80'
                    },2000);
                });
			}
		});


$('#forHelmets').droppable({
     accept: '#mycart div[id*=helmet]',
     activeClass: 'highlight',
     drop: function(event, ui) {
                helmetsCount--;
                if (helmetsCount == 0) {$('#myclear').hide();}
                 $('#helmetsCount strong').text(helmetsCount);
				var helmet2 = $(ui.draggable);
                summa -= parseInt(helmet2.attr('title'));
                $('#helmetsSumm strong').text(summa);
                helmet2.fadeOut(200, function() {
                    $(this).appendTo('#forHelmets').fadeIn(1000).find('img').animate({
                        'width' : '180',
                        'height' : '160'
                    },2000);
                });
			}
});


//Сортировка

$("#sortable").sortable({
			placeholder: 'ui-state-highlight'
		});
		$("#sortable").disableSelection();

//Выборка цвета

$("#selectable").selectable();

//Изменяемые по размеру элементы 

$("#mytextarea").resizable({
			maxHeight: 250,
			maxWidth: 380,
			minHeight: 150,
			minWidth: 380
		});


//Изучение эффектов

$('#formHide').click(function() {
    $('#my_form').toggle('explode');
});

$('#formColor').toggle(function() {
  $('#bigform > fieldset').animate({
    'backgroundColor' : '#e9f0e7'
  }, 5000);
},
function() {
  $('#bigform > fieldset').animate({
    'backgroundColor' : '#e7e7f0'
  }, 5000);
});

$('#zoom').toggle(function() {
$('#tabs p').switchClass('forP', 'forP2', 2000);
},
function() {
$('#tabs p').switchClass('forP2', 'forP', 2000);
});








}); //Конец ready