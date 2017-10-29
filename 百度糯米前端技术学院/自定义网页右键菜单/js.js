window.onload = function() {
    var container = document.getElementsByClassName('container')[0],
        context = document.getElementsByClassName('context')[0];
    container.oncontextmenu = function(event) {

        context.style.display = 'block';

        var e = event || window.event,
            x = e.clientX,
            y = e.clientY,
            clientWid = document.documentElement.clientWidth,
            clientHei = document.documentElement.clientHeight,
            contextWid = context.offsetWidth,
            contextHei = context.offsetHeight,
            remainWid = clientWid - x,
            remainHei = clientHei - y,
            scrollTop = document.body.scrollTop || document.documentElement.scrollTop;//兼容FF

        e.preventDefault();

        if (remainWid < contextWid) {
            context.style.left = clientWid - contextWid + 'px';
        } else {
            context.style.left = x + 'px';
        }

        if (remainHei < contextHei) {
            context.style.top = clientHei - contextHei + scrollTop + 'px';
        } else {
            context.style.top = y + scrollTop + 'px';
        }

    };
};