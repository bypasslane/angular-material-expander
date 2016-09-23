angular
  .module('testApp')
  .controller('HomeController', HomeController);


function HomeController($scope, $mdExpander) {
  $scope.isExpanded = false;
  $scope.toggle = function () {
    $scope.isExpanded = !$scope.isExpanded;
  };


  $mdExpander().waitFor('expanderId').then(function (instance) {
    instance.expand();
  });

  $scope.list = [{name: 'one', open: true}, {name: 'two', open: false}];
}
