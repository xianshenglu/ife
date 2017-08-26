window.onload=function(){
	var funObj={		
		//数组去重
		uniqueArr: function(array){
			var newArr=[];
			for (var i = 0; i < array.length; i++) {
				if (newArr.indexOf(array[i]) < 0) {
					newArr.push(array[i]);
				}
			}
			return newArr;
		},
		hasClass: function(ele,clsName){
			var clsArr;
			if (ele.className) {
				clsArr=ele.className.trim().split(/\s+/g);
				clsArr=funObj.uniqueArr(clsArr);
				var index=clsArr.indexOf(clsName);			
				if (index >= 0) {
					return true;			
				}else {
					return false;
				}
			}else {
				return false;
			}
		},
		//增加clasName
		removeClass: function (ele,clsName){
			var clsArr;
			if (ele.className) {
				clsArr=ele.className.trim().split(/\s+/g);
				clsArr=funObj.uniqueArr(clsArr);
				var index=clsArr.indexOf(clsName);			
				if (index >= 0) {
					clsArr.splice(index,1);
					ele.className=clsArr.join(' ');				
				}
			}else {
				ele.className=clsName;
			}				
		},
		//移除clasName
		addClass: function (ele,clsName){
			var clsArr;
			if (ele.className) {
				clsArr=ele.className.trim().split(/\s+/g);
				clsArr=funObj.uniqueArr(clsArr);	
				if (clsArr.indexOf(clsName) < 0) {
					clsArr.push(clsName);
					ele.className = clsArr.join(' ');		
				}
			}
		},
		getEleByCls: function(ele,clsName){
			if (ele.getElementsByClassName) {
				return ele.getElementsByClassName(clsName);
			}else{
				var eleChilds=ele.getElementsByTagName("*");
				var targetEleArr=[];
				for (var i = 0; i < eleChilds.length; i++) {
					if(funObj.hasClass(eleChilds[i],clsName)){
						targetEleArr.push(eleChilds[i]);
					}
				}
				return targetEleArr;
			}
		},
		addEventHandler: function(ele,eventType,func,trueOrFalse){
			if (ele.addEventListener) {
				ele.addEventListener(eventType,func,trueOrFalse);
			}else if(ele.attachEvent){
				ele.attachEvent('on'+eventType,func);
			}
		}
	};	
};	