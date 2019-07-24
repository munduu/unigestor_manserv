function carregagps(){
	
	function onSuccess(position) {
		$(".lat").val(position.coords.latitude);
		$(".long").val(position.coords.longitude);
	}
	function onError(error) {
		if(error.code==2){
			carregagps();
		}else{
			alerta('Ative seu GPS (Geolocalizador) para ativer esta função!','Atenção','Atenção','ok');
		}
	}
	
	var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });
}