//botão voltar
var cont = 0;
document.addEventListener('deviceready', function() {
		
	var exitApp = false, intval = setInterval(function (){exitApp = false;}, 1000);
	document.addEventListener("backbutton", function (e){
		e.preventDefault();
		if (exitApp) {
			clearInterval(intval) 
			(navigator.app && navigator.app.exitApp()) || (device && device.exitApp())
		}
		else {
			exitApp = true
			history.back(1);
			
			var pagina 	= window.location.href;
			var tags 	= pagina.split("#");
			var tag 	= tags[1];
			
			console.log(tag);
		} 
	}, false);
}, false);