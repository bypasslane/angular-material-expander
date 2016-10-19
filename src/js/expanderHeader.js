angular
  .module('material.components.expander')
  .directive('mdExpanderHeader', expanderHeaderDirective);


/**
 * @ngdoc directive
 * @name mdExpanderHeader
 * @module material.components.expander
 *
 * @restrict E
 **/
 /*@ngInject*/
function expanderHeaderDirective() {
  var directive = {
    restrict: 'E',
    compile: compile
  };
  return directive;

  function compile(tElement) {
    tElement.addClass('md-expander-header');
  }
}
