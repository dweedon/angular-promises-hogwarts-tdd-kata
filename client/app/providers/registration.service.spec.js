/* eslint-disable angular/window-service */

describe('Registration Service', function() {
  var Registration;

  var mockOne = {
    post: sinon.stub(),
  };
  var mockApi = {
    one: sinon.stub().returns(mockOne),
  };

  beforeEach(window.module('hogwarts', function($provide) {
    $provide.value('api', mockApi);
  }));

  beforeEach(inject(function(_Registration_) {
    Registration = _Registration_;
  }));

  describe('when registering for a course', function() {
    var courseNumber = 'courseNumber';
    var response = 'response';

    beforeEach(function() {
      mockOne.post.returns(response);
    });

    it('saves the course to the wizard repository', function() {
      Registration.register(courseNumber);
      expect(mockApi.one).to.have.been.calledWith('wizards', '1');
      expect(mockOne.post).to.have.been.calledWith('courses', { courseNumber: courseNumber });
    });

    it('returns the response', function() {
      expect(Registration.register(courseNumber)).to.equal(response);
    });
  });
});
