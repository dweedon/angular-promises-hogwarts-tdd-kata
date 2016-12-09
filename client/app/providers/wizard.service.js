angular.module('hogwarts.providers')

.factory('Wizards', function(api) {
  'ngInject';

  return {
    getInfo: function(wizard) {
      return wizard.get();
    },
    wizard: function(id) {
      return api.one('wizards', id);
    },
    addCourse: function(wizard, courseNumber) {
      return wizard.post('courses', { courseNumber: courseNumber });
    },
  };
});
