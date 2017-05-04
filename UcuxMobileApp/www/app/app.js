var modules = ['ionic', 'ngCordova', 'angular.filter', 'ionic-toast'];

var app = angular.module('ucux', modules)
    .run(function($ionicPlatform, $http, $ionicPopup, $utils, $rootScope, $ionicPopup, $ionicHistory, $state, $cordovaGoogleAnalytics, CONFIG, $localStorage) {
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
        //Set global variables
        $rootScope.baseURL = CONFIG.BASE_URL;
        //toState.name - handle the state change
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            var loggedInUser = $localStorage.get('currentUser');
            var isAppActivated = $localStorage.get('activation');
            if (isAppActivated) {
                if ($utils.notBlank(loggedInUser)) {
                    if (toState.name == 'login' || toState.name == 'activation') {
                        $state.go('app.create_report');
                    }
                } else {
                    if (toState.name == 'password') {
                        $state.go('password');
                    } else {
                        $state.go('login');
                    }

                }

            }
            $('.back-text').html("");
            $rootScope.currentUser = loggedInUser;
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
