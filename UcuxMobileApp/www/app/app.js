var modules = ['ionic', 'ngCordova', 'angular.filter'];

var app = angular.module('ucux', modules)
    .run(function($ionicPlatform, $http, $ionicPopup, $rootScope, $ionicPopup, $ionicHistory, $state, $cordovaGoogleAnalytics, CONFIG) {
        $ionicPlatform.ready(function() {
            $rootScope.currentYear = new Date().getFullYear();
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
           
        });
        //toState.name - handle the state change
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

        });
        // handling the application back button
        $rootScope.back = function() {
            $ionicHistory.goBack();
        };
        $ionicPlatform.registerBackButtonAction(function(event) {
            if ($state.current.name == "home") {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Exit',
                    template: 'Are you sure you want to exit?'
                });
                confirmPopup.then(function(res) {
                    if (res) {
                        ionic.Platform.exitApp();
                    } else {
                        console.log('You are not sure');
                    }
                });

            } else {
                $ionicHistory.goBack();
            }
        }, 100);
    });

app.isBrowser = function() {
    var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
    if (app) {
        return false; //Phonegap
    } else {
        return true; //Web
    }
};
