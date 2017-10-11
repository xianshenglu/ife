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
		},
		getRotateAngle:function(ele){
			var angle;

			if (ele.getAttribute('style')) {
				angle=ele.getAttribute('style').match(/rotate\s*?\([^\d\.-]*?([\d\.-]+)[^\d\.-]*?\)/)[1];				
			}else {
				angle=0;
			}
			
			return Math.round(angle);			
		},
		getDirection:function(ele){
			var angle=funObj.getRotateAngle(ele);
			
			if (angle%360===0) {
				ele.direction='up';
			}else if(angle%180===0){
				ele.direction='down';
			}else if(angle>0){
				if((angle-Math.floor(angle/360)*360)%270===0){
					ele.direction='left';
				}else if(angle%90===0){
					ele.direction='right';
				}
			}else if(angle<0){
				if((angle+Math.floor(angle/-360)*360)%270===0){
					ele.direction='right';
				}else if(angle%90===0){
					ele.direction='left';
				}
			}
			return ele;
		},
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
			console.log(targetAngle);
				console.log();
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