angular.module('hogwarts.providers')

.factory('Registration', function(Wizards) {
  'ngInject';

  return {
    register: function(courseNumber) {
      return Wizards.addCourse(Wizards.wizard('1'), courseNumber)
        .then(function() {
          return { success: true };
        });
    },
  };
});
