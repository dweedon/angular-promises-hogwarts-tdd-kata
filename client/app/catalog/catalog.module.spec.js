/* eslint-disable angular/window-service */

describe('Course Catalog Module Configuration', function() {
  var $state;
  var $rootScope;
  var $injector;
  var courses = 'courses';
  var mockCourses = {
    getAll: sinon.stub(),
  };

  beforeEach(window.module('hogwarts', function($provide) {
    $provide.value('Courses', mockCourses);
  }));

  beforeEach(inject(function(
    _$state_,
    _$rootScope_,
    _$injector_
  ) {
    $state = _$state_;
    $rootScope = _$rootScope_;
    $injector = _$injector_;
  }));

  describe('Route', function() {
    beforeEach(function() {
      mockCourses.getAll.returns(courses);

      $state.go('catalog');
      $rootScope.$digest();
    });

    it('should get a list of courses', function() {
      expect(mockCourses.getAll).to.have.been.calledOnce;
    });

    it('resolves a list of courses', function() {
      expect($injector.invoke($state.current.resolve.courses)).to.equal(courses);
    });

    it('should respond to URL', function() {
      expect($state.href('catalog')).to.equal('/catalog');
    });
  });
});
