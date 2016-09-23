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
    // scope: {
    //   mdExpanded: '?=mdExpanded'
    // }
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
    var expandedGetter;
    var collapsed = $element[0].querySelector('md-expander-collapsed');
    var expanded = $element[0].querySelector('md-expander-expanded');
    if (expanded === null) {
      throw new Error('<md-expander> : Must contain <md-expander-expanded>');
    }

    var _isExpanded = false;
    var listItemContainer = $element.parent();
    if (listItemContainer.hasClass('md-list-item-inner')) {
      listItemContainer.parent().addClass('layout-wrap');
      listItemContainer.parent().append($element);
      $element.css('width', '100%');
    }

    vm.height = $attrs.height;
    vm.expand = expand;
    vm.collapse = collapse;
    vm.isExpanded = isExpanded;
    vm.registerExpanded = registerExpanded;


    if ($attrs.mdExpanded !== undefined) {
      expandedGetter = $parse($attrs.mdExpanded);
      $scope.$watch(function () { return expandedGetter($scope); }, function (newValue) {
        if (newValue === _isExpanded) { return; }
        if (newValue === true) {
          expand(true);
        } else {
          collapse(true);
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

    function expand(noUpdate) {
      _isExpanded = true;
      toggle(_isExpanded);
    }

    function collapse(noUpdate) {
      _isExpanded = false;
      toggle(_isExpanded);
    }

    function toggle(value, noUpdate) {
      noUpdate = noUpdate || false;
      $element.toggleClass('md-expanded', value);
      expandedCtrl.toggle(value);

      if (noUpdate === false && expandedGetter) {
        expandedGetter.assign($scope, value);
      }
    }

    function isExpanded() {
      return _isExpanded;
    }
  }
}
