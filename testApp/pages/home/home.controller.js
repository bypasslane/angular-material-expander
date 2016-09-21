angular
  .module('testApp')
  .controller('HomeController', HomeController);


function HomeController($scope) {
  $scope.isExpanded = false;
  $scope.toggle = function () {
    $scope.isExpanded = !$scope.isExpanded;
  };
}
