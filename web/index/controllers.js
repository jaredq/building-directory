var indexApp = angular.module('indexApp', ['ngSanitize','ngTouch']);

indexApp.filter('regex', function () {
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

indexApp.controller('indexCtrl', ['$scope', '$sce', '$http', function ($scope, $sce, $http) {
    $scope.searchAlphabet = "";
    $scope.searchKey = "";
    $scope.searchKey2 = "";
    $scope.searchButtonOrResult = true;
    $scope.bldmgt = {};
    $scope.companies = [];
    $scope.company = {};
    $scope.companyInformation = "";
    $scope.companySubs = [];
    $scope.isWelcomePage = true;

    //list-of-company.json
    $http.get('list-of-company.php').
            success(function (data, status, headers, config) {
                $scope.companies = data;
            }).
            error(function (data, status, headers, config) {
                // log error
            });

    //building-management.json
    $http.get('building-management.php').
            success(function (data, status, headers, config) {
                $scope.bldmgt = data;
                $scope.bldmgt.about_us = $sce.trustAsHtml($scope.bldmgt.about_us.replace(/\n/g,"<br>"));;
            }).
            error(function (data, status, headers, config) {
                // log error
            });

    $scope.showCompany = function (c) {
        $scope.company = c;
        $scope.companyInformation = "";
        $scope.companySubs = [];
        $http.get('info-of-company.php?coid=' + c["company_id"]).
                success(function (data, status, headers, config) {
                    $scope.companyInformation = $sce.trustAsHtml(data.replace(/\n/g,"<br>"));
                }).
                error(function (data, status, headers, config) {
                    // log error
                });
                
        $http.get('subs-of-company.php?coid=' + c["company_id"]).
                success(function (data, status, headers, config) {
                    $scope.companySubs = data;
                }).
                error(function (data, status, headers, config) {
                });
                
        show_company();
    };

    $scope.showHome = function () {
        show_listicons();
        $scope.showSortLinks();
        $scope.reset();
    };

    $scope.showBldmgt = function () {
        show_bldmgt();
    };

    $scope.showWelcome = function () {
        location.reload(true);
    };

    $scope.showSortLinks = function () {
        show_sort_links();
    };

    $scope.hideSortLinks = function () {
        hide_sort_links();
    };

    $scope.showSortByLevel = function () {
        show_sortbylevel();
    };
    
    $scope.showSortByAlphabet = function () {
        show_sortbyalphabetical();
        $scope.searchAlphabet = "";
    };
    
    $scope.showSearch = function () {
        show_search();
        $scope.resetSearch();
    };
    
    $scope.showMainbox = function () {
        show_mainbox();
    };
    
    $scope.playClickSound = function() {
        play_click_sound();
    };
    
    $scope.playSwipeSound = function() {
        play_swipe_sound();
    };
    
    $scope.doSearch = function() {
        $scope.searchKey = $scope.searchKey2;
        if (!$scope.isEmpty($scope.searchKey)) {
            $scope.searchButtonOrResult = false;
        }
    };
    
    $scope.backspaceStr = function(s) {
        return backspace_str(s);
    };

    $scope.plusSearchKey = function(c) {
        $scope.searchKey2 = $scope.searchKey2 + c;
        $scope.searchButtonOrResult = true;
    };
    
    $scope.resetSortByAlphabet = function() {
        $scope.searchAlphabet = "";
    };
    
    $scope.resetSearch = function() {
        $scope.searchKey = "";
        $scope.searchKey2 = "";
        $scope.searchButtonOrResult = true;
    };
    
    $scope.resetSearchButtonOrResult = function() {
        $scope.searchButtonOrResult = true;
    };
    
    $scope.reset = function () {
        $scope.resetSortByAlphabet();
        $scope.resetSearch();
        //$scope.bldmgt = {};
        //$scope.companies = [];
        $scope.company = {};
        $scope.companyInformation = "";    
        $scope.companySubs = [];
        $scope.isWelcomePage = false;
        
        $scope.resetIdleTime();
    };

    $scope.resetIdleTime = function () {
        reset_idle_time();
    };

    $scope.isEmpty = function (s) {
        return (s === null || s === "");
    };
    
    setInterval(function () {
        screen_idle_time = screen_idle_time + 1;
        if (!$scope.isWelcomePage && screen_idle_time > 60) {
            $scope.showWelcome();
        }
    }, 1000);
}]);