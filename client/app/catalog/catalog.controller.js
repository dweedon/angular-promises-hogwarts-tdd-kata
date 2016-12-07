angular.module('hogwarts.catalog')

.controller('courseCatalogController', function (Registration) {
  'ngInject';

  var vm = this;

  vm.register = function(courseNumber) {
    Registration.register(courseNumber).then(function(response) {
      vm.response = response;
    });
  };
});
