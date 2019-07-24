/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 
//BLACK CANVAS*/
 function register_event_handlers()
 {
    
	/* button  LOGIN */
    $(document).on("click", ".btn_login", function(evt)
    {
		
		checkConnection();
		
		var login_email = $("#login-email").val();
		var login_senha = $("#login-senha").val();
		var token_id    = $("#token_id").val();
		
		if(login_email==''){
			alerta('Campo obrigatório vazio: E-mail', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		
		if(login_senha==''){
			alerta('Campo obrigatório vazio: Senha', 'Alerta', 'Alerta', 'OK');
			return false;
		}
		
		//carrega();
					
		$.ajax({
		type:"POST", dataType:"json", cache: false, url: url_geral+"login.php",
		data:{"usuario": login_email,"senha":login_senha,"token_id":token_id},
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
					setCookie('id_colaborador',resultado.user.id_colaborador);
					setCookie('id_veiculo',resultado.user.id_veiculo);
					setCookie('token_login',resultado.user.token_login);
					setCookie('tipo_acesso',resultado.user.tipo_acesso);
					window.location.href = "principal.html"; 
				}
			},
			error: function(resultado) {
				console.log(resultado);
			}
			   
		});	
        return false;
    });
	
	$(document).on("click", "#checkin_tarefa", function(evt)
    {
		
		checkConnection();
		carregagps();
		
		var id_colaborador = getCookie('id_colaborador');
		var id_veiculo     = getCookie('id_veiculo');
		var id_tarefa      = $("#id_tarefa").val();
		var lat            = $(".lat").val();
		var lng            = $(".long").val();
		
		//carrega();
					
		$.ajax({
		type:"POST", dataType:"json", cache: false, url: url_geral+"CheckInTarefa.php",
		data:{"id_colaborador": id_colaborador,"id_veiculo":id_veiculo,"latitude":lat, "longitude":lng, "id_tarefa":id_tarefa },
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
					alerta(resultado.success.msg, 'Sucesso', 'Sucesso', 'OK');
					detalhaTarefa(id_tarefa);
				}
			},
			error: function(resultado) {
				console.log(resultado);
			}
			   
		});	
        return false;
    });
	
	$(document).on("click", "#checkout_tarefa", function(evt)
    {
		
		checkConnection();
		carregagps();
		
		var id_colaborador = getCookie('id_colaborador');
		var id_veiculo     = getCookie('id_veiculo');
		var id_tarefa      = $("#id_tarefa").val();
		var id_hora        = $("#id_hora").val();
		var lat            = $(".lat").val();
		var lng            = $(".long").val();
		
		/*
		if($("#id_tarefa_corte").val()==''){
			alerta('Cadastre os dados da Execução primeiro!', 'Alerta', 'Alerta', 'OK');
			return false;
		}*/
		
		//carrega();
					
		$.ajax({
		type:"POST", dataType:"json", cache: false, url: url_geral+"CheckOutTarefa.php",
		data:{"id_colaborador": id_colaborador,"id_veiculo":id_veiculo,"latitude":lat, "longitude":lng, "id_tarefa":id_tarefa, "id_hora":id_hora },
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
					alerta(resultado.success.msg, 'Sucesso', 'Sucesso', 'OK');
					detalhaTarefa(id_tarefa);
					  setTimeout(function() { window.location.href = "tarefas.html"; }, 3000);
				}
			},
			error: function(resultado) {
				console.log(resultado);
			}
			   
		});	
        return false;
    });
	
	//EXECUCAO e TIPO RAMAL
	$(document).on("change", "#execucao", function(evt)
    {
		checkConnection();
		
		$("#tipo_execucao").html('<option value="0">Carregando...</option>');
		$.post(url_geral+"ListaExecucao.php", {valor:$("#execucao").val(), 
			tipo_acesso:getCookie('tipo_acesso')}, 
			function(valor){ $("#tipo_execucao").html(valor); console.log(valor); 
		});	
		
		$("#tipo_ramal").html('<option value="0">Carregando...</option>');
		$.post(url_geral+"ListaTipoRamal.php", {valor:$("#execucao").val(), 
			tipo_acesso:getCookie('tipo_acesso')}, 
			function(valor){ $("#tipo_ramal").html(valor); console.log(valor); 
		});
		
		if($("#execucao").val()==27){
			$(".hiddeninput").show();
			$(".label_tipo_exec").html('Tipo Execução*');
		}else{
			$(".hiddeninput").hide();
			$(".label_tipo_exec").html('Motivo Rejeição*');
		}
		
	});
	
	$(document).on("click", "#envia_tarefa_corte", function(evt)
    {
		checkConnection();
		
		var id_tarefa       = $("#id_tarefa").val();
		var id_tarefa_corte = $("#id_tarefa_corte").val();
		var leitura         = $("#leitura").val();
		var lacre           = $("#lacre").val();
		var tipo_ramal      = $("#tipo_ramal").val();
		var metragem_ramal  = $("#metragem_ramal").val();
		var obs             = $("#obs").val();
		var execucao        = parseInt($("#execucao").val());
		var tipo_execucao   = parseInt($("#tipo_execucao").val());
		var medidor         = $("#medidor").val();
		var trava           = $("#trava").val();
		
		console.log(execucao);
		console.log(tipo_execucao);
		
		$('.loader').hide();
		
		if($("select[name=execucao]").val() == 0 || $("select[name=execucao]").val() == '' || $("select[name=execucao]").val() == null) {
			alerta("Campo Obrigatório vazio: Execução", 'Alerta', 'Alerta', 'OK');
			return false;
		}
		
		//valida se execução esta com status de executado
		if($("select[name=tipo_execucao]").val() == 0 || $("select[name=tipo_execucao]").val()=='' || $("select[name=tipo_execucao]").val() == null) {
			alerta("Campo Obrigatório vazio: Tipo Execução / Rejeição", 'Alerta', 'Alerta', 'OK');
			return false;
		}
					
		$.ajax({
		type:"POST", dataType:"json", cache: false, url: url_geral+"AtualizaTarefaCorte.php",
		data:{"id_tarefa": id_tarefa, "id_tarefa_corte": id_tarefa_corte,"leitura": leitura, "lacre": lacre, "tipo_ramal": tipo_ramal, "metragem_ramal": metragem_ramal, "obs": obs, "execucao": execucao, "tipo_execucao": tipo_execucao, "medidor": medidor, "trava": trava},
		timeout: 200000, 
			beforeSend: function(resultado){ 
			 $('.loader').show();
			},
			success: function(resultado){
				console.log(resultado);
				detalhaTarefa(id_tarefa);
				$("#id_tarefa_corte").val(resultado.tarefa_corte.id);
				$('.loader').hide();
				//alerta("Enviado com Sucesso!", 'Sucesso', 'Sucesso', 'OK');
				$(".success_envia").show(0).delay(5000).hide(0);
				return false;
			},
			error: function(resultado) {
				console.log(resultado);
				$('.loader').hide();
				alerta("Problemas no envio, tente novamente mais tarde!", 'Alerta', 'Alerta', 'OK');
				return false;
			}
			   
		});	
        return false;
    });	
	
	$("#uploadArquivos").on('change', function(e) {
		checkConnection();
		
		var files = e.target.files;
		console.log(files);
		
		var data = new FormData();
		$.each(files, function(key, value){ data.append(key, value); });
		
		data.append('id', $("#id_tarefa").val());
		
		$.ajax({
			url: url_geral+"EnviaFoto.php?id", cache: false, contentType: false, processData: false, data: data, type: 'post',
			timeout: 200000000, 
			beforeSend: function(resultado){ 
				$('.loader').show();
			},
			success: function(data){
				console.log(data);
				$('.loader').hide();
				alerta('Foto enviado com sucesso!','Sucesso', 'Sucesso', 'OK');
				carregaFoto($("#id_tarefa").val());
			}, 
			error: function(data){
				console.log(data);
				$('.loader').hide();
				alerta('Não foi possível enviar a foto!','Alerta', 'Alerta', 'OK');
			}
		});
	});
	
	$(document).on("click", "#detalhaTarefaFoto", function(evt)
    {
		if($("#id_hora").val() == 0 || $("#id_hora").val() == '' || $("#id_hora").val() == null) {
				
			alerta("Realize CHECK-IN primeiro para enviar as fotos!", 'Alerta', 'Alerta', 'OK');
			return false;
		}
		
		$('.loader').show();
		$(".dados_tarefa").hide();
		$(".tarefaHidden").hide();
		$(".tarefa_corte").hide();
		$(".fotos_tarefa").show();
		$('.loader').hide();
		$('.chbutton').hide();
		
		$(".detalhaTarefaFoto").css("background-color", "#2980b9");
		$(".detalhaTarefaFotoA").css("color", "white");
		$(".detalhaTarefaTopo").css("background-color", "white");
		$(".detalhaTarefaTopoA").css("color", "#333");
		
		carregaFoto($("#id_tarefa").val());
	});
	
	$(document).on("click", "#detalhaTarefaTopo", function(evt)
    {
		$(".fotos_tarefa").hide();
		detalhaTarefa($("#id_tarefa").val());
		
		$(".detalhaTarefaTopo").css("background-color", "#2980b9");
		$(".detalhaTarefaTopoA").css("color", "white");
		$(".detalhaTarefaFoto").css("background-color", "white");
		$(".detalhaTarefaFotoA").css("color", "#333");
	});
	
	$(document).on("click", ".btn_logout", function(evt)
    {
		setCookie('id_colaborador','');
		setCookie('id_veiculo','');
		setCookie('token_login','');
		window.location.href = "main.html"; 
	});
 }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
