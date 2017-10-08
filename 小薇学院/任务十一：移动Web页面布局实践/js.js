(function(){
	document.addEventListener('DOMContentLoaded',makeRem,false);
	function makeRem() {
		var html=document.documentElement,
		deviceWidth=html.clientWidth,
		designWidth=1000,
		rem=(deviceWidth/designWidth)*100;
		html.style.fontSize=rem+'px';
	}	
})();