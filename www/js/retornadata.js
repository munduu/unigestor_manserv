//FUNÇÃO DA DATA
function retornadata(dd,tipo){
	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();

	var output = d.getFullYear() + '/' +
    ((''+month).length<2 ? '0' : '') + month + '/' +
    ((''+day).length<2 ? '0' : '') + day;
	
	if(tipo=='br'){
		var output = ((''+day).length<2 ? '0' : '') + day + '/' + ((''+month).length<2 ? '0' : '') + month + '/' + d.getFullYear();
	}else{
		var output = d.getFullYear()+ '/' + ((''+month).length<2 ? '0' : '') + month+ '/' +((''+day).length<2 ? '0' : '') + day ;
	}
	
	return output;
}