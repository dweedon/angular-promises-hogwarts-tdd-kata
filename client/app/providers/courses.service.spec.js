/* eslint-disable angular/window-service */

describe('Registration Service', function() {
  var Courses;
  var result;
  var courseNumber = 'courseNumber';
  var mockRes = 'mockRes';
  var mockOne = {
    get: sinon.stub(),
    post: sinon.stub(),
  };
  var mockAll = {
    getList: sinon.stub(),
  };
  var mockApi = {
    all: sinon.stub().returns(mockAll),
    one: sinon.stub().returns(mockOne),
  };

  beforeEach(window.module('hogwarts', function($provide) {
    $provide.value('api', mockApi);
  }));

  beforeEach(inject(function(_Courses_) {
    Courses = _Courses_;
  }));

  describe('when getting a list of courses', function() {
    beforeEach(function() {
      mockAll.getList.returns(mockRes);
      result = Courses.getAll();
    });

    it('gets a list of courses', function() {
      expect(mockApi.all).to.have.been.calledWith('courses');
      expect(mockAll.getList).to.have.been.calledOnce;
    });

    it('returns the result', function() {
      expect(result).to.equal(mockRes);
    });
  });

  describe('when getting a single course', function() {
    beforeEach(function() {
      mockOne.get.returns(mockRes);
      result = Courses.getOne(courseNumber);
    });

    it('gets a single course by courseNumber', function() {
      expect(mockApi.one).to.have.been.calledWith('courses', courseNumber);
      expect(mockOne.get).to.have.been.calledOnce;
    });

    it('returns the result', function() {
      expect(result).to.equal(mockRes);
    });
  });
});
