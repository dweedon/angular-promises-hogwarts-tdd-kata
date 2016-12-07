angular.module('hogwarts.providers')

.factory('Wizards', function(api, $q, Courses) {
  'ngInject';

  function applyCourseData(wizard) {
    return $q
      .all(wizard.courses.map(Courses.getOne))
      .then(function(courses) {
        wizard.courses = courses;
        return wizard;
      });
  }

  return {
    getOne: function(id) {
      return api.one('wizards', id).get().then(applyCourseData);
    },
  };
});
