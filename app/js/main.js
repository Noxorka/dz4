
"use strict";
//???????? ??????
function Bpopup() {
    var el;
    el = document.getElementById("addProgect");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}


var model = (function() {
    /*?????????*/
    var init = function() {
            console.log('INIt form');
            _setUpListners();
        },
        _setUpListners = function (){
            $('form').on('submit', _submitForm);
        },
        _submitForm = function(ev) {
            console.log('INIt formfd');

            /*???????? ???????, ??? ?? ???????? ??????? ???????? ph? ?????*/
            ev.preventDefault();

            /*???????? ????????? ? ?? ????????*/
            var form = $(this),
                url = '../php/ajax.php', //????????? ???? ? ?????????? php
                defObject = _ajaxForm(form,url);

            /*???????? ??????*/
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
                console.log('?????-?? ????????');
                form.find('.dz6-form--info__error').text('????????? ??????').show();
            });
        };

    return {
        init: init
    };

}());

model.init();