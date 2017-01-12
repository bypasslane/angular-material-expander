angular
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
    var isAnimatedOpen = false;
    var height = isHeightSet ? expanderCtrl.height.replace('px', '') + 'px' : undefined;
    element.addClass('md-expander-expanded');
    expanderCtrl.registerExpanded({
      toggle: toggle
    });


    function toggle(value) {
      scope.$mdOpen = value;
      $mdUtil.nextTick(function () {
        if (value === true) {
          show();
        } else {
          hide();
        }
        isAnimatedOpen = value;
      });
    }




    function show() {
      if (isAnimatedOpen) { return; }
      element.addClass('md-show');
      element.addClass('md-overflow');

      $animateCss(element, {
        from: {'max-height': '0px', opacity: 0},
        to: {'max-height': getHeight(), opacity: 1}
      })
      .start()
      .then(function () {
        if (isHeightSet === true) {
          element.addClass('md-scroll-y');
        } else {
          element.css('max-height', 'none');
        }
        element.removeClass('md-overflow');
      });
    }


    function hide() {
      if (!isAnimatedOpen) { return; }
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
