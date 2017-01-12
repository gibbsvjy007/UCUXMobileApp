/**
 * @Vijay Rathod
 */

//Application constant variables
var BASE_URL = 'http://localhost:8080';
app.constant('CONFIG', {
    'APP_NAME': 'UCUX',
    'APP_VERSION': '1.0.0',
    'BASE_URL': BASE_URL,
    'SYSTEM_LANGUAGE': 'EN'
}).config(function ($ionicConfigProvider) {
	 $ionicConfigProvider.navBar.alignTitle('center');
});
