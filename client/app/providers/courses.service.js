angular.module('hogwarts.providers')

.factory('Courses', function(api) {
  'ngInject';

  return {
    getAll: function() {
      return api.all('courses').getList();
    },
    getOne: function(id) {
      return api.one('courses', id).get();
    },
  };
});
