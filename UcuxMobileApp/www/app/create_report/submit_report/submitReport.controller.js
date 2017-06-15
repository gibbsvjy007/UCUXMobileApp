app.controller('SubmitReportCtrl', function ($scope, $rootScope, $state, $localStorage, $reportService, toast, $cordovaCamera, $utils) {
  var vm = this;
  vm.mediaType = "CAMERA";
  vm.previewImage = false;
  vm.init = function () {
    var currentIssue = $localStorage.get('currentIssue');
    $scope.title = currentIssue.Name;
  };
  vm.attachImage = function () {

    var successOk = function (imagePath) {
      if (vm.mediaType === "CAMERA") {
        vm.previewImage = true;
        vm.base64File = imagePath;
        $('.previewImage').attr('src', "data:image/jpeg;base64," + imagePath);
        // vm.previewImage = "data:image/jpeg;base64," + imagePath;

      } else {
        if (ionic.Platform.isAndroid()) {
          if (imagePath.substring(0, 21) === "content://com.android") {
            photo_split = imagePath.split("%3A");
            imagePath = "content://media/external/images/media/" + photo_split[1];
          }
        } else {

        }
        console.log(imagePath);
        var onFSError = function (err) {
          console.log(err);
        };
        var gotFileEntry = function (fileEntry) {
          vm.previewImage = "";
          $('.previewImage').attr('src', fileEntry.nativeURL);
               console.log(fileEntry.nativeURL);
          fileEntry.file(function (file) {
            var reader = new FileReader();
            // Create a function to process the file once it's read
            reader.onloadend = function (event) {
              data = '';
              if (event.target.result.toLowerCase().indexOf('jpeg') >= 1) {
                data = event.target.result.substring(23, event.target.result.length);
              } else {
                data = event.target.result.substring(22, event.target.result.length);
              }
              vm.base64File = data;
              setTimeout(function () {
                vm.previewImage = true;
                //$('.previewImage').attr('src', "data:image/jpeg;base64," + data);
              }, 1000);
            }
            reader.readAsDataURL(file);
          }, onFSError);
        };

        window.resolveLocalFileSystemURL(imagePath, gotFileEntry, onFSError)
      }

    };
    var errorOk = function () {
      toast.show("Can't open Camera or Gallery.");
    };
    var options = {
      quality: 50
    };
    if (vm.mediaType === "GALLERY") {
      options.destinationType = Camera.DestinationType.FILE_URL;
      options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
    } else {
      options.destinationType = Camera.DestinationType.DATA_URL;
      options.sourceType = Camera.PictureSourceType.CAMERA;
      // options.allowEdit = true;
      options.quality = 99;
      options.encodingType = Camera.EncodingType.JPEG;
      // options.targetWidth = 100;
      // options.targetHeight = 100;
      options.popoverOptions = CameraPopoverOptions;
      options.saveToPhotoAlbum = false;
      options.correctOrientation = true;
    }
    $cordovaCamera.getPicture(options).then(successOk, errorOk);
  };
  var getCreateReportDate = function () {
    var d = new Date();
    var dt = $utils.padZero(d.getDate()) + "/" + $utils.padZero(d.getMonth() + 1) + "/" + d.getFullYear() + " " + $utils.padZero(d.getHours()) + ":" + $utils.padZero(d.getMinutes());
    return dt;
  };
  vm.createReport = function (event) {
    event.preventDefault();
    if (vm.previewImage) {
      var finalReportObj = $localStorage.get('FinalReportObj');
      var reporttObj = {
        "UserId": $rootScope.currentUser.UserId,
        "AccountId": $rootScope.currentUser.AccountId,
        "LocationId": $rootScope.currentUser.LocationId,
        "DepartmentId": $rootScope.currentUser.DepartmentId,
        "ZoneId": finalReportObj.zoneId,
        "Category1": finalReportObj.parentCategoryId,
        "Category2": finalReportObj.categoryId,
        "Category3": finalReportObj.subCategoryId,
        "Condition": finalReportObj.condition,
        "Remarks": finalReportObj.remarks,
        "FileBase64String": vm.base64File,
        "IssueDatetime": getCreateReportDate()//dd/MM/yyyy hh:mm
      };
      $reportService.createReport(reporttObj).then(function (response) {
        console.log(response.data);
        toast.show('Report created successfully.');
        $state.go('app.reports');
      }, function (error) {
        //error
        toast.show($message.error);
      });
    } else {
      toast.show("Please attach an Image");
    }

  };

});
