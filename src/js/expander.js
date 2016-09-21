angular
  .module('material.components.expander')
  .directive('mdExpander', mdExpanderDirective);


/**
 * @ngdoc directive
 * @name mdExpander
 * @module material.components.expander
 *
 * @restrict E
 **/
 /*@ngInject*/
function mdExpanderDirective($mdTheming, $parse) {
  var directive = {
    restrict: 'E',
    compile: compile,
    controller: ExpanderController
  };
  return directive;


  function compile(tElement, tAttrs) {
    tElement.addClass('md-expander');
    if (tAttrs.width !== undefined) {
      tElement.css('width', tAttrs.width.replace('px', '') + 'px');
    }

    return function postLink(scope, element, attr) {
      $mdTheming(element);
    };
  }


  /*@ngInject*/
  function ExpanderController($scope, $element, $attrs, $mdComponentRegistry) {
    /*jshint validthis:true*/
    var vm = this;

    var expandedCtrl;
    var collapsed = $element[0].querySelector('md-expander-collapsed');
    var expanded = $element[0].querySelector('md-expander-expanded');
    if (expanded === null) {
      throw new Error('<md-expander> : Must contain <md-expander-expanded>');
    }

    var _isExpanded = false;

    vm.height = $attrs.height;
    vm.expand = expand;
    vm.collapse = collapse;
    vm.isExpanded = isExpanded;
    vm.registerExpanded = registerExpanded;


    if ($attrs.mdExpanded !== undefined) {
      var expandedGetter = $parse($attrs.mdExpanded);
      $scope.$watch(function () { return expandedGetter($scope); }, function (newValue) {
        if (newValue === _isExpanded) { return; }
        if (newValue === true) {
          expand();
        } else {
          collapse();
        }
      });
    }

    if (collapsed) {
      angular.element(collapsed).on('click', function () {
        _isExpanded = !_isExpanded;
        $scope.$apply(function () {
          toggle(_isExpanded);
        });
      });
    }

    // register component
    var destroy = $mdComponentRegistry.register(vm, $attrs.mdComponentId);
    $element.on('$destroy', destroy);


    function registerExpanded(ctrl) {
      expandedCtrl = ctrl;
    }

    function expand() {
      _isExpanded = true;
      toggle(_isExpanded);
    }

    function collapse() {
      _isExpanded = false;
      toggle(_isExpanded);
    }

    function toggle(value) {
      $element.toggleClass('md-expanded', value);
      expandedCtrl.toggle(value);
    }

    function isExpanded() {
      return _isExpanded;
    }
  }
}
