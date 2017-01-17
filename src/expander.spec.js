describe('Expander', function () {
  var expander,
      $mdUtil,
      $mdExpander,
      scope,
      controller;

  var disableAnimationStyles = ''+
    '-webkit-transition: none !important;'+
    '-moz-transition: none !important;'+
    '-ms-transition: none !important;'+
    '-o-transition: none !important;'+
    'transition: none !important;';
  window.onload = function () {
    var animationStyles = document.createElement('style');
    animationStyles.type = 'text/css';
    animationStyles.innerHTML = '* {' + disableAnimationStyles + '}';
    document.head.appendChild(animationStyles);
  };

  beforeEach(function () {
    module(
      'ngAnimateMock',
      'material.core',
      'material.core.theming',
      'material.components.expander'
    );
  });

  afterEach(function () {
    if (scope) {
      scope.$destroy();
      scope = undefined;
    }

    if (expander) {
      expander.remove();
      expander = undefined;
    }

  });

  it('should have class `md-scroll-y` when height is set', function () {
    var expander = getDirective({ height: 200 });
    controller.show(true);
    $timeout.flush();
    flushAnimations();
    expect(expander.hasClass('md-expanded')).toBe(true);
    expect(expander.find('md-expander-expanded').hasClass('md-scroll-y')).toBe(true);
  });

  it('should not have class `md-scroll-y` when height is not set', function () {
    var expander = getDirective();
    controller.show(true);
    $timeout.flush();
    flushAnimations();
    expect(expander.hasClass('md-expanded')).toBe(true);
    expect(expander.find('md-expander-expanded').hasClass('md-scroll-y')).toBe(false);
  });

  function getDirective(options) {
    options = options || {};

    inject(function($injector, $compile, $rootScope) {
      $mdUtil = $injector.get('$mdUtil');
      $mdExpander = $injector.get('$mdExpander');
      scope = $rootScope.$new();
      expander = $compile(getTemplate(options))(scope);
      controller = expander.controller('mdExpander');
      $animate = $injector.get('$animate');
      $timeout = $injector.get('$timeout');
    });

    document.body.appendChild(expander[0]);
    expander.scope().$digest();
    return expander;
  }

  function getTemplate(options) {
    options = options || {};
      return $mdUtil.supplant('' +
      '<md-expander {0}>' +
        '<md-expander-expanded>' +
          '<div class="md-expander-content">' +
            '<h3>What</h3>' +
            '<p>content</p>' +
            '<h3>What</h3>' +
            '<p>content</p>' +
          '</div>' +
        '</md-expander-expanded>' +
      '</md-expander>',
      [options.height ? ' height="'+options.height+'" ' : '']);
  }

  function flushAnimations() {
    $animate.flush();
    $timeout.flush();
  }

});
