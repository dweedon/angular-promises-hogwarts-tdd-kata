import 'normalize.css';
import 'lodash';
import 'angular';
import 'angular-ui-router';
import 'restangular';

import './providers';
import './catalog';
import './schedule';

angular.module('hogwarts', ['ui.router', 'hogwarts.providers', 'hogwarts.catalog', 'hogwarts.schedule'])

.config(function($locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/catalog');
});
