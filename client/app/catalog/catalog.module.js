angular.module('hogwarts.catalog', ['ui.router'])

.config(function($stateProvider) {
  'ngInject';

  $stateProvider.state('catalog', {
    url: '/catalog',
    component: 'courseCatalog',
  });
})

.run(function($templateCache) {
  'ngInject';

  $templateCache.put('catalog.template.html', require('./catalog.template.html'));
});
