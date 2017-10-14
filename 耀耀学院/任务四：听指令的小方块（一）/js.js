//优化：
//1、初始样式表不设置旋转角度，js里初始化角度为0
//2、根据命令，在0的基础上设置旋转角度，这样就不用获取当前的旋转角度，根据历史0基础上的推算就可以设置旋转角度
//3、移动可以通过相对定位来实现，不用去改变下一个和当前元素的样式
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
		},//通过旋转的角度来判断朝向
		getDirection:function(ele){		

			if (targetAngle%360===0) {
				ele.direction='up';
			}else if(targetAngle%180===0){
				ele.direction='down';
			}else if(targetAngle>0){
				if((targetAngle%360)%270===0){
					ele.direction='left';
				}else if(targetAngle%90===0){
					ele.direction='right';
				}
			}else if(targetAngle<0){
				if((targetAngle%360)%270===0){
					ele.direction='right';
				}else if(targetAngle%90===0){
					ele.direction='left';
				}
			}
			
			return ele;
		},
		getBestAngle:function(ele,targetDirection,presentAngle){
			var presentDirection=funObj.getDirection(ele).direction;
			
			if (presentDirection===targetDirection) {
				return presentAngle;
			}else {
				if (targetDirection==='up') {
					while(!(presentAngle%360===0)){
						presentAngle=presentAngle+90;
					}
				}else if(targetDirection==='down'){
					while(!(presentAngle%360!=0&&presentAngle%180===0)){
						presentAngle=presentAngle+90;	
					}					
				}else if(targetDirection==='left'){
					if (presentAngle>0) {
						while(!((presentAngle%360)%270===0&&presentAngle%360!=0&&presentAngle%180!=0)){
							presentAngle=presentAngle+90;	
						}						
					}else {
						while(!((presentAngle%360)%90===0&&presentAngle%360!=0&&presentAngle%180!=0&&(presentAngle%360)%270!=0)){
							presentAngle=presentAngle-90;	
						}						
					}
				}else if(targetDirection==='right'){
					if (presentAngle>=0) {
						while(!((presentAngle%360)%90===0&&presentAngle%360!=0&&presentAngle%180!=0&&(presentAngle%360)%270!=0)){
							presentAngle=presentAngle+90;	
						}						
					}else {
						while(!((presentAngle%360)%270===0&&presentAngle%360!=0&&presentAngle%180!=0)){
							presentAngle=presentAngle-90;	
						}						
					}
				}

				return presentAngle;

			}
		},
		getTra:function(ele,eleWidth,eleHight,eleX,eleY,columns,rows,order){
			
			ele=funObj.getDirection(ele);
			var eleLeft=isNaN(parseInt(ele.style.left))?0:(parseInt(ele.style.left)),
			eleTop=isNaN(parseInt(ele.style.top))?0:(parseInt(ele.style.top));

			if (order==='TUN LEF') {
				targetAngle=targetAngle-90;
			}else if(order==='TUN RIG'){
				targetAngle=targetAngle+90;
			}else if(order==='TUN BAC'){
				targetAngle=targetAngle+180;
			}else if(order==='TRA LEF'&&eleLeft>=(eleX-2)*eleWidth){
				ele.style.left=eleLeft-eleWidth+'px';
			}else if(order==='TRA RIG'&&eleLeft<=eleWidth*(columns-eleX-1)){
				ele.style.left=eleLeft+eleWidth+'px';
			}else if(order==='TRA TOP'&&eleTop>=(eleY-2)*eleHight){
				ele.style.top=eleTop-eleHight+'px';
			}else if(order==='TRA BOT'&&eleTop<=eleHight*(rows-eleY-1)){
				ele.style.top=eleTop+eleHight+'px';
			}else if(order==='MOV LEF'&&eleLeft>=(eleX-2)*eleWidth){
				targetAngle=funObj.getBestAngle(ele,'left',targetAngle);
				ele.style.left=eleLeft-eleWidth+'px';
			}else if(order==='MOV RIG'&&eleLeft<=eleWidth*(columns-eleX-1)){
				targetAngle=funObj.getBestAngle(ele,'right',targetAngle);
				ele.style.left=eleLeft+eleWidth+'px';
			}else if(order==='MOV TOP'&&eleTop>=(eleY-2)*eleHight){
				targetAngle=funObj.getBestAngle(ele,'up',targetAngle);
				ele.style.top=eleTop-eleHight+'px';
			}else if(order==='MOV BOT'&&eleTop<=eleHight*(rows-eleY-1)){
				targetAngle=funObj.getBestAngle(ele,'down',targetAngle);
				ele.style.top=eleTop+eleHight+'px';
			}else if(order==='GO'){

				//此处不能用offset偏移，因为偏移需要transition规定的时间来执行
				//因为offset反映的是实时的，而不是实现后的,left是实现后的
				//通过朝向来获取下一个元素

				if(ele.direction==='left'&&eleLeft>=(eleX-2)*eleWidth){
					ele.style.left=eleLeft-eleWidth+'px';
				}else if(ele.direction==='right'&&eleLeft<=eleWidth*(columns-eleX-1)){
					ele.style.left=eleLeft+eleWidth+'px';
				}else if(ele.direction==='up'&&eleTop>=(eleY-2)*eleHight){
					ele.style.top=eleTop-eleHight+'px';
				}else if(ele.direction==='down'&&eleTop<=eleHight*(rows-eleY-1)){
					ele.style.top=eleTop+eleHight+'px';
				}
			}
		}

	};	

	var input=document.getElementsByTagName('input')[0],
	btn=document.getElementsByTagName('button')[0],
	targetAngle=0,
	tarEle=document.getElementById('up'),
	rows=tarEle.parentNode.parentNode.children.length,
	columns=tarEle.parentNode.children.length,
	tarEleWidth=tarEle.offsetWidth,
	tarEleHight=tarEle.offsetHeight,
	tarEleX=Array.prototype.slice.call(tarEle.parentNode.children).indexOf(tarEle)+1,
	tarEleY=Array.prototype.slice.call(tarEle.parentNode.parentNode.children).indexOf(tarEle.parentNode)+1;

	funObj.addEvent(input,'keydown',move,false);
	funObj.addEvent(btn,'click',move,false);

	function move(event){
		var e=funObj.getEvent(event),
		order=input.value;

		if (e.keyCode===13||event.type==='click') {
			funObj.getTra(tarEle,tarEleWidth,tarEleHight,tarEleX,tarEleY,columns,rows,order);
			tarEle.style.transform='rotate('+targetAngle+'deg)';			
			console.log(targetAngle);
		}

	}

};