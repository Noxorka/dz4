"use strict";

var validation = (function () {
    var init = function() {
            console.log('������������� ������ Validation');
            _setUpListners();
            },
        validateForm = function(form) {
            console.log('�������� �����');

            var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
                valid = true;

            $.each(elements, function(index,val) {
                var element = $(val),
                    val = element.val(),
                    pos = element.attr('qtip-position');

                if(val.length === 0 ) {
                    element.addClass('dz4-form__input--error');
                    _createQtip(element,pos);
                    valid = false;
                }
            });
            return valid;
        },
        _setUpListners = function(){
            $('form').on('keydown','.dz4-form__input--error', _removeError);
            $('form').on('change', '#file', _removeErrorUpload);
            $('form').on('reset', _clearForm);
        },

        _removeError = function() {
            console.log('�������� ������� �������');
            $(this).removeClass('dz4-form__input--error');
        },

        _removeErrorUpload = function() {
            var filename = $('#file-name');
            filename.removeClass('dz4-form__input--error');
            filename.trigger('hideTooltip');
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

var UploadFix = (function() {
    // Setting up listening if user has chose a file
    var _setUpListeners = function() {
            $('#form-file').on('change', _showPlaceholder);
        },

    // adding a placeholder text
        _showPlaceholder = function(ev) {
            ev.preventDefault();

            var realVal = $(this).val(),
                lastIndex = realVal.lastIndexOf('\\') + 1;

            if (lastIndex !== -1) {
                realVal = realVal.substr(lastIndex);
                $('#file-name').val(realVal);
            }
        }

    return {
        init: _setUpListeners
    }

})();

var FixPlaceholders = (function() {
    var _fixPlaceholders = function() {
        $('input, textarea').placeholder();
    }

    return {
        init: function() {
            _fixPlaceholders();
        }
    }
})();

$(document).ready(function() {

    if ($.find('#file-form-label').length > 0) {
        UploadFix.init();
    }

    if ($.find('form').length > 0) {
        validation.init();
        FixPlaceholders.init();
    }
});