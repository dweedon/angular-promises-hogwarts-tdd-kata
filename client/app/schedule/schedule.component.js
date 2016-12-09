angular.module('hogwarts.schedule')

.component('wizardSchedule', {
  restrict: 'E',
  bindings: {
    wizard: '<',
  },
  controllerAs: 'vm',
  templateUrl: 'schedule.template.html',
});
