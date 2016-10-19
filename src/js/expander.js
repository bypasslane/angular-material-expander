angular
  .module('material.components.expander')
  .directive('mdExpander', mdExpanderDirective);

var uid = 0;
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
    var expandedGetter;
    var header = $element[0].querySelector('md-expander-header');
    var expanded = $element[0].querySelector('md-expander-expanded');
    if (expanded === null) {
      throw new Error('<md-expander> : Must contain <md-expander-expanded>');
    }

    var _isOpen = false;
    var listItemContainer = $element.parent();
    if (listItemContainer.hasClass('md-list-item-inner')) {
      listItemContainer.parent().addClass('layout-wrap');
      listItemContainer.parent().append($element);
      $element.css('width', '100%');
    }

    vm.height = $attrs.height;
    vm.show = show;
    vm.hide = hide;
    vm.isOpen = isOpen;
    vm.registerExpanded = registerExpanded;


    if ($attrs.mdComponentId === undefined) {
      $attrs.$set('mdComponentId', '_expander_id_' + (uid++));
      registerPanel();
    } else {
      $attrs.$observe('mdComponentId', function() {
        registerPanel();
      });
    }


    if ($attrs.mdExpanded !== undefined) {
      var expandedInited = false;
      expandedGetter = $parse($attrs.mdExpanded);
      $scope.$watch(function () { return expandedGetter($scope); }, function (newValue) {
        if (newValue === _isOpen) { return; }
        var animate = expandedInited;
        if (newValue === true) {
          show(animate, true);
        } else {
          hide(animate, true);
        }
        expandedInited = true;
      });
    }

    if (header) {
      angular.element(header).on('click', function () {
        _isOpen = !_isOpen;
        $scope.$apply(function () {
          toggle(_isOpen);
        });
      });
    }

    // register component
    function registerPanel() {
      var destroy = $mdComponentRegistry.register(vm, $attrs.mdComponentId);
      $element.on('$destroy', destroy);
    }


    function registerExpanded(ctrl) {
      expandedCtrl = ctrl;
    }

    function show(animate, noUpdate) {
      _isOpen = true;
      toggle(_isOpen, animate, noUpdate);
    }

    function hide(animate, noUpdate) {
      _isOpen = false;
      toggle(_isOpen, animate, noUpdate);
    }

    function toggle(value, animate, noUpdate) {
      noUpdate = noUpdate || false;
      $element.toggleClass('md-no-animation', animate === false);
      $element.toggleClass('md-expanded', value);
      expandedCtrl.toggle(value);

      if (noUpdate === false && expandedGetter) {
        expandedGetter.assign($scope, value);
      }
    }

    function isOpen() {
      return _isOpen;
    }
  }
}
