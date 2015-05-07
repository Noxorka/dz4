"use strict";

var validation = (function () {
    var init = function() {
            console.log('Инициализация модуля Validation');
            _setUpListners();
            },
        validateForm = function(form) {
            console.log('Проверка формы');

            var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
                valid = true;

            $.each(elements, function(index,val) {
                var element = $(val),
                    val = element.val(),
                    pos = element.attr('qtip-position');

                if(val.length === 0) {
                    element.addClass('dz4-form__input--error');
                    _createQtip(element,pos);
                    valid = false;
                }
            });
            return valid;
        },
        _setUpListners = function(){
            $('form').on('keydown','.dz4-form__input--error', _removeError);
            $('form').on('reset', _clearForm);
        },
        _removeError = function() {
            console.log('Удаление красной обводки');
            $(this).removeClass('dz4-form__input--error');
        },
        _clearForm = function(form) {
            var form = $(this);
            form.find('input, textarea').trigger('hideTooltip');
            form.find('.dz4-form__input--error').removeClass('dz4-form__input--error');
            form.find('.dz6-form--info__success, .dz6-form--info__error').text('').hide();
        },
        _createQtip = function(element, position) {
            console.log('tooltip');

            if (position === "right") {
                position = {
                    my: 'left center',
                    at: 'right center'
                }
            }else{
                position = {
                    my: "right center",
                    at: 'left center',
                    adjust: {
                        method: 'shift none'
                    }
                }
            }
            //initalisation tooltip
            element.qtip({
                content: {
                    text: function() {
                        return $(this).attr('qtip-content');
                    }
                },
                show: {
                    event: "show"
                },
                hide: {
                    event: "keydown hideTooltip"
                },
                position: position,
                style: {
                    classes: 'qtip-mystyle qtip-rounded',
                    tip: {
                        height: 10,
                        width: 16
                    }
                }
            }).trigger('show');
        };
    return {
        init: init,
        validateForm: validateForm
    };
})();
validation.init();