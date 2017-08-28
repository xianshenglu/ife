window.onload=function () {
	//常用方法对象
	var funObj={		
		//IE8 不支持 indexOf() 方法
		indexOfCo: function(strOrArr,str){
			var isArr=strOrArr instanceof Array;
			if (isArr) {
				for (var i = 0; i < strOrArr.length; i++) {
					if(strOrArr[i]===str){
						return i;
					}
				}
				return -1;
			}
		},
		//IE8 不支持 trim() 方法
		trimCo:function(str){
			if (str) {
				if (str.trim) {
					return str.trim();					
				}else{
					return str.replace(/^\s+/g,'').replace(/\s+$/g,'');
				}			
			}else{
				return null;
			}
		},
		//第一个子元素节点 
		firstElementChildCo: function(ele){
			var childNodes=ele.childNodes;
			var count=ele.childElementCount;
			if(count>0){
				return ele.firstElementChild;
			}else if (count===0) {
				return null;
			}else if(!childNodes){
				return null;
			}else{
				for (var i = 0; i < childNodes.length; i++) {
					if(childNodes[i].nodeType===1){
						return childNodes[i];
					}
				}
			}
		},
		//数组去重
		uniqueArr: function(array){
			var newArr=[];
			for (var i = 0; i < array.length; i++) {
				if (funObj.indexOfCo(newArr,array[i]) < 0) {
					newArr.push(array[i]);
				}
			}
			return newArr;
		},
		hasClass: function(ele,clsName){
			var clsArr;
			if (ele.className) {				
				clsArr=funObj.trimCo(ele.className).split(/\s+/g);
				clsArr=funObj.uniqueArr(clsArr);
				var index=funObj.indexOfCo(clsArr,clsName);			
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
				clsArr=funObj.trimCo(ele.className).split(/\s+/g);
				clsArr=funObj.uniqueArr(clsArr);
				var index=funObj.indexOfCo(clsArr,clsName);			
				if (index >= 0) {
					clsArr.splice(index,1);
					ele.className=clsArr.join(' ');				
				}
			}else {
				ele.className=clsName;
			}				
		},
		removeClsAll: function(eleCollection,className){
			for (var i = 0; i < eleCollection.length; i++) {
				funObj.removeClass(eleCollection[i],className);
			}
		},
		//增加clasName
		addClass: function (ele,clsName){
			var clsArr;
			if (ele.className) {
				clsArr=funObj.trimCo(ele.className).split(/\s+/g);
				clsArr=funObj.uniqueArr(clsArr);	
				var isExist=funObj.indexOfCo(clsArr,clsName) ;
				if (isExist < 0) {
					clsArr.push(clsName);
					ele.className = clsArr.join(' ');		
				}
			}
		},
		//IE8 不支持 getElementsByClassName
		getElementsByClassNameCo: function(ele,clsName){

			if (ele.getElementsByClassName) {				
				return ele.getElementsByClassName(clsName);
			}else{
				var eleChilds=ele.getElementsByTagName('*');
				var targetEleArr=[];
				if (eleChilds) {
					for (var i = 0; i < eleChilds.length; i++) {						
						if(funObj.hasClass(eleChilds[i],clsName)){
							targetEleArr.push(eleChilds[i]);
						}
					}
					return targetEleArr;
				}
			}
		},
		addEventListenerCo: function(ele,eventType,func,trueOrFalse){
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
	funObj.addEventListenerCo(headerUl,"click",navBgc,false);

	//导航条根据滚动位置切换
	window.onscroll=function(){		
		var docScrollTop=document.body.scrollTop||document.documentElement.scrollTop;	
		var pageHeight=window.innerHeight||document.documentElement.clientHeight;	
		var navHrefArr=['part_question','part_chapter','part_volunteer','part_contact'];
		var firstEleOffsetTop,eleOffsetTop,nextEleOffsetTop,lastEleOffsetTop;
			firstEleOffsetTop=document.getElementById(navHrefArr[0]).offsetTop;
			lastEleOffsetTop=document.getElementById(navHrefArr[navHrefArr.length-1]).offsetTop;
		var isFirstNav,isMiddleNav,isLastNav;
			isFirstNav=docScrollTop<firstEleOffsetTop-pageHeight/2;
			isLastNav=docScrollTop>=lastEleOffsetTop-pageHeight/2;

		outermost:
		for (var i = 0; i < navHrefArr.length-1; i++) {
			eleOffsetTop=document.getElementById(navHrefArr[i]).offsetTop;
			nextEleOffsetTop=document.getElementById(navHrefArr[i+1]).offsetTop;
			isMiddleNav=docScrollTop>=eleOffsetTop-pageHeight/2&&docScrollTop<nextEleOffsetTop-pageHeight/2;
				//还没有滚动到第二个导航
			if (isFirstNav) {
				funObj.removeClsAll(lis,'active');
				funObj.addClass(lis[0],'active');
				break outermost;
			}else if(isMiddleNav){
				//判断是否在 前一个和后一个中间
				funObj.removeClsAll(lis,'active');
				funObj.addClass(lis[i+1],'active');
				console.log((eleOffsetTop-pageHeight/2)+"\n"+(docScrollTop)+"\n"+(nextEleOffsetTop-pageHeight/2)+"\n"+i);
				console.log(lis[i+1].id);
				break outermost;
			}else if(isLastNav){
				//滚动到最后一个导航了
				funObj.removeClsAll(lis,'active');
				funObj.addClass(lis[lis.length-1],'active');
				console.log((eleOffsetTop-pageHeight/2)+"\n"+(docScrollTop)+"\n"+(nextEleOffsetTop-pageHeight/2)+"\n"+i);
				console.log(lis[i+1].id);
				break outermost;
			}			
		}
	};

	//城市活动搜索
	var partSearch=document.getElementById('part_search');
	var partSearchForm=document.forms[0];
	funObj.addEventListenerCo(partSearchForm,"click",showOptDiv,false);

	//part_chapter 新世界篇章
	var partChap=document.getElementById('part_chapter');
	funObj.addEventListenerCo(partChap,"click",changeChap,false);

	//志愿者 更多伸缩变化
	var volTerms=document.getElementById('part_volunteer').children[1];
	funObj.addEventListenerCo(volTerms,"click",moreTerms,false);


	function navBgc(event){
		//event 参数  兼容FF; event.srcElement 兼容IE8
		var target=event.target||event.srcElement;
		funObj.removeClsAll(lis,'active');	
		funObj.addClass(target.parentNode,"active");
	}
	function showOptDiv(event){		
		var target=event.target||event.srcElement;	
		var selectDiv=funObj.getElementsByClassNameCo(partSearchForm,'select');
		var selectDivActive;
		var tarParClsName= target.parentNode.className;
		if (target.tagName.toLowerCase()==='input') {
			showSelectDiv();
		}else if(target.parentNode.tagName.toLowerCase()==='li'){
			showOptValue();
		}else {
			funObj.removeClsAll(selectDiv,'active');
		}
		//展示 下拉城市选项
		function showSelectDiv(){
			funObj.removeClsAll(selectDiv,'active');
			if(tarParClsName&&tarParClsName.indexOf("select")>=0){			
				selectDivActive = target.parentNode;
				funObj.addClass(selectDivActive,"active");
			}			
		}
		//切换 input 值为选中的 li
		function showOptValue(){
			var inputPar=target.parentNode.parentNode.parentNode;
			var targetInput=funObj.firstElementChildCo(inputPar);			
			targetInput.value=target.parentNode.getElementsByTagName('span')[0].innerHTML;
			funObj.removeClass(targetInput.parentNode,'active');
		}
	}
	
	function changeChap(event){		
		var target=event.target||event.srcElement;	
		// IE8 this 指向 window
		var that=this!=window?this:partChap;		
		var partChapTextDiv=funObj.getElementsByClassNameCo(that,'text');
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
		var target=event.target||event.srcElement;	
		//把事件目标换成 moreInfo ，不管点击的是 more 还是 arrow	
		if(funObj.hasClass(target.parentNode,'more_info')){
			target=target.parentNode;
		}else if(funObj.hasClass(target,'more_info')){
			target=target;
		}else{
			//如果 click 的不是 moreInfo 及旗下元素，跳出函数
			return false;
		}		
		var that=this!=window?this:volTerms;
		var termsUnderDiv=that.children;
		
		var moreOrLess=funObj.firstElementChildCo(target);
		for (var i = 0; i < termsUnderDiv.length; i++) {	
			if (target.parentNode!=termsUnderDiv[i]) {
				funObj.removeClass(termsUnderDiv[i],'active');
				funObj.getElementsByClassNameCo(termsUnderDiv[i],'word')[0].innerHTML='more';	
			}else {
				if (moreOrLess.innerHTML==='more') {
					moreOrLess.innerHTML='less';
					funObj.addClass(target.parentNode,'active');					
					target.parentNode.children[1].scrollTop=0;
				}else {
					moreOrLess.innerHTML='more';
					funObj.removeClass(target.parentNode,'active');				
					target.parentNode.children[1].scrollTop=0;
				}

			}
		}		
	}
	// 兼容 IE8 不支持 placeholder 特性,模拟 IE11 的效果，缺点是 select 下拉框跳转有点问题
	function placeholderCo(){
		//检测是否具有 placeholder 特性
		var hasPlaceholder='placeholder' in document.createElement('input');
		if (hasPlaceholder) {
			return true;
		}else{
			/*从所有表单的取 type="text" 元素，节省性能*/
			var forms=document.forms;
			var textEle=[];

			for (var i = 0; i < forms.length; i++) {
				var formEle=forms[i].getElementsByTagName('*');
				for (var j = 0; j < formEle.length; j++) {
					if(formEle[j].type==='text'){
						textEle.push(formEle[j]);
					}
				}
			}		
			
			for (var k = 0; k < textEle.length; k++) {
				if(textEle[k].placeholder){
					textEle[k].value=textEle[k].placeholder;
					funObj.addEventListenerCo(textEle[k],"focus",showPlaceholder,false);
					funObj.addEventListenerCo(textEle[k],"blur",hidePlaceholder,false);
				}
			}
		}

		function showPlaceholder(event){
			var target=event.target||event.srcElement;
			target.value='';
		}

		function hidePlaceholder(event){
			var target=event.target||event.srcElement;
			if (target.value==='') {
				target.value=target.placeholder;
			}
		}
	}
	placeholderCo();

};