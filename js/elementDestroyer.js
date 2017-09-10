var elementDestroyer = (function () {
    var css = '.__indicator { cursor: crosshair; opacity: 0.5; } \
               #__overlay { position: absolute; left: 0px; top: 0px; width: 100px; height: 100px; opacity: 0.5; background-color: red; } \
               #__elemName { position: absolute; width: auto; height: auto; opacity: 0.5; background-color: blue; } '; //margin: 2px; border: 2px solid; border-color: red; }';

    var head = document.head || document.getElementsByTagName('head')[0];
    var body = document.body || document.getElementsByTagName('body')[0];

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.append(style);

    var overlay = document.createElement('div');
    overlay.id = '__overlay';
    body.append(overlay);

    var elemName = document.createElement('span');
    elemName.id = '__elemName';
    body.appendChild(elemName);

    document.onmouseover = function (event) {
        var target = event.target;
        target.classList.add('__indicator');

        var targetRect = target.getBoundingClientRect();

        overlay.style.left = targetRect.left + window.scrollX + 'px';
        overlay.style.top = targetRect.top + window.scrollY + 'px';

        overlay.style.width = targetRect.width + 'px';
        overlay.style.height = targetRect.height + 'px';

        var elemName = document.getElementById('__elemName');
        // elemName.style.left = cursor.

        // var newOverlayWidth = '0px';
        // if (target.offsetWidth) {
        //     newOverlayWidth = target.offsetWidth + 'px';
        // }
        // overlay.style.width = newOverlayWidth;
        // console.log('Target width: ' + newOverlayWidth);

        console.log(target);
    };
    document.onmouseout = function (event) {
        var element = event.target.classList.remove('__indicator');
    };
    document.onclick = function (event) {
        event.target.parentElement.removeChild(event.target);
        return false;
    };
}(document));
