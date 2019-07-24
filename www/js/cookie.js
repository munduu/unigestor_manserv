//Funções do COOKIE INICIO
function setCookie(cname,cvalue) {
	localStorage.setItem(cname, cvalue);
 }
function getCookie(cname){
	return localStorage.getItem(cname);
}