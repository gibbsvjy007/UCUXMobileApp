app.controller('loginCtrl', function($scope, $timeout, $stateParams, $ionicPopup,CONFIG, $state, $utils, $authService, toast, $localStorage) {
    var vm = this;
    vm.username = '';
    vm.password = '';
    vm.remember = false;
    $scope.$on("$ionicView.enter", function() {
        // var remember = $localStorage.get('remember');
        // var loggedInUser = angular.fromJson($localStorage.get('currentUser'));
        // if ($utils.notBlank(remember) && remember) {
        //     vm.remember = true;
        //     vm.username = loggedInUser.username;
        //     vm.password = loggedInUser.password;
        // }
      vm.countryCode = CONFIG.COUNTRY_CODE;
    });
    vm.doLogin = function() {
        var request = {
            "ContactNo": CONFIG.COUNTRY_CODE + vm.username,
            "Password": vm.password
        };

        $utils.showLoading();
        if ($utils.notBlank(vm.username) && $utils.notBlank(vm.password)) {
            // $localStorage.set('currentUser', angular.toJson(request));
            $authService.authenticate(request).then(function(response) {
                //success
                $localStorage.set('currentUser', response.data); //store username
                $state.go('app.create_report');
                toast.show("Login successfully..");
            }, function(error) {
                //error
                toast.show("Something went wrong. Please try again.");
            });

        } else {
            $utils.hideLoading();
            toast.show("Please Enter Credentials");
        }
    };

    vm.rememberMe = function(remember) {
        console.log(remember);
        $state.go('password');
        // $scope.data = {}

        // // An elaborate, custom popup
        // var myPopup = $ionicPopup.show({
        //     template: '<input type="email" ng-model="data.email">',
        //     title: 'Forgot Password',
        //     subTitle: 'Please enter an email',
        //     scope: $scope,
        //     buttons: [
        //         { text: 'Cancel' }, {
        //             text: '<b>Send</b>',
        //             type: 'button-positive',
        //             onTap: function(e) {
        //                 if (!$scope.data.email) {
        //                     //don't allow the user to close unless he enters wifi password
        //                     e.preventDefault();
        //                 } else {
        //                     return $scope.data.email;
        //                 }
        //             }
        //         },
        //     ]
        // });
        // myPopup.then(function(res) {

        //     var request = {
        //         email: $scope.data.email
        //     };
        //     if (res) {
        //         $authService.forgotPassword(request).then(function(response) {}, function(error) {
        //             //error
        //             toast.show("Something went wrong. Please try again.");
        //         });
        //     } else {
        //         myPopup.close();
        //     }
        //     console.log('Tapped!', res);
        // });

        //$localStorage.set('remember', remember); //store username

    };

});
