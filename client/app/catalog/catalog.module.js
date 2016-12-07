angular.module('hogwarts.catalog', [])

.config(function($stateProvider) {
  'ngInject';

  $stateProvider.state('catalog', {
    url: '/catalog',
    component: 'courseCatalog',
    resolve: {
      courses: function(Courses) {
        return Courses.getAll();
      },
    },
  });
})

.run(function($templateCache) {
  'ngInject';

  $templateCache.put('catalog.template.html', require('./catalog.template.html'));
});
