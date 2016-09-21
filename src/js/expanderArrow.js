angular
  .module('material.components.expander')
  .directive('mdExpanderArrow', mdExpanderArrowDirective);


/**
 * @ngdoc directive
 * @name mdExpanderArrow
 * @module material.components.expander
 *
 * @restrict E
 **/
 /*@ngInject*/
function mdExpanderArrowDirective() {
  var directive = {
    restrict: 'E',
    template: '<md-icon class="md-expander-icon" md-svg-icon="icons/ic_keyboard_arrow_right_black_24px.svg"></md-icon>',
    replace: true
  };
  return directive;
}
