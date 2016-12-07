angular.module('hogwarts.catalog')

.component('courseCatalog', {
  restrict: 'E',
  bindings: {
    courses: '<',
  },
  templateUrl: 'catalog.template.html',
  controller: 'courseCatalogController',
  controllerAs: 'vm',
});
