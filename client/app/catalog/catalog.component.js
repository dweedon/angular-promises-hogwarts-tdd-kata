angular.module('hogwarts.catalog')

.component('courseCatalog', {
  restrict: 'E',
  templateUrl: 'catalog.template.html',
  controller: 'courseCatalogController',
  controllerAs: 'vm',
});
