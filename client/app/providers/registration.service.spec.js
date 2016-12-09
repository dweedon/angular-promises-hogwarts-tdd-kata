/* eslint-disable angular/window-service */

describe('Registration Service', function() {
  var Registration;
  var mockWizards;

  beforeEach(function() {
    mockWizards = {
      wizard: sinon.stub(),
      addCourse: sinon.stub(),
    };

    window.module('hogwarts', function($provide) {
      $provide.value('Wizards', mockWizards);
    });

    inject(function(_Registration_) {
      Registration = _Registration_;
    });
  });


  describe('when registering for a course', function() {
    var courseNumber = 'courseNumber';
    var wizard = 'wizard';
    var response;

    beforeEach(function() {
      mockWizards.wizard.returns(wizard);
      mockWizards.addCourse.returns(Promise.resolve());
      response = Registration.register(courseNumber);
    });

    it('saves the course to the wizard repository', function() {
      expect(mockWizards.wizard).to.have.been.calledWith('1');
      expect(mockWizards.addCourse).to.have.been.calledWith(wizard, courseNumber);
    });

    it('returns a success response', function() {
      return response.then(function(res) {
        expect(res.success).to.be.ok;
      });
    });
  });
});
