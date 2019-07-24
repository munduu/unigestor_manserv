// LISTA TAREFAS
function listaTarefas(data,status_tarefa){
	
	checkConnection();
	
	console.log(data+' - '+status_tarefa);
	
	$("#id_hora").val('');
	$("#id_tarefa").val('');
	$("#id_tarefa_corte").val('');
	
	carregagps();
	
	$.ajax({
	type:"POST", dataType:"json", cache: false, url: url_geral+"ListaTarefas.php",
	data:{"id_colaborador": getCookie('id_colaborador'), "tipo_acesso": getCookie('tipo_acesso'),"data":data,"status_tarefa":status_tarefa},
	timeout: 200000, 
		beforeSend: function(resultado){ 
		 $('.loader').show();
		},
		success: function(resultado){
			if(resultado.error){
				$('.loader').hide();
				$(".tarefas_previstas").css("background-color", "#2980b9");
				$(".tarefas_previstasA").css("color", "white");
				$(".tarefas_completas").css("background-color", "white");
				$(".tarefas_completasA").css("color", "#333");
				alerta(resultado.error.mensagem, 'Alerta', 'Alerta', 'OK');
			}else{
				$('.loader').hide();
				$(".lista_tarefas").empty();
				$.each(resultado.tarefa, function(key,val) {
					$(".lista_tarefas").append('<div class="row" style="margin-bottom:5px;"><a onclick="detalhaTarefa('+val.id+');" style="background:'+val.cor_botao+'; border-radius:5px; color:#FFF; width:100%; text-align:left;" class="button button-full"><span style="font-size:18px;"><strong>Nota: '+val.num_nota+'</strong></span><br><span style="font-size:14px;">Data/Hora Limite:'+val.data_limite+' - '+val.hora_limite+'<br>'+val.endereco+' - '+val.subbairro+'</span></a></div>');
				});
				if(status_tarefa=='no'){
					$(".tarefas_previstas").css("background-color", "#2980b9");
					$(".tarefas_previstasA").css("color", "white");
					$(".tarefas_completas").css("background-color", "white");
					$(".tarefas_completasA").css("color", "#333");
				}else{
					$(".tarefas_completas").css("background-color", "#2980b9");
					$(".tarefas_completasA").css("color", "white");
					$(".tarefas_previstas").css("background-color", "white");
					$(".tarefas_previstasA").css("color", "#333");
				}
			}
		},
		error: function(resultado) {
			console.log(resultado);
		}
		   
	});	
	return false;
}