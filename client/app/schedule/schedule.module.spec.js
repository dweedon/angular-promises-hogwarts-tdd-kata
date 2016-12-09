/* eslint-disable angular/window-service */

describe('Wizard Schedule Module Configuration', function() {
  var $state;
  var $rootScope;
  var $injector;
  var mockWizards;

  beforeEach(function() {
    mockWizards =  {
      wizard: sinon.stub(),
      getInfo: sinon.stub(),
    };

    window.module('hogwarts', function($provide) {
      $provide.value('Wizards', mockWizards);
    });
  });

  beforeEach(inject(function(_$state_, _$rootScope_, _$injector_) {
    $state = _$state_;
    $rootScope = _$rootScope_;
    $injector = _$injector_;
  }));

  describe('Route', function() {
    it('should respond to URL', function() {
      expect($state.href('schedule')).to.equal('/schedule');
    });

    it('should get a wizard', function() {
      var wizardRoute = 'wizardRoute';
      var wizardInfo = 'wizardInfo';

      mockWizards.wizard.returns(wizardRoute);
      mockWizards.getInfo.returns(wizardInfo);

      $state.go('schedule');
      $rootScope.$digest();

      expect(mockWizards.wizard).to.have.been.calledWith('1');
      expect(mockWizards.getInfo).to.have.been.calledWith(wizardRoute);
      expect($injector.invoke($state.current.resolve.wizard)).to.equal(wizardInfo);
    });
  });
});
