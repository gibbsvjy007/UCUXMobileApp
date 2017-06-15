app.controller('passwordCtrl', function($scope, $timeout, $stateParams, $state, $utils, $authService, toast, $localStorage) {
    var vm = this;
    vm.password = '';
    vm.confirmPassword = '';
    vm.changePassword = function() {
        if (vm.password !== "" && vm.password !== vm.confirmPassword) {
            toast.show('Passwords does not match');
            return;
        } else if (vm.password === "") {
            toast.show('Please enter password');
            return;
        } else {
            var request = {
                "UserId": $utils.getUserId(),
                "Password": vm.password,
                "DeviceTypeId": $utils.getDeviceType(), //1: Android, 2: IOS
                "DeviceId": $utils.getDeviceUUID()
            };
            $authService.createUserPassword(request).then(function(response) {
                toast.show('Password created successfully.');
                $localStorage.set('activation', true);
                $state.go('login');
            });
        }
    };


});
