angular.module('hogwarts.schedule')

.component('wizardSchedule', {
  restrict: 'E',
  bindings: {
    wizard: '<',
  },
  templateUrl: 'schedule.template.html',
});
