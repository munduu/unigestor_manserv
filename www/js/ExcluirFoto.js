function excluirFoto(linkFoto,id){
	
	checkConnection();
		
	$.ajax({
	type:"POST", dataType:"html", cache: false, url: url_geral+"ExcluirFoto.php",
	data:{"linkFoto": linkFoto},
	timeout: 200000, 
		beforeSend: function(resultado){ 
		 $('.loader').show();
		},
		success: function(resultado){
			console.log(resultado);
			$('.loader').hide();
			alerta('Foto '+resultado+' excluída com sucesso!','Atenção', 'Atenção', 'OK');
			carregaFoto(id);
		},
		error: function(resultado) {
			console.log(resultado);
		}
		   
	});	
	return false;
}