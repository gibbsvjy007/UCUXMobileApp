var modules = ['ionic', 'ionic.cloud', 'ngCordova', 'angular.filter', 'ionic-toast'];

var app = angular.module('ucux', modules).config(function ($ionicCloudProvider) {
  $ionicCloudProvider.init({
    "core": {
      "app_id": "d2ba6d1c"
    },
    "push": {
      "sender_id": "699382126531",
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          "iconColor": "#343434"
        }
      }
    }
  });
}).run(function ($ionicPlatform, $http, $ionicPopup, $utils, $rootScope, toast, $authService, $ionicPush, $ionicHistory, $state, $cordovaGoogleAnalytics, CONFIG, $localStorage) {
  $ionicPlatform.ready(function () {
    $rootScope.currentYear = new Date().getFullYear();
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    //Save Token
    $ionicPush.register().then(function (t) {
      return $ionicPush.saveToken(t);
    }).then(function (t) {
      console.log('Token saved:', t.token)
      //toast.show("Device Token: " + t.token);
      localStorage.setItem('DeviceToken', t.token);
      var request = {
        "UserId": $utils.getUserId(),
        "DeviceTypeId": $utils.getDeviceType(), //1: Android, 2: IOS
        "DeviceId": t.token
      };
      $authService.updateDeviceToken(request).then(function () {
        console.log('Device Token updated Succuessfully');
        //toast.show("Device Token Updated Successfully..");
      });
    });
  });
  //Set global variables
  $rootScope.baseURL = CONFIG.BASE_URL;
  //toState.name - handle the state change
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    var loggedInUser = $localStorage.get('currentUser');
    var isAppActivated = $localStorage.get('activation');
    if ($utils.notBlank(isAppActivated)) {
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
    } else {
      //$state.go('activation');
    }
    $('.back-text').html("");
    $rootScope.currentUser = loggedInUser;
  });
  // handling the application back button
  $rootScope.back = function () {
    $ionicHistory.goBack();
  };
  $ionicPlatform.registerBackButtonAction(function () {
    if ($state.current.name === "app.create_report" || $state.current.name === "login" || $state.current.name === "activation") {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Exit',
        template: 'Are you sure you want to exit?'
      });
      confirmPopup.then(function (res) {
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
  //PUSH Notification listening
  $rootScope.$on('cloud:push:notification', function (event, data) {
    // {"raw":{"sound":"default","title":"Hello","message":"Hello Vijay! How Are you ?","additionalData":{"url":"test_url"," +
    // ""google.message_id":"0:1493732456383851%52bbbac552bbbac5","coldstart":false,"collapse_key":"com.ionicframework.pimomobileapp543967"," +
    // ""foreground":true}},"text":"Hello Vijay! How Are you ?","title":"Hello","sound":"default","app":{"asleep":false,"closed":false}}
    var msg = data.message;
    console.log('notification received');
    alert(msg.title + ': ' + msg.text);
  });
});
