/* eslint-disable angular/window-service */

describe('courseCatalogController', function() {
  var ctrl;
  var $rootScope;
  var $q;
  var mockRegistration = { register: sinon.stub() };
  var mockCourses = { getAll: sinon.stub() };

  beforeEach(window.module('hogwarts', function($provide) {
    $provide.value('Courses', mockCourses);
    $provide.value('Registration', mockRegistration);
  }));

  beforeEach(inject(function(
    $componentController,
    _$rootScope_,
    _$q_
  ) {
    ctrl = $componentController('courseCatalog');
    $rootScope = _$rootScope_;
    $q = _$q_;
  }));

  describe('when registering for a course', function() {
    var courseId = 'courseId';
    var response = 'response';

    beforeEach(function() {
      mockRegistration.register.returns($q.resolve(response));
      ctrl.register(courseId);

      $rootScope.$digest();
    });

    it('adds the course to the wizard\'s schedule', function() {
      expect(mockRegistration.register).to.have.been.calledWith(courseId);
    });

    it('binds the registration response', function() {
      expect(ctrl.response).to.deep.equal(response);
    });
  });
});
