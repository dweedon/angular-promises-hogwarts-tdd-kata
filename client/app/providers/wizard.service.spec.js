/* eslint-disable angular/window-service */

describe('Wizards Service', function() {
  var $rootScope;
  var $q;
  var Wizards;
  var mockOne = {
    get: sinon.stub(),
  };
  var mockApi = {
    one: sinon.stub().returns(mockOne),
  };
  var mockCourses = {
    getOne: sinon.stub(),
    getAll: sinon.stub(),
  };

  beforeEach(window.module('hogwarts', function($provide) {
    $provide.value('api', mockApi);
    $provide.value('Courses', mockCourses);
  }));

  beforeEach(inject(function(_$rootScope_, _$q_, _Wizards_) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    Wizards = _Wizards_;
  }));

  describe('when getting a wizard', function() {
    var wizard = {
      courses: ['course', 'course'],
    };

    beforeEach(function() {
      mockOne.get.returns($q.resolve(wizard));
      mockCourses.getOne.returns($q.resolve('updated'));
    });

    it('gets a wizard from the api', function() {
      Wizards.getOne('1');
      expect(mockApi.one).to.have.been.calledWith('wizards', '1');
      expect(mockOne.get).to.have.been.calledOnce;
    });

    it('gets course data for each course the wizard is enrolled in', function() {
      Wizards.getOne('1');
      $rootScope.$digest();
      expect(mockCourses.getOne.callCount).to.equal(wizard.courses.length);
      expect(mockCourses.getOne).to.have.been.calledWith('course');
    });
  });
});
