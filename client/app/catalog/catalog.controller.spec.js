/* eslint-disable angular/window-service */

describe('courseCatalogController', function() {
  var ctrl;
  var mockCourses;
  var mockRegistration;
  var $q;
  var $rootScope;
  var $componentController;

  beforeEach(function() {
    mockCourses = { getAll: sinon.stub() };
    mockRegistration = { register: sinon.stub() };

    window.module('hogwarts', function($provide) {
      $provide.value('Courses', mockCourses);
      $provide.value('Registration', mockRegistration);
    });

    inject(function(_$componentController_, _$q_, _$rootScope_) {
      $componentController = _$componentController_;
      $q = _$q_;
      $rootScope = _$rootScope_;
    });
  });

  beforeEach(function() {
    ctrl = $componentController('courseCatalog');
  });

  describe('on init', function() {
    var courses = ['courses'];

    beforeEach(function() {
      mockCourses.getAll.returns($q.resolve(courses));
      ctrl.$onInit();
      $rootScope.$digest();
    });

    it('should get a list of courses', function() {
      expect(mockCourses.getAll).to.have.been.calledOnce;
    });

    it('should bind a list of courses to the controller', function() {
      expect(ctrl.courses).to.equal(courses);
    });
  });

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
      expect(ctrl.response).to.equal(response);
    });
  });
});
