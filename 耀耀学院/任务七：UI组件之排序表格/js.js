window.onload = function() {
    var table = {
            "th": ['姓名', '语文', '数学', '英语', '总分'],
            "tbody": [
                ['张三', 80, 70, 90, 240],
                ['李四', 80, 90, 100, 280],
                ['王五', 99, 99, 100, 298]
            ],
            "sortTh": ['语文', '数学', '英语', '总分'],
            "sortFun": null
        },
        th = table.th,
        tbody = table.tbody,
        sortTh = table.sortTh,
        thHtml = '',
        tbodyHtml = '';

    for (var i = 0; i < th.length; i++) {
        if (sortTh.indexOf(th[i]) > -1) {
            thHtml += '<th>' + th[i] + "<span class='ascending'></span><span class='descending'></span></th>";
        } else {
            thHtml += '<th>' + th[i] + "</th>";
        }
    }

    for (var k = 0; k < tbody.length; k++) {
        tbodyHtml = tbodyHtml + '<tr>';
        for (var j = 0; j < tbody[k].length; j++) {
            tbodyHtml = tbodyHtml + '<td>' + tbody[k][j] + '</td>';
        }
        tbodyHtml = tbodyHtml + '</tr>';
    }

    var tableEle;
    tableEle = document.createElement('table');
    tableEle.id = "jsTable";
    tableEle.innerHTML = thHtml + tbodyHtml;
    document.body.appendChild(tableEle);
    /*console.log(tableEle.id);*/
    tableEle.onclick = function(event) {
        event = event || window.event;
        var target = event.target || event.srcElement;

        if (target.className === 'ascending' || target.className === 'descending') {
            var th=Array.prototype.slice.call(tableEle.getElementsByTagName('th'));
            var indexTh=th.indexOf(target.parentNode);
            console.log(indexTh);
            if (target.className === 'ascending') {

            } else if (target.className === 'descending') {

            }

        }
    };
















};