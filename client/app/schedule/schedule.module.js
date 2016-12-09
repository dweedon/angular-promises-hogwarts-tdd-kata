angular.module('hogwarts.schedule', [])

.config(function($stateProvider) {
  'ngInject';

  $stateProvider.state('schedule', {
    url: '/schedule',
    component: 'wizardSchedule',
  });
})

.run(function($templateCache) {
  'ngInject';

  $templateCache.put('schedule.template.html', require('./schedule.template.html'));
});
