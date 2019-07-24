function detalhaTarefa(id){
	
	checkConnection();
	carregagps();
	
	$(".detalhaTarefaTopo").css("background-color", "#2980b9");
	$(".detalhaTarefaTopoA").css("color", "white");
	$(".detalhaTarefaFoto").css("background-color", "white");
		$(".detalhaTarefaFotoA").css("color", "#333");
			
	$.ajax({
	type:"POST", dataType:"json", cache: false, url: url_geral+"DetalhaTarefa.php",
	data:{"id": id},
	timeout: 200000, 
		beforeSend: function(resultado){ 
		 $('.loader').show();
		},
		success: function(resultado){
			if(resultado.error){
				$('.loader').hide();
				alerta(resultado.error.mensagem, 'Alerta', 'Alerta', 'OK');
			}else{
				$('.loader').hide();
				console.log(resultado); 
				$('.loader').show();
				$("#CodNomeTarefaDetalhada").html(resultado.tarefa.cod_cliente+'-'+resultado.tarefa.nome_cliente);
				$("#EnderecoTarefaDetalhada").html('<a style="color: #2980b9;" target="_blank" href="http://maps.google.com.br/maps?hl=pt-BR&amp;q='+resultado.tarefa.endereco+'&amp;um=1&amp;ie=UTF-8&amp;sa=N&amp;tab=wl"><i class="fa fa-map-marker color-red"></i> '+resultado.tarefa.endereco+' | Ver Mapa</a>');
				$("#DataHoraTarefaDetalhada").html(resultado.tarefa.data_limite+' - '+resultado.tarefa.hora_limite);
				$("#SubbairroTarefaDetalhada").html(resultado.tarefa.sub_bairro);
				$("#NotaTarefaDetalhada").html(resultado.tarefa.num_nota);
				$("#OSTarefaDetalhada").html(resultado.tarefa.num_os);
				$("#InstacacaoTarefaDetalhada").html(resultado.tarefa.instalacao);
				$("#NumSerieTarefaDetalhada").html(resultado.tarefa.num_serie);
				$("#UnleituraTarefaDetalhada").html(resultado.tarefa.un_leitura);
				$("#ValorTarefaDetalhada").html(resultado.tarefa.valor);
				$("#FaturaTarefaDetalhada").html(resultado.tarefa.fatura);
				$("#id_tarefa").val(resultado.tarefa.id);
				$("#id_hora").val(resultado.tarefa.id_hora);
				$(".tarefaHidden").hide();
				$(".tarefaDetalhadaHidden").show();
				DetalhaTarefaCorte(resultado.tarefa.id);
				$(".dados_tarefa").show();
				$('.loader').hide();
				
				
				if(resultado.tarefa.status=="Executado" || resultado.tarefa.status=="Finalizado"){
					$("#envia_tarefa_corte").hide();
				}else{
					$("#envia_tarefa_corte").hide(); //show
				}
				
				if(resultado.tarefa.mostra_check==1){
					$("#checkin_tarefa").show();
					$("#checkout_tarefa").hide();
				}
				if(resultado.tarefa.mostra_check==2){
					$("#checkin_tarefa").hide();
					$("#checkout_tarefa").show();
				}
				if(resultado.tarefa.mostra_check==3){
					$("#checkin_tarefa").hide();
					$("#checkout_tarefa").hide();
				}
				/* 
				if(resultado.tarefa.mostra_check==0){
					$("#checkin_tarefa").show();
				}else{
					$("#checkin_tarefa").hide();
					$(".tarefa_corte").show();
					
					if(resultado.tarefa.hora_saida==0){
						$("#checkout_tarefa").show();
					}else{
						$("#checkout_tarefa").hide();
						$('.setAlg'). attr('disabled', 'disabled');
					}
				}*/
				
				if(resultado.tarefa.hora_tecnica==true){
					$("#tarefa_aberta").html('<a style="background:#27ae60; border-radius:5px; color:#FFF; width:100%;" class="button button-full" onclick="detalhaTarefa('+resultado.tarefa.id_hora_tecnica+')">A Tarefa '+resultado.tarefa.id_hora_tecnica+' esta aberta, clique aqui!</a>');
					$("#tarefa_aberta").show();
					$("#checkin_tarefa").hide();
					$("#checkout_tarefa").hide();
					$(".tarefa_corte").hide();
				}else{
					$("#tarefa_aberta").hide();
					
				}
				
			}
		},
		error: function(resultado) {
			console.log(resultado);
		}		   
	});	
	return false;
}