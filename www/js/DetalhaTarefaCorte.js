function DetalhaTarefaCorte(id){
	
	checkConnection();
		
	$.ajax({
	type:"POST", dataType:"json", cache: false, url: url_geral+"DetalhaTarefaCorte.php",
	data:{"id": id},
	timeout: 200000, 
		beforeSend: function(resultado){ 
		 $('.loader').show();
		},
		success: function(resultado){
			console.log(resultado);
			$('.loader').hide();
			$(".fotos_tarefa").hide();
			
			$("#id_tarefa_corte").val('');
			$("#leitura").val('');
			$("#lacre").val('');
			$("#tipo_ramal").val('');
			$("#metragem_ramal").val('');
			$("#obs").val('');
			$("#execucao").val('');
			$("#tipo_execucao").val('');
			$("#medidor").val('');
			$("#trava").val('');
			
			$.post(url_geral+"ListaExecucao.php", {valor:resultado.tarefa_corte.execucao, tipo_acesso:getCookie('tipo_acesso')}, 
			function(valor){ $("#tipo_execucao").html(valor); $("#tipo_execucao").val(resultado.tarefa_corte.tipo_execucao); });	
			
			$.post(url_geral+"ListaTipoRamal.php", {valor:resultado.tarefa_corte.execucao, tipo_acesso:getCookie('tipo_acesso')}, 
			function(valor){ $("#tipo_ramal").html(valor); $("#tipo_ramal").val(resultado.tarefa_corte.tipo_ramal); });
			
			$("#id_tarefa_corte").val(resultado.tarefa_corte.id);
			$("#leitura").val(resultado.tarefa_corte.leitura);
			$("#lacre").val(resultado.tarefa_corte.lacre);
			$("#tipo_ramal").val(resultado.tarefa_corte.tipo_ramal);
			$("#metragem_ramal").val(resultado.tarefa_corte.metragem_ramal);
			$("#obs").val(resultado.tarefa_corte.observacoes);
			$("#execucao").val(resultado.tarefa_corte.execucao);
			$("#tipo_execucao").val(resultado.tarefa_corte.tipo_execucao);
			$("#medidor").val(resultado.tarefa_corte.medidor);
			$("#trava").val(resultado.tarefa_corte.trava);
			
			if(resultado.tarefa_corte.execucao==27){
				$(".hiddeninput").show();
				$(".label_tipo_exec").html('Tipo Execução*');
			}else{
				$(".hiddeninput").hide();
				$(".label_tipo_exec").html('Motivo Rejeição*');
			}
			
			if(getCookie('tipo_acesso')=='CORTE'){
				$(".hiddenCORTE").hide();
			}else{
				$(".hiddenCORTE").show();
			}
			
			$(".backbutton").attr("onclick","redirect('tarefas.html')");
			$(".backbutton2").attr("onclick","detalhaTarefa("+id+")");
		},
		error: function(resultado) {
			console.log(resultado);
		}
		   
	});	
	return false;
}