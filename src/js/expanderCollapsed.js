angular
  .module('material.components.expander')
  .directive('mdExpanderCollapsed', expanderCollapsedDirective);


/**
 * @ngdoc directive
 * @name mdExpanderCollapsed
 * @module material.components.expander
 *
 * @restrict E
 **/
 /*@ngInject*/
function expanderCollapsedDirective() {
  var directive = {
    restrict: 'E',
    compile: compile
  };
  return directive;

  function compile(tElement) {
    tElement.addClass('md-expander-collapsed');
  }
}
