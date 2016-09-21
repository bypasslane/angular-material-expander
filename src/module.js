/**
 * @ngdoc module
 * @name material.components.expander
 *
 * @description
 * Expander Component
 */
angular
  .module('material.components.expander', [])
  .config(configExpanderTheme);


/*@ngInject*/
function configExpanderTheme($mdThemingProvider, EXPANDER_THEME) {
  $mdThemingProvider.registerStyles(EXPANDER_THEME);
}
