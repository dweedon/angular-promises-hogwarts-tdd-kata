/* eslint-disable angular/window-service */

describe('wizardSchedule Component', function() {
  var ctrl;
  var $scope;
  var $compile;
  var wizard = 'wizard';

  beforeEach(function() {
    window.module('hogwarts');

    inject(function($rootScope, _$compile_) {
      $scope = $rootScope.$new();
      $compile = _$compile_;
    });
  });

  describe('bindings', function() {
    beforeEach(function() {
      var element = $compile(angular.element(
        '<wizard-schedule wizard="wizard"></course-catalog>'
      ))($scope);

      $scope.wizard = wizard;
      $scope.$apply();

      ctrl = element.controller('wizardSchedule');
    });

    it('should bind courses to the controller', function() {
      expect(ctrl.wizard).to.equal(wizard);
    });
  });
});
