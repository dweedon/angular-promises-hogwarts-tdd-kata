angular.module('hogwarts.providers')

.factory('Registration', function(api) {
  'ngInject';

  return {
    register: function(courseNumber) {
      return api.one('wizards', '1')
        .post('courses', { courseNumber: courseNumber });
    },
  };
});
