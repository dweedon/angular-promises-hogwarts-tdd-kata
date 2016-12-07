/* eslint-disable angular/window-service */

describe('Api Service', function() {
  var api;

  beforeEach(window.module('hogwarts'));

  beforeEach(inject(function(_api_) {
    api = _api_;
  }));

  describe('configuration', function() {
    it('is sets the base url correctly', function() {
      expect(api.configuration.baseUrl).to.equal('http://localhost:5001');
    });
  });
});
