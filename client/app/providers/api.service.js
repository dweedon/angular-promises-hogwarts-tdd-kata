angular.module('hogwarts.providers')

.factory('api', function(Restangular) {
  'ngInject';

  return Restangular.withConfig(function(config) {
    config.setBaseUrl('http://localhost:5001');
  });
});
