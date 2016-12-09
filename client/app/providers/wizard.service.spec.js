/* eslint-disable angular/window-service */

describe('Wizards Service', function() {
  var Wizards;
  var mockApi;

  beforeEach(function() {
    mockApi = { one: sinon.stub() };

    window.module('hogwarts', function($provide) {
      $provide.value('api', mockApi);
    });

    inject(function(_Wizards_) {
      Wizards = _Wizards_;
    });
  });

  describe('when getting a wizard', function() {
    var wizard = 'wizard';

    beforeEach(function () {
      mockApi.one.returns(wizard);
    });

    it('defines the wizard via the api endpoint', function() {
      Wizards.wizard('1');
      expect(mockApi.one).to.have.been.calledWith('wizards', '1');
    });

    it('returns the result', function() {
      expect(Wizards.wizard('1')).to.equal(wizard);
    });
  });

  describe('when getting wizard info', function() {
    var mockWizard = { get: sinon.stub() };
    var wizardInfo = 'wizardInfo';

    beforeEach(function() {
      mockWizard.get.returns(wizardInfo);
    });

    it('gets wizard info from api', function() {
      Wizards.getInfo(mockWizard);
      expect(mockWizard.get).to.have.been.calledOnce;
    });

    it('returns the result', function() {
      Wizards.getInfo(mockWizard);
      expect(Wizards.getInfo(mockWizard)).to.equal(wizardInfo);
    });
  });

  describe('adding a course to a wizard', function() {
    var mockWizard = { post: sinon.stub() };
    var courseNumber = 'courseNumber';
    var postResponse = 'response';

    beforeEach(function() {
      mockWizard.post.returns(postResponse);
    });

    it('should post the new courseNumber to the api', function() {
      Wizards.addCourse(mockWizard, courseNumber);
      expect(mockWizard.post).to.have.been.calledWith('courses', { courseNumber: courseNumber });
    });

    it('should return the response', function() {
      expect(Wizards.addCourse(mockWizard, courseNumber)).to.equal(postResponse);
    });
  });
});
