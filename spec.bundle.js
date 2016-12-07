import 'angular';
import 'angular-mocks';
import 'chai-as-promised';
import './client/app/app';

const context = require.context('./client/app', true, /\.spec\.js/);

context.keys().forEach(context);
