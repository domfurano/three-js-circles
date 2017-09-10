'use strict';

var game_menu = (function () {
    if (!window.jQuery) {
        throw 'game_menu requires jQuery.'
    }
    $(function () {
        var d = document.createElement('div');
        $(d).css({
            'position': 'absolute',
            'width': '25vw',
            'height': '100vh',
            'background-color': '#333',
            'color': '#ccc'
        }).appendTo($('body'));
    });
} (window));
