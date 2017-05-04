app.controller('activationCtrl', function ($scope, $timeout, $stateParams, CONFIG, $state, $utils, $authService, toast, $localStorage) {
  var vm = this;
  vm.phoneNumber = "";
  vm.countryCode = CONFIG.COUNTRY_CODE;
  vm.otp = '';
  vm.doVerify = function () {
    var queryParams = {
      number: CONFIG.COUNTRY_CODE + vm.phoneNumber
    };
    toast.show('OTP Sent Succuessfully.');
    $authService.verifyNumber(queryParams).then(function (response) {
      $utils.showLoading();
      $timeout(function () {
        $utils.hideLoading();
      }, 4000);
      //Response Data - //OTP //UserId
      if ($utils.notBlank(response.data)) {
        vm.otp = response.data.OTP.toString();
        vm.otp1 = vm.otp.charAt(0);
        vm.otp2 = vm.otp.charAt(1);
        vm.otp3 = vm.otp.charAt(2);
        vm.otp4 = vm.otp.charAt(3);
        $localStorage.set('UserId', response.data.UserId);
      }
    });
  };
  vm.completeVerification = function () {
    var inputOtp = vm.otp1 + "" + vm.otp2 + "" + vm.otp3 + "" + vm.otp4;
    console.log(inputOtp);
    if (vm.otp === inputOtp) {
      toast.show('OTP Verified Succuessfully');
      vm.registerDevice();
      $state.go('password');
    } else {
      toast.show('OTP does not match. Try again.');
    }
  };
  vm.registerDevice = function () {

    var request = {
      "UserId": $utils.getUserId(),
      "DeviceTypeId": $utils.getDeviceType(), //1: Android, 2: IOS
      "DeviceId": $utils.getDeviceUUID()
    };
    $authService.updateDeviceToken(request).then(function () {
      console.log('Device Token updated Succuessfully');
    });
  };
});
