/* eslint-disable angular/window-service */

describe('Wizard Schedule Module Configuration', function() {
  var $state;

  beforeEach(inject(function(_$state_) {
    $state = _$state_;
  }));

  describe('Route', function() {
    it('should respond to URL', function() {
      expect($state.href('schedule')).to.equal('/schedule');
    });

    it('should get a wizard', function() {

    });
  });
});
