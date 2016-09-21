angular
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
