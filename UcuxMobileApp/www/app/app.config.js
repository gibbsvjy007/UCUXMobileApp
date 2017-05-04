/**
 * @Vijay Rathod
 */

//Application constant variables
app.constant('CONFIG', {
  'APP_NAME': 'UCUX',
  'APP_VERSION': '1.0.0',
  'BASE_URL': 'http://ucux.co/api/SecurityApi/',
  //'BASE_URL': 'http://localhost:8100/api/SecurityApi/',
  'SYSTEM_LANGUAGE': 'EN',
  'COUNTRY_CODE': "+91"
}).config(function ($ionicConfigProvider) {
  $ionicConfigProvider.navBar.alignTitle('center');
});
