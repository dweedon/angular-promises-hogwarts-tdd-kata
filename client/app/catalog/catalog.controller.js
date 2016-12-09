angular.module('hogwarts.catalog')

.controller('courseCatalogController', function (Courses, Registration) {
  'ngInject';

  var vm = this;

  vm.$onInit = function() {
    Courses.getAll().then(function(courses) {
      vm.courses = courses;
    });
  };

  vm.register = function(courseNumber) {
    Registration.register(courseNumber).then(function(response) {
      vm.response = response;
    });
  };
});
