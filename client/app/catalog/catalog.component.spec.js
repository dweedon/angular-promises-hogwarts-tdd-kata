/* eslint-disable angular/window-service */

describe('courseCatalog Component', function() {
  var ctrl;
  var $scope;
  var $compile;
  var courses = ['courses'];

  beforeEach(window.module('hogwarts', function($provide) {
    $provide.value('Courses', { getAll: sinon.stub() });
  }));

  beforeEach(inject(function($rootScope, _$compile_) {
    $scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  describe('bindings', function() {
    beforeEach(function() {
      var element = $compile(angular.element(
        '<course-catalog courses="courses"></course-catalog>'
      ))($scope);

      $scope.courses = courses;
      $scope.$apply();

      ctrl = element.controller('courseCatalog');
    });

    it('should bind courses to the controller', function() {
      expect(ctrl.courses).to.equal(courses);
    });
  });
});
