var pictureSource;   // picture source
var destinationType; // sets the format of returned value

// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
}

function onPhotoDataSuccess(imageData) {  
	var data = new FormData();
	
	data.append('file', imageData);
	data.append('id', $("#id_tarefa").val());
  
	$.ajax({
		url: url_geral+"EnviaFoto.php", cache: false, contentType: false, processData: false, data: data, type: 'post',
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
  
	var ft = new FileTransfer();
	ft.upload(imageURI, url_geral+"EnviaFoto.php", function(result){
		console.log(JSON.stringify(result));
	}, function(error){
		 console.log(JSON.stringify(error));
    }, options);
}

function onPhotoURISuccess(imageURI) {
  	var data = new FormData();
	
	data.append('file', imageURI);
	data.append('id', $("#id_tarefa").val());
  
	$.ajax({
		url: url_geral+"EnviaFoto.php", cache: false, contentType: false, processData: false, data: data, type: 'post',
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
  
	var ft = new FileTransfer();
	ft.upload(imageURI, url_geral+"EnviaFoto.php", function(result){
		console.log(JSON.stringify(result));
	}, function(error){
		 console.log(JSON.stringify(error));
    }, options);
  
}

function capturePhoto() {
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
	destinationType: destinationType.DATA_URL });
}

function capturePhotoEdit() {
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, allowEdit: true,
	destinationType: destinationType.DATA_URL });
}

function getPhoto(source) {
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
	destinationType: destinationType.DATA_URL,
	sourceType: source });
}

function onFail(message) {
  alerta('Imagem não selecionada e/ou não foi possível inserir a imagem!', 'Camera/Galeria', 'Camera/Galeria', 'OK');
}