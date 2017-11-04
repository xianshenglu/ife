window.onload = function() {
    var nodes = [{
            name: "父节点1",
            children: [
                { name: "子节点1" }, { name: "子节点2" }
            ]
        },
        {
            name: "父节点2",
            children: [{
                name: "子节点3"
            }, {
                name: "子节点4",
                children: [{
                    name: "子节点5"
                }]
            }]
        }
    ];
    var container = document.getElementsByClassName('container')[0];

    appendNodes(container, nodes);

    function appendNodes(parentNode, array) {

        for (var i = 0; i < array.length; i++) {
            var div = document.createElement('div');
            div.innerHTML = array[i].name;
            parentNode.appendChild(div);

            if (array[i].children) {
                div.innerHTML = div.innerHTML + '+';
                appendNodes(div, array[i].children);
            }

        }
    }

    container.onclick = function(event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;
    	var isChildHidden=false;

    	if (target.children.length) {    		
    		isChildHidden=window.getComputedStyle(target.children[0]).display.toUpperCase()==='NONE';	
    	}

    	if (isChildHidden) {
    		for (var l = 0; l < target.children.length; l++) {
    			target.children[l].style.display='block';
    		}
    	}else {
    		for (var m = 0; m < target.children.length; m++) {
    			target.children[m].style.display='none';
    		}
    	}


    };

};