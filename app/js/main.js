"use strict";
//Открытие попапа
function Bpopup() {
    var el;
    el = document.getElementById("addProgect");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}


var model = (function() {
    /*Валидация*/
    var init = function() {
            console.log('INIt form');
            _setUpListners();
        },
        _setUpListners = function (){
            $('s').on('submit', _submitForm);
        },
        _submitForm = function(ev) {
            console.log('INIt formfd');

            /*Отменяем функцию, что бы отменить простую отправку phр формы*/
            ev.preventDefault();

            /*Задается переменна и ее свойства*/
            var form = $(this),
                url = '../php/ajax.php', //указываем путь к обрабочику php
                defObject = _ajaxForm(form,url);

            /*Проверка обекта*/
            if (defObject) {
                defObject.done(function (ans) {
                    var massage = ans.massage,
                        status = ans.status;

                    if (status === 'Ok'){
                        form.trigger('reset');
                        form.find('.dz6-form--info__success').text(mes).show();

                    } else {
                        form.find('.dz6-form--info__error').text(mes).show();
                    }
                });
            }
        },
        _ajaxForm = function(form,url){
            if(!validation.validateForm(form)) return false;

            var data = form.serialize();

            return $.ajax ({
                type : "POST",
                url : url,
                dataType : "JSON",
                data: data
            }).fail( function(ans){
                    console.log('Какая-та проблема');
                    form.find('.dz6-form--info__error').text('Произошла ошибка').show();
                });
        };

    return {
        init: init
    };

}());

model.init();