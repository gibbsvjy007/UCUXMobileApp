app.controller('loginCtrl', function($scope, $timeout, $stateParams, $state, $utils, $service, toast, $localStorage) {
    var vm = this;
    vm.username = '';
    vm.password = '';
    vm.remember = false;
    $scope.$on("$ionicView.enter", function() {
        var remember = $localStorage.get('remember');
        var loggedInUser = angular.fromJson($localStorage.get('currentUser'));
        if ($utils.notBlank(remember) && remember) {
            vm.remember = true;
            vm.username = loggedInUser.username;
            vm.password = loggedInUser.password;
        }
    });
    vm.doLogin = function() {
        var request = {
            username: vm.username,
            password: vm.password
        };

        $utils.showLoading();
        if ($utils.notBlank(vm.username) && $utils.notBlank(vm.password)) {
            $localStorage.set('currentUser', angular.toJson(request));
            $timeout(function() {
                $utils.hideLoading();
                $state.go('app.reports');
            }, 4000);

            // $service.authenticate(request).then(function(response) {
            //     //success
            //     $localStorage.set('currentUser', request.data); //store username
            //     $state.go('app.reports');
            //     toast.show("Login successfully..");
            // }, function(error) {
            //     //error
            //     toast.show("Something went wrong. Please try again.");
            // });

        } else {
            $utils.hideLoading();
            toast.show("Please Enter Credentials");
        }
    };

    vm.rememberMe = function(remember) {
        console.log(remember);
        $localStorage.set('remember', remember); //store username               
    };

});
