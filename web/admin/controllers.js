var adminApp = angular.module('adminApp', ['ngSanitize', 'angularFileUpload']);

var uploadUrl = (window.location.protocol || 'http:') + '//localhost/building-directory/adm-upload-logo.php';

adminApp.filter('regex', function () {
    return function (input, field, regex, modifier) {
        var patt = new RegExp(regex, modifier);
        var out = [];
        for (var i = 0; i < input.length; i++) {
            if (patt.test(input[i][field]))
                out.push(input[i]);
        }
        return out;
    };
});

adminApp.controller('adminCtrl', ['$scope', '$sce', '$http', '$timeout', '$upload', function ($scope, $sce, $http, $timeout, $upload) {
        $scope.companies = [];
        $scope.company = {};
        $scope.showLoginOrConsole = true;
        $scope.showWhichConsole = null;
        $scope.username = null;
        $scope.loginResultMessage = null;
        $scope.loginUsername = null;
        $scope.loginPassword = null;

        $scope.reset = function () {
            $scope.companies = [];
            $scope.company = {};
            $scope.showLoginOrConsole = true;
            $scope.showWhichConsole = null;
            $scope.username = null;
            $scope.loginResultMessage = null;
            $scope.loginUsername = null;
            $scope.loginPassword = null;
        };

        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";

        $scope.queryCompany = function (id) {
            $scope.company = {};
            //list-of-company
            $http.get('adm-query-co.php?coid=' + id).
                    success(function (data, status, headers, config) {
                        $scope.company = data;
                    }).
                    error(function (data, status, headers, config) {
                        // log error
                    });
        };

        $scope.listCompanies = function () {
            $scope.companies = [];
            //list-of-company
            $http.get('adm-list-co.php').
                    success(function (data, status, headers, config) {
                        $scope.companies = data;
                    }).
                    error(function (data, status, headers, config) {
                        // log error
                    });
        };

        $scope.showComgt = function () {
            $scope.showWhichConsole = "comgt";
            $scope.scrollTop();
        };

        $scope.preCreateCo = function () {
            $scope.createcoResultCode = null;
            $scope.createcoResultMessage = null;
            $scope.company = {};
            $scope.showWhichConsole = "cocreate";
            $scope.scrollTop();
            $("#uploadSmallLogoFileCreate").val(null);
            $scope.uploadSmallLogoFileCreateResultCode = null;
            $scope.uploadSmallLogoFileCreateResultMessage = null;
            $("#uploadLargeLogoFileCreate").val(null);
            $scope.uploadLargeLogoFileCreateResultCode = null;
            $scope.uploadLargeLogoFileCreateResultMessage = null;
        };
        $scope.createCo = function (co) {

            $http.post('adm-create-co.php',
                    {sort_number: co.sort_number,
                        name: co.name,
                        small_logo_path: co.small_logo_path,
                        large_logo_path: co.large_logo_path,
                        lift_bank: co.lift_bank,
                        phone: co.phone,
                        email: co.email,
                        levels: co.levels,
                        website: co.website,
                        information: co.information}).
                    success(function (data, status, headers, config) {
                        $scope.createcoResultCode = data["result_code"];
                        $scope.createcoResultMessage = data["result_message"];
                        if ($scope.createcoResultCode === '0') {
                        } else {
                        }

                        $scope.listCompanies();
                    }).
                    error(function (data, status, headers, config) {
                        // log error
                    });
        };

        $scope.preModifyCo = function (co) {
            $scope.modifycoResultCode = null;
            $scope.modifycoResultMessage = null;
            $scope.queryCompany(co.company_id);
            $scope.showWhichConsole = "comodify";
            $scope.scrollTop();
            $("#uploadSmallLogoFileModify").val(null);
            $scope.uploadSmallLogoFileModifyResultCode = null;
            $scope.uploadSmallLogoFileModifyResultMessage = null;
            $("#uploadLargeLogoFileModify").val(null);
            $scope.uploadLargeLogoFileModifyResultCode = null;
            $scope.uploadLargeLogoFileModifyResultMessage = null;
        };
        $scope.modifyCo = function (co) {

            $http.post('adm-modify-co.php',
                    {company_id: co.company_id,
                        sort_number: co.sort_number,
                        name: co.name,
                        small_logo_path: co.small_logo_path,
                        large_logo_path: co.large_logo_path,
                        lift_bank: co.lift_bank,
                        phone: co.phone,
                        email: co.email,
                        levels: co.levels,
                        website: co.website,
                        information: co.information}).
                    success(function (data, status, headers, config) {
                        $scope.modifycoResultCode = data["result_code"];
                        $scope.modifycoResultMessage = data["result_message"];
                        if ($scope.modifycoResultCode === '0') {

                        } else {
                        }

                        $scope.listCompanies();
                    }).
                    error(function (data, status, headers, config) {
                        // log error
                    });
        };

        $scope.preRemoveCo = function (co) {
            $scope.removecoResultCode = null;
            $scope.removecoResultMessage = null;
            $scope.queryCompany(co.company_id);
            $scope.showWhichConsole = "coremove";
            $scope.scrollTop();

        };
        $scope.removeCo = function (co) {

            $http.post('adm-remove-co.php',
                    {company_id: co.company_id}).
                    success(function (data, status, headers, config) {
                        $scope.removecoResultCode = data["result_code"];
                        $scope.removecoResultMessage = data["result_message"];
                        if ($scope.removecoResultCode === '0') {
                        } else {
                        }

                        $scope.listCompanies();
                    }).
                    error(function (data, status, headers, config) {
                        // log error
                    });
        };

        $scope.login = function () {

            $http.post('adm-login.php',
                    {"login_username": $scope.loginUsername,
                        "login_password": $scope.loginPassword}).
                    success(function (data, status, headers, config) {
                        $scope.loginResultCode = data["result_code"];
                        $scope.loginResultMessage = data["result_message"];
                        if ($scope.loginResultCode === '0') {
                            $scope.loginUsername = null;
                            $scope.loginPassword = null;

                            $scope.showLoginOrConsole = false;
                            $scope.showWhichConsole = "comgt";
                            $scope.username = data["username"];
                            $scope.oldUsername = $scope.username;
                            $scope.newUsername = $scope.username;
                        } else {
                            $scope.showLoginOrConsole = true;
                            $scope.username = null;
                        }

                        $scope.listCompanies();
                    }).
                    error(function (data, status, headers, config) {
                        // log error
                    });
        };

        $scope.logout = function () {
            $http.post('adm-logout.php',
                    {}).
                    success(function (data, status, headers, config) {

                    }).
                    error(function (data, status, headers, config) {
                        // log error
                    });
            $scope.reset();
        };


        $scope.saveAccount = function () {

            $http.post('adm-save-account.php',
                    {"old_username": $scope.oldUsername,
                        "old_password": $scope.oldPassword, "new_username": $scope.newUsername,
                        "new_password": $scope.newPassword,
                        "new_password_again": $scope.newPasswordAgain}).
                    success(function (data, status, headers, config) {
                        $scope.saveaccountResultCode = data["result_code"];
                        $scope.saveaccountResultMessage = data["result_message"];
                        if ($scope.saveaccountResultCode === '0') {
                            $scope.username = $scope.newUsername;
                            $scope.oldUsername = $scope.newUsername;
                            $scope.oldPassword = null;
                            $scope.newPassword = null;
                            $scope.newPasswordAgain = null;
                        }
                    });
        };

        $scope.scrollTop = function () {
            $("html, body").animate({scrollTop: 0}, "slow");
        };

        $scope.fileReaderSupported = window.FileReader != null;
        $scope.uploadRightAway = true;
        $scope.upload = [];
        $scope.selectedFiles = [];

        $scope.onSelectSmallLogoFileCreate = function ($files) {
            return $scope.onFileSelect($files, 0,
                    function (data, status, headers, config) {
                        $scope.uploadSmallLogoFileCreateResultCode = data["result_code"];
                        $scope.uploadSmallLogoFileCreateResultMessage = data["result_message"];
                        if ($scope.uploadSmallLogoFileCreateResultCode === '0') {
                            $scope.company.small_logo_path = data['file_uploaded'];
                        } else {
                            $scope.company.small_logo_path = '';
                        }
                    },
                    function (data, status, headers, config) {
                        $scope.company.small_logo_path = '';
                        $scope.uploadSmallLogoFileCreateResultMessage = data;
                    });
        };

        $scope.onSelectLargeLogoFileCreate = function ($files) {
            return $scope.onFileSelect($files, 1,
                    function (data, status, headers, config) {
                        $scope.uploadLargeLogoFileCreateResultCode = data["result_code"];
                        $scope.uploadLargeLogoFileCreateResultMessage = data["result_message"];
                        if ($scope.uploadLargeLogoFileCreateResultCode === '0') {
                            $scope.company.large_logo_path = data['file_uploaded'];
                        } else {
                            $scope.company.large_logo_path = '';
                        }
                    },
                    function (data, status, headers, config) {
                        $scope.company.large_logo_path = '';
                        $scope.uploadLargeLogoFileCreateResultMessage = data;
                    });
        };

        $scope.onSelectSmallLogoFileModify = function ($files) {
            return $scope.onFileSelect($files, 2,
                    function (data, status, headers, config) {
                        $scope.uploadSmallLogoFileModifyResultCode = data["result_code"];
                        $scope.uploadSmallLogoFileModifyResultMessage = data["result_message"];
                        if ($scope.uploadSmallLogoFileModifyResultCode === '0') {
                            $scope.company.small_logo_path = data['file_uploaded'];
                        } else {
                            $scope.company.small_logo_path = '';
                        }
                    },
                    function (data, status, headers, config) {
                        $scope.company.small_logo_path = '';
                        $scope.uploadSmallLogoFileModifyResultMessage = data;
                    });
        };

        $scope.onSelectLargeLogoFileModify = function ($files) {
            return $scope.onFileSelect($files, 3,
                    function (data, status, headers, config) {
                        $scope.uploadLargeLogoFileModifyResultCode = data["result_code"];
                        $scope.uploadLargeLogoFileModifyResultMessage = data["result_message"];
                        if ($scope.uploadLargeLogoFileModifyResultCode === '0') {
                            $scope.company.large_logo_path = data['file_uploaded'];
                        } else {
                            $scope.company.large_logo_path = '';
                        }
                    },
                    function (data, status, headers, config) {
                        $scope.company.large_logo_path = '';
                        $scope.uploadLargeLogoFileModifyResultMessage = data;
                    });
        };

        $scope.onFileSelect = function ($files, uploadIndex, cbSuccess, cbError) {
            if ($scope.upload[uploadIndex] != null) {
                $scope.upload[uploadIndex].abort();
            }
            $scope.upload[uploadIndex] = null;
            $scope.selectedFiles[uploadIndex] = null;

            if ($files.length > 0) {
                $scope.selectedFiles[uploadIndex] = $files[0];
                var $file = $files[0];
                if ($scope.fileReaderSupported && $file.type.indexOf('image') > -1) {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL($file);
                }
                if ($scope.uploadRightAway) {
                    $scope.start(uploadIndex, cbSuccess, cbError);
                }
            }
        };

        $scope.start = function (uploadIndex, cbSuccess, cbError) {
            //$upload.upload()
            $scope.upload[uploadIndex] = $upload.upload({
                url: uploadUrl,
                method: $scope.httpMethod,
                headers: {'file-upload-index': uploadIndex},
                data: {},
                file: $scope.selectedFiles[uploadIndex],
                fileFormDataName: 'logoFile'
            }).success(function (data, status, headers, config) {
                cbSuccess(data, status, headers, config);
            }).error(function (data, status, headers, config) {
                cbError(data, status, headers, config);
            });
        };

    }]);
