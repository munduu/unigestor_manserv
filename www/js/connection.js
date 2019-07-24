function checkConnection() {
	if(navigator.connection){
		if(navigator.connection.type=="none"){
			alerta('Sem conexão com a Internet!','Atenção','Atenção','ok');
		}
	}
}