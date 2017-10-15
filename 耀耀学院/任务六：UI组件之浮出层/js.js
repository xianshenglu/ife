//TODO 未兼容IE,预计IE8之前版本有错
//TODO 拖拽边缘来放大缩小浮出窗口的功能 
window.onload = function() {
    var btn = document.getElementById('btn'),
        pop = document.getElementById('pop'),
        popDiv = document.getElementById('popDiv'),
        docClientHeight = document.documentElement.clientHeight,
        docClientWidth = document.documentElement.clientWidth,
        leftDev,
        topDev;
        /**
         * 单击开启弹窗
         * @param  {兼容FF} event 事件对象
         * @param  {px 或 %} width 弹窗宽度
         * @param  {px 或 %} height 弹窗高度
         * @return {[type]}       弹窗
         */
    document.onclick = function(event) {
        popUp(event, '30%', '30%');
    };

    //获取鼠标相对于盒子的偏移        
    popDiv.addEventListener('dragstart', function(event) {

        //兼容FF，否则 drag 和 dragover 事件不起作用        
        event.dataTransfer.setData('text/plain', null);

        leftDev = event.clientX - popDiv.offsetLeft;
        topDev = event.clientY - popDiv.offsetTop;
    }, false);

    popDiv.addEventListener('drag', function(event) {
        popMove(event);
    }, false);

    //兼容FF drag事件获取到 event.clientX=0,但是 dragover 事件正常
    popDiv.addEventListener('dragover', function(event) {        
        popMove(event);
    }, false);

    //兼容FF,因为 FF drop 事件会默认打开新窗口
    popDiv.addEventListener('drop', function(event) {
        event.stopPropagation();
        event.preventDefault();
    });

    /**
     * [popUp description]
     * @param  {兼容FF} event  事件对象
     * @param  {宽度的写法，支持px或百分比} width  弹窗的宽度
     * @param  {高度的写法，支持px或百分比} height 弹窗的高度
     * @return {[type]}        弹窗
     */
    function popUp(event, width, height) {
        event = event || window.event;
        var target = event.target;
        pop.style.width = docClientWidth + 'px';
        pop.style.height = docClientHeight + 'px';

        if (target.id === 'btn') {
            pop.style.display = 'block';

            if (width) {
                popDiv.style.width = width;
            }
            if (height) {
                popDiv.style.height = height;
            }

            //水平垂直居中
            
            popDiv.style.top = docClientHeight / 2 - popDiv.offsetHeight / 2 + 'px';
            popDiv.style.left = docClientWidth / 2 - popDiv.offsetWidth / 2 + 'px';

        } else if (!popDiv.contains(target) || target.className === 'confirm' || target.className === 'cancel') {
            pop.style.display = 'none';
        }
    }

    function popMove(event) {
        var target = event.target,
            clientX = event.clientX,
            clientY = event.clientY,
            canMove = popDiv.contains(target) && clientX > 0 && clientY > 0;
        
        //移动使弹窗超出视口时，改变 clientX 和 clientY 的值
        
        if (canMove) {
            if (clientY < topDev) {
                clientY = topDev;
            }
            if (clientX < leftDev) {
                clientX = leftDev;
            }
            if (clientY > docClientHeight - popDiv.offsetHeight + topDev) {
                clientY = docClientHeight - popDiv.offsetHeight + topDev;
            }
            if (clientX > docClientWidth - popDiv.offsetWidth + leftDev) {
                clientX = docClientWidth - popDiv.offsetWidth + leftDev;
            }

            popDiv.style.top = clientY - topDev + 'px';
            popDiv.style.left = clientX - leftDev + 'px';
        }
    }
};