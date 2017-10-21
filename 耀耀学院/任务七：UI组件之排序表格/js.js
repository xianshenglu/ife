window.onload = function() {
    var table = {
            //sortable属性决定了是否可以排序，也就是是否加小箭头
            "th": [ 
                { "value": '姓名' },
                { "value": '语文', "sortable": false }, 
                { "value": '数学', "sortable": false },
                { "value": '英语', "sortable": false },
                { "value": '总分', "sortable": false }
            ],
            //表格内容
            "tbody": [ 
                ['李四', 80, 90, 100, 280],
                ['张三', 80, 70, 90, 240],
                ['王五', 99, 99, 100, 298]
            ],
            //排序方法
            "sortFun": function(a, b) { 
                if (a < b) {
                    return -1;
                } else {
                    return 1;
                }
            }
        },
        th = table.th,
        tbody = table.tbody,
        thHtml = '',
        tbodyHtml = '',
        sortFun = table.sortFun;
    initialTh();
    initialTbody();

    function initialTh() {
        for (var i = 0; i < th.length; i++) {
            if (typeof th[i].sortable != 'undefined') {
                thHtml += '<th>' + th[i].value + "<span class='ascending'></span><span class='descending'></span></th>";

            } else {
                thHtml += '<th>' + th[i].value + "</th>";
            }
        }
    }

    function initialTbody() {
        for (var k = 0; k < tbody.length; k++) {
            tbodyHtml = tbodyHtml + '<tr>';
            for (var j = 0; j < tbody[k].length; j++) {
                tbodyHtml = tbodyHtml + '<td>' + tbody[k][j] + '</td>';
            }
            tbodyHtml = tbodyHtml + '</tr>';
        }
    }

    var tableEle;
    tableEle = document.createElement('table');
    tableEle.id = "jsTable";
    tableEle.innerHTML = thHtml + tbodyHtml;
    document.body.appendChild(tableEle);

    tableEle.onclick = function(event, sortFun) {
        event = event || window.event;
        var target = event.target || event.srcElement,
            isSortBtn = (target.className === 'ascending') || (target.className === 'descending');

        if (isSortBtn) {
            var sortTh = Array.prototype.slice.call(tableEle.getElementsByTagName('th')),
                sortThIndex = sortTh.indexOf(target.parentNode),
                targetTbody = [],
                sortTd = [];

            for (var i = tbody.length - 1; i >= 0; i--) {
                sortTd.push(tbody[i][sortThIndex]);
            }

            if (target.className === 'ascending') {
                sortTd.sort(sortFun);
                sortTh[sortThIndex].sortable = 'ascending';
            } else if (target.className === 'descending') {
                sortTd.sort(sortFun).reverse();
                sortTh[sortThIndex].sortable = 'descending';
            }

            //倒叙遍历，倒叙添加新项

            for (var i = sortTd.length - 1; i >= 0; i--) {
                for (var j = tbody.length - 1; j >= 0; j--) {
                    if (sortTd[i] === tbody[j][sortThIndex]) {
                        targetTbody.unshift(tbody[j]);
                        tbody.splice(j, 1);
                        break;
                    }
                }
            }

            tbody = targetTbody;
            tbodyHtml = '';
            initialTbody();
            tableEle.innerHTML = thHtml + tbodyHtml;
        }
    };
};