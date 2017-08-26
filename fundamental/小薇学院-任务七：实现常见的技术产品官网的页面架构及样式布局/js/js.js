window.onload=function () {
	//常用方法
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
		toTrim:function(str){
			//IE8 不支持 trim() 方法
			if (str) {
				if (str.trim) {
					return str=str.trim();					
				}else{
					return str=str.replace(/^\s+/g,'').replace(/\s+$/g,'');
				}			
			}else{
				return null;
			}
		},
		hasClass: function(ele,clsName){
			var clsArr;
			if (ele.className) {				
				clsArr=funObj.toTrim(ele.className).split(/\s+/g);
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
		//移除clasName
		removeClass: function (ele,clsName){
			var clsArr;
			if (ele.className) {
				/*alert(funObj.toTrim(ele.className));*/
				clsArr=funObj.toTrim(ele.className).split(/\s+/g);
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
		//增加clasName
		addClass: function (ele,clsName){
			var clsArr;
			if (ele.className) {
				clsArr=funObj.toTrim(ele.className).split(/\s+/g);
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
	//导航条click事件	
	var header=document.getElementById('header');
	var headerUl=header.getElementsByTagName('ul')[0];
	var lis=header.getElementsByTagName('li');	
	funObj.addEventHandler(headerUl,"click",navBgc,false);

	//城市活动搜索
	var partSearch=document.getElementById('part_search');
	var partSearchForm=document.forms[0];
	funObj.addEventHandler(partSearchForm,"click",showOptDiv,false);

	//part_chapter 新世界篇章
	var partChap=document.getElementById('part_chapter');
	funObj.addEventHandler(partChap,"click",changeChap,false);

	//志愿者 更多伸缩变化
	var volTerms=document.getElementById('part_volunteer').children[1];
	funObj.addEventHandler(volTerms,"click",moreTerms,false);


	function navBgc(event){
		//event 参数  兼容FF				
		var target=event.target;
		for (var i = 0; i < lis.length; i++) {
			funObj.removeClass(lis[i],"active");
		}
		funObj.addClass(target,"active");
	}

	function showOptDiv(event){
		event=event||window.event;
		var target=event.target;
		var selectDiv=funObj.getEleByCls(this,'select');
		var selectDivActive;
		var tarParClsName= target.parentNode.className;
		if (target.tagName.toLowerCase()==='input') {
			showSelectDiv();
		}else if(target.parentNode.tagName.toLowerCase()==='li'){
			showOptValue();
		}else {
			for (var i = 0; i < selectDiv.length; i++) {
				funObj.removeClass(selectDiv[i],'active');			
			}
		}
		//展示 下拉城市选项
		function showSelectDiv(){
			for (var i = 0; i < selectDiv.length; i++) {
				funObj.removeClass(selectDiv[i],'active');			
			}
			if(tarParClsName&&tarParClsName.indexOf("select")>=0){			
				selectDivActive = target.parentNode;
				funObj.addClass(selectDivActive,"active");
			}			
		}
		//切换 input 值为选中的 li
		function showOptValue(){
			var targetInput=target.parentNode.parentNode.parentNode.firstElementChild;
			targetInput.value=target.parentNode.getElementsByTagName('span')[0].innerHTML;
			funObj.removeClass(targetInput.parentNode,'active');
		}
	}
	
	function changeChap(event){
		event=event||window.event;
		var target=event.target;
		var partChapTextDiv=funObj.getEleByCls(this,'text');
		var chapNumArr={one:1,two:2,three:3};
		if (funObj.hasClass(target.parentNode,'choices')) {
			for (var key in chapNumArr) {
				if (funObj.hasClass(target,key)) {
					funObj.addClass(partChapTextDiv[chapNumArr[key]-1],'active');
				}else {
					funObj.removeClass(partChapTextDiv[chapNumArr[key]-1],'active');
				}
			}	
		}	
	}

	function moreTerms(event){
		event=event||window.event;
		var target=event.target;	
		//把事件目标换成 moreInfo ，不管点击的是 more 还是 arrow	
		if(funObj.hasClass(target.parentNode,'more_info')){
			target=target.parentNode;
		}else if(funObj.hasClass(target,'more_info')){
			target=target;
		}else{
			//如果 click 的不是 moreInfo 及旗下元素，跳出函数
			return false;
		}		

		var termsUnderDiv=this.children;
		var moreOrLess=target.firstElementChild;	
		for (var i = 0; i < termsUnderDiv.length; i++) {	
			if (target.parentNode!=termsUnderDiv[i]) {
				funObj.removeClass(termsUnderDiv[i],'active');
				funObj.getEleByCls(termsUnderDiv[i],'word')[0].innerHTML='more';	
			}else {
				if (moreOrLess.innerHTML==='more') {
					moreOrLess.innerHTML='less';
					funObj.addClass(target.parentNode,'active');
					target.previousElementSibling.scrollTop=0;
				}else {
					moreOrLess.innerHTML='more';
					funObj.removeClass(target.parentNode,'active');				
					target.previousElementSibling.scrollTop=0;
				}

			}
		}		
	}

};