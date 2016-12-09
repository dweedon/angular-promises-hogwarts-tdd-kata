/* eslint-disable angular/window-service */

describe('Course Catalog Module Configuration', function() {
  var $state;

  beforeEach(function() {
    window.module('hogwarts.catalog');

    inject(function(_$state_) {
      $state = _$state_;
    });
  });

  describe('Route', function() {
    it('should respond to URL', function() {
      expect($state.href('catalog')).to.equal('#/catalog');
    });
  });
});
