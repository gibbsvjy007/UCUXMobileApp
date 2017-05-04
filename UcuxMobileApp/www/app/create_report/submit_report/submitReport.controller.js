app.controller('SubmitReportCtrl', function($scope, $rootScope, $state, $localStorage, $reportService, toast, $cordovaCamera, $ionicPlatform) {
    var vm = this;
    vm.mediaType = "CAMERA";
    vm.previewImage = false;
    vm.init = function() {
        var currentIssue = $localStorage.get('currentIssue');
        $scope.title = currentIssue.Name;
    };
    vm.attachImage = function() {

        var successOk = function(imagePath) {
            if (vm.mediaType == "CAMERA") {
                vm.previewImage = true;
                vm.base64File = imagePath;
                $('.previewImage').attr('src', "data:image/jpeg;base64," + imagePath);
                // vm.previewImage = "data:image/jpeg;base64," + imagePath;

            } else {
                if (imagePath.substring(0, 21) == "content://com.android") {
                    photo_split = imagePath.split("%3A");
                    imagePath = "content://media/external/images/media/" + photo_split[1];
                }
                var onFSError = function(err) {
                    console.log(err);
                };
                var gotFileEntry = function(fileEntry) {
                    fileEntry.file(function(file) {
                        var reader = new FileReader();
                        // Create a function to process the file once it's read
                        reader.onloadend = function(event) {
                            data = '';
                            if (event.target.result.toLowerCase().indexOf('jpeg') >= 1) {
                                data = event.target.result.substring(23, event.target.result.length);
                            } else {
                                data = event.target.result.substring(22, event.target.result.length);
                            }
                            vm.previewImage = "";
                            vm.base64File = data;
                            setTimeout(function() {
                                vm.previewImage = true;
                                $('.previewImage').attr('src', "data:image/jpeg;base64," + data);
                            }, 1000);
                        }

                        reader.readAsDataURL(file);
                    }, onFSError);
                };

                window.resolveLocalFileSystemURI(imagePath, gotFileEntry, onFSError)
            }

        };
        var errorOk = function() {
            toast.show("Can't open Camera or Gallery.");
        };
        var options = {
            quality: 50
        };
        if (vm.mediaType == "GALLERY") {
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

    vm.createReport = function(event) {
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
                "FileBase64String": vm.base64File
            };
            $reportService.createReport(reporttObj).then(function(response) {
                console.log(response.data);
                toast.show('Report created successfully.');
                $state.go('app.reports');
            }, function(error) {
                //error
                toast.show($message.error);
            });
        } else {
            toast.show("Please attach an Image");
        }

    };

});
