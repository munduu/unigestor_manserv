function carregaFoto(id){
	
	checkConnection();
		
	$.ajax({
	type:"POST", dataType:"html", cache: false, url: url_geral+"CarregaFoto.php",
	data:{"id": id},
	timeout: 200000, 
		beforeSend: function(resultado){ 
		 $('.loader').show();
		},
		success: function(resultado){
			console.log(resultado);
			$('.loader').hide();
			$("#foto").html(resultado);
		},
		error: function(resultado) {
			console.log(resultado);
		}
		   
	});	
	return false;
}