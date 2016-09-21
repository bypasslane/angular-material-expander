angular.module('testApp', [
  'ngRoute',
  'ngAnimate',
  'ngMaterial',
  'material.components.expander'
])
  .config(configApp);


configApp.$inject = ['$routeProvider'];
function configApp($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/home/home.html',
      controller: 'HomeController',
      controllerAs: 'vm'
    })
    .otherwise('/');
}
