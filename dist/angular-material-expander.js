(function(){"use strict";/**
 * @ngdoc module
 * @name material.components.expander
 *
 * @description
 * Expander Component
 */
configExpanderTheme.$inject = ["$mdThemingProvider", "EXPANDER_THEME"];
angular
  .module('material.components.expander', [])
  .config(configExpanderTheme);


/*@ngInject*/
function configExpanderTheme($mdThemingProvider, EXPANDER_THEME) {
  $mdThemingProvider.registerStyles(EXPANDER_THEME);
}
}());
(function(){"use strict";angular.module("material.components.expander").run(["$templateCache", function($templateCache) {$templateCache.put("icons/ic_keyboard_arrow_right_black_24px.svg","<svg fill=\"#000000\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z\"/>\n    <path d=\"M0-.25h24v24H0z\" fill=\"none\"/>\n</svg>");}]);}());
(function(){"use strict";angular.module("material.components.expander")

.constant("EXPANDER_THEME", ".md-expander {\n  background: '{{background-hue-1}}'; }\n  .md-expander .md-expander-collapsed .md-title {\n    color: '{{foreground-1}}'; }\n  .md-expander .md-expander-collapsed .md-expander-icon svg {\n    fill: '{{foreground-3}}'; }\n")

;}());
(function(){"use strict";
mdExpanderDirective.$inject = ["$mdTheming", "$parse"];angular
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
  ExpanderController.$inject = ["$scope", "$element", "$attrs", "$mdComponentRegistry"];
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
}());
(function(){"use strict";angular
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
}());
(function(){"use strict";angular
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
}());
(function(){"use strict";
mdExpanderExpandedDirective.$inject = ["$mdUtil", "$animateCss"];angular
  .module('material.components.expander')
  .directive('mdExpanderExpanded', mdExpanderExpandedDirective);


/**
 * @ngdoc directive
 * @name mdExpanderExpanded
 * @module material.components.expander
 *
 * @restrict E
 **/
 /*@ngInject*/
function mdExpanderExpandedDirective($mdUtil, $animateCss) {
  var directive = {
    restrict: 'E',
    require: '^?mdExpander',
    link: link
  };
  return directive;



  function link(scope, element, attr, expanderCtrl) {
    var isHeightSet = expanderCtrl.height !== undefined;
    var height = isHeightSet ? expanderCtrl.height.replace('px', '') + 'px' : undefined;
    element.addClass('md-expander-expanded');
    expanderCtrl.registerExpanded({
      toggle: toggle
    });


    function toggle(value) {
      scope.$mdOpen = value;
      $mdUtil.nextTick(function () {
        if (value === true) {
          expand();
        } else {
          collapse();
        }
      });
    }




    function expand() {
      element.addClass('md-show');
      element.addClass('md-overflow');

      $animateCss(element, {
        from: {'max-height': '0px', opacity: 0},
        to: {'max-height': getHeight(), opacity: 1}
      })
      .start()
      .then(function () {
        if (isHeightSet !== undefined) {
          element.addClass('md-scroll-y');
        } else {
          element.css('max-height', 'none');
        }
        element.removeClass('md-overflow');
      });
    }


    function collapse() {
      element.addClass('md-hide');
      element.removeClass('md-show');
      element.removeClass('md-scroll-y');

      $animateCss(element, {
        from: {'max-height': getHeight(), opacity: 1},
        to: {'max-height': '0px', opacity: 0}
      })
      .start()
      .then(function () {
        element.removeClass('md-hide');
      });
    }

    function getHeight() {
      if (height) {
        return height;
      } else {
        return element[0].scrollHeight + 'px';
      }
    }
  }
}
}());
(function(){"use strict";
mdExpanderService.$inject = ["$mdComponentRegistry", "$log"];angular
  .module('material.components.expander')
  .factory('$mdExpander', mdExpanderService);



/**
  * @ngdoc service
  * @name $mdExpander
  * @module material.components.expander
  *
  * @description
  * `$mdExapnder` controls the `<md-expander>` element
  *
  * @usage
  * The `$mdExpander` service has functions to control the expander based on its `[md-component-id]` name
  *
  * <hljs lang="js">
  *   angular.controller('MyCtrl', function ($scope, $bmdExpander) {
  *     $mdExpander('expanderComponentId').expand();
  *     $mdExpander('expanderComponentId').collapse();
  *     $mdExpander('expanderComponentId').toggle();
  *     $mdExpander('expanderComponentId').isExpanded();
  *   });
  * </hljs>
  */
/*@ngInject*/
function mdExpanderService($mdComponentRegistry, $log) {
  var errorMsg = "mdExpander '{0}' is not available! Did you use md-component-id='{0}'?";
  var service = {
    find: findInstance,
    waitFor: waitForInstance
  };

  return function (handle) {
    if (handle === undefined) { return service; }
    return findInstance(handle);
  };



  function findInstance(handle) {
    var instance = $mdComponentRegistry.get(handle);

    if (!instance) {
      // Report missing instance
      $log.error( $mdUtil.supplant(errorMsg, [handle || ""]) );
      return undefined;
    }

    return instance;
  }

  function waitForInstance(handle) {
    return $mdComponentRegistry.when(handle).catch($log.error);
  }
}
}());