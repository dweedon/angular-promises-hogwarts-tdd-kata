/* eslint-disable angular/window-service */

describe('Wizard Schedule Module Configuration', function() {
  var $state;
  var $rootScope;
  var $injector;
  var $templateCache;
  var wizard = 'wizard';
  var mockWizardService = {
    getOne: sinon.stub(),
  };

  beforeEach(window.module('hogwarts', function($provide) {
    $provide.value('Wizards', mockWizardService);
  }));

  beforeEach(inject(function(
    _$state_,
    _$rootScope_,
    _$injector_,
    _$templateCache_
  ) {
    $state = _$state_;
    $rootScope = _$rootScope_;
    $injector = _$injector_;
    $templateCache = _$templateCache_;
  }));

  describe('Route', function() {
    it('should respond to URL', function() {
      expect($state.href('schedule')).to.equal('/schedule');
    });

    it('should get a wizard', function() {
      mockWizardService.getOne.returns(wizard);

      $state.go('schedule');
      $rootScope.$digest();

      expect($injector.invoke($state.current.resolve.wizard)).to.equal(wizard);
    });
  });

  describe('Template', function() {
    it('should have a template', function() {
      expect($templateCache.get('schedule.template.html')).to.be.ok;
    });
  });
});
