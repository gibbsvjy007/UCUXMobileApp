app.controller('SubmitReportCtrl', function ($scope, $rootScope, $timeout, $cordovaFileTransfer, $ionicPopup, $state, $cordovaFile, $localStorage, $reportService, toast, $cordovaCamera, $utils) {
  var vm = this;
  vm.mediaType = "CAMERA";
  vm.previewImage = null;
  vm.init = function () {
    var currentIssue = $localStorage.get('currentIssue');
    $scope.title = currentIssue.Name;
  };

  $scope.showAlert = function (title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };
  vm.attachImage = function () {

    var successOk = function (imagePath) {
      // if (vm.mediaType === "CAMERA") {
      //   vm.previewImage = true;
      //   vm.base64File = imagePath;
      //   $('.previewImage').attr('src', "data:image/jpeg;base64," + imagePath);
      //   // vm.previewImage = "data:image/jpeg;base64," + imagePath;
      //
      // } else {
      //   if (ionic.Platform.isAndroid()) {
      //     if (imagePath.substring(0, 21) === "content://com.android") {
      //       photo_split = imagePath.split("%3A");
      //       imagePath = "content://media/external/images/media/" + photo_split[1];
      //     }
      //   } else {
      //
      //   }
      //   console.log(imagePath);
      //   var onFSError = function (err) {
      //     console.log(err);
      //   };
      //   var gotFileEntry = function (fileEntry) {
      //     vm.previewImage = "";
      //     $('.previewImage').attr('src', fileEntry.nativeURL);
      //     console.log(fileEntry.nativeURL);
      //     fileEntry.file(function (file) {
      //       var reader = new FileReader();
      //       // Create a function to process the file once it's read
      //       reader.onloadend = function (event) {
      //         data = '';
      //         if (event.target.result.toLowerCase().indexOf('jpeg') >= 1) {
      //           data = event.target.result.substring(23, event.target.result.length);
      //         } else {
      //           data = event.target.result.substring(22, event.target.result.length);
      //         }
      //         vm.base64File = data;
      //         setTimeout(function () {
      //           vm.previewImage = true;
      //           //$('.previewImage').attr('src', "data:image/jpeg;base64," + data);
      //         }, 1000);
      //       }
      //       reader.readAsDataURL(file);
      //     }, onFSError);
      //   };
      //
      //   window.resolveLocalFileSystemURL(imagePath, gotFileEntry, onFSError)
      // }
      var currentName = imagePath.replace(/^.*[\\\/]/, '');

      //Create a new name for the photo
      var d = new Date(),
        n = d.getTime(),
        newFileName = n + ".jpg";
      var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);

      // Move the file to permanent storage
      $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
        $scope.image = newFileName;
        $('.previewImage').attr('src', $scope.pathForImage($scope.image));
      }, function (error) {
        $scope.showAlert('Error', error.exception);
      });
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
      options.destinationType = Camera.DestinationType.FILE_URI;
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

  // Returns the local path inside the app for an image
  $scope.pathForImage = function (image) {
    if (image === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + image;
    }
  };
  $scope.openGallery = function (e) {
    e.preventDefault();
    $scope.selectedImage = [];
    $('.previewImage').removeAttr('src');
    if (vm.mediaType === "CAMERA") {
      vm.attachImage();
    } else {
      $('#attach_image').click();
    }
  };
  var getCreateReportDate = function () {
    var d = new Date();
    var dt = $utils.padZero(d.getDate()) + "/" + $utils.padZero(d.getMonth() + 1) + "/" + d.getFullYear() + " " + $utils.padZero(d.getHours()) + ":" + $utils.padZero(d.getMinutes());
    return dt;
  };
  var readURL = function ($files) {
    if ($files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('.previewImage').attr('src', e.target.result);
      }

      reader.readAsDataURL($files[0]);
    }
  };
  $scope.onFileSelect = function ($files) {
    console.log($files);
    $scope.selectedImage = $files;
    readURL($files);
  };
  $scope.selectedImage = [];
  vm.progressval = 0;
  $scope.uploadDocument = function () {
    var formData = new FormData();
    var xhr = new XMLHttpRequest();
    var filegateUrl = $rootScope.baseURL + 'uploadfiles';
    xhr.open("POST", filegateUrl, true);

    if (vm.mediaType === "CAMERA") {
      // File for Upload
      var targetPath = $scope.pathForImage($scope.image);
      console.log($scope.image);
      console.log(targetPath);
      var filename = $scope.image;
      var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params: {'fileName': filename}
      };

      $cordovaFileTransfer.upload(filegateUrl, targetPath, options).then(function (result) {
        //$scope.showAlert('Success', 'Image upload finished.');
        if (result.responseCode === 200) {
          vm.progressval = 10;
          $timeout(function () {
            vm.progressval = 100;
            vm.previewImage = JSON.parse(result.response);
            vm.createReport(JSON.parse(result.response));
            vm.progressval = 0;
          }, 2000);
        }
      });
    } else {
      formData.append("file", $scope.selectedImage[0]);
      xhr.send(formData);
    }

    // Listen to the upload progress.
    xhr.upload.onprogress = function (e) {
      if (e.lengthComputable) {
        $scope.$apply(function () {
          vm.progressval = parseInt((e.loaded / e.total)) * 100;
        });
        console.log(e);
        console.log(vm.progressval);
      }
    };
    xhr.onreadystatechange = function () {
      console.log(xhr.responseText);
      if (xhr.readyState != 4)
        return;
      console.log("xhr.readyState = " + xhr.readyState);
      if (!xhr.responseText)
        return;
      try {
        console.log(xhr.responseText);
        vm.previewImage = JSON.parse(xhr.responseText);
        vm.createReport(JSON.parse(xhr.responseText));
        vm.progressval = 0;
      } catch (e) {
        console.log("Wrong return value from FileGateServlet (cloud); xhr.responseText: " + xhr.responseText + "; exception: " + e);
      }

    };

  };
  vm.createReport = function (imagePath) {
    if (imagePath) {
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
        "ImageFileName": imagePath,
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
