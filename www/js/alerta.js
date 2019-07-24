function alerta(mensagem,titulo1,titulo2,botao){
	$('#aviso').show();
	$('#frase_aviso').show();
	$('#titulo_aviso').show();
	$('#botao_aviso').show();
	$('#frase_aviso').html(mensagem);
	$('#titulo_aviso').html(titulo1);
	$('#botao_aviso').html(botao);
	$('.block').css({pointerEvents: "none"});
}