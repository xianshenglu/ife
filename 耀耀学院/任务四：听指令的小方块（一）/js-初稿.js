//初稿：
//1、通过行内样式设置旋转角度来覆盖样式表的旋转角度，化繁为简，方便后期获取最新的旋转角度
//2、根据获得的当前的旋转角度和命令，推算和设置接下来的旋转角度，控制方向
//3、通过当前的旋转角度可以获取朝向，根据朝向获取下一个元素
//4、设置下一个元素的样式，同时清空当前元素的样式

window.onload=function () {	
	var funObj={
		getEvent:function(event){
			return event||window.event;
		},
		addEvent:function(ele,type,fn,bool){
			if (ele.addEventListener) {
				ele.addEventListener(type,fn,bool);
			}else if(ele.attachEvent){
				ele.attachEvent('on'+type,fn);
			}
		},
		getIndexOf:function(strOrArr,str){
			if(strOrArr.indexOf){
				return strOrArr.indexOf(str);
			}else {
				if (typeof strOrArr === 'string') {
					//暂时没填;
				}else if(strOrArr instanceof Array){
					var i;
					for (i = 0; i < strOrArr.length; i++) {
						if(strOrArr[i]===str){
							break;
						}
					}
					return i;
				}
			}
		},//通过行内样式来获取旋转角度
		getRotateAngle:function(ele){
			var angle;

			if (ele.getAttribute('style')) {
				angle=ele.getAttribute('style').match(/rotate\s*?\([^\d\.-]*?([\d\.-]+)[^\d\.-]*?\)/)[1];				
			}else {
				angle=0;
			}

			return Math.round(angle);			
		},//通过旋转的角度来判断朝向
		getDirection:function(ele){
			var angle=funObj.getRotateAngle(ele);
			
			if (angle%360===0) {
				ele.direction='up';
			}else if(angle%180===0){
				ele.direction='down';
			}else if(angle>0){
				if((angle%360)%270===0){
					ele.direction='left';
				}else if(angle%90===0){
					ele.direction='right';
				}
			}else if(angle<0){
				if((angle%360)%270===0){
					ele.direction='right';
				}else if(angle%90===0){
					ele.direction='left';
				}
			}
			return ele;
		},//通过朝向来获取下一个元素
		getNextEle:function(ele){
			var nextEle,targetEleIndex;
			ele=funObj.getDirection(ele);
			targetEleIndex=funObj.getIndexOf(Array.prototype.slice.call(ele.parentNode.children),ele);

			if(ele.direction==='left'){
				if (ele.previousElementSibling) {
					nextEle=ele.previousElementSibling;
				}else{
					nextEle=ele;
				}
			}else if(ele.direction==='right'){
				if (ele.nextElementSibling) {
					nextEle=ele.nextElementSibling;
				}else{
					nextEle=ele;
				}
			}else if(ele.direction==='up'){
				if (ele.parentNode.previousElementSibling) {
					nextEle=ele.parentNode.previousElementSibling.children[targetEleIndex];					
				}else {
					nextEle=ele;
				}
			}else if(ele.direction==='down'){
				if (ele.parentNode.nextElementSibling) {
					nextEle=nextEle=ele.parentNode.nextElementSibling.children[targetEleIndex];					
				}else {
					nextEle=ele;
				}
			}

			return nextEle;

		}
	};
	var input=document.getElementsByTagName('input')[0],
	btn=document.getElementsByTagName('button')[0];
	funObj.addEvent(input,'keydown',move,false);
	funObj.addEvent(btn,'click',move,false);
	function move(event){
		var event=funObj.getEvent(event),
		order=input.value,		
		targetEle=document.getElementsByClassName('up')||document.getElementsByClassName('right')||document.getElementsByClassName('down')||document.getElementsByClassName('left');
		targetEle=targetEle[0];
		var targetAngle=funObj.getRotateAngle(targetEle);

		if (event.keyCode===13||event.type==='click') {

			if (order==='TUN LEF') {
				targetAngle=targetAngle-90;
			}else if(order==='TUN RIG'){
				targetAngle=targetAngle+90;
			}else if(order==='TUN BAC'){
				targetAngle=targetAngle+180;
			}

			targetEle.style='transform:rotate('+targetAngle+'deg)';
			var nextTargetEle=funObj.getNextEle(targetEle);

			if (order==='GO'&&nextTargetEle!=targetEle) {
				nextTargetEle.style=targetEle.getAttribute('style');
				setTimeout(function(){
					targetEle.style='';
					nextTargetEle.className='up';
					targetEle.className='';					
				},1);
			}
		}
	}

};