var url_geral = "http://unigestor.com.br/unigestor/manserv_api/";
var token     = "H424715433852";

//VOLTAR
function MyCtrl($scope, $ionicHistory) {
  $scope.myGoBack = function() {
    $ionicHistory.goBack();
  };
}
//VOLTAR