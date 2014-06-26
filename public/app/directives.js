/**
 * Created by Akhil on 21-06-2014.
 */
angular.module('myapp.directives', [])
    .directive('myGrid', function ($http) {

        /* $scope.gridOptions = {
         data: 'myData',
         columnDefs: [{field:'name', displayName:'Name'}, {field:'age', displayName:'Age'}]
         };*/

        var gridOptions = { data: 'myData',
            enableCellEditOnFocus: true,
            enablePaging: true,
            showFooter: true,
            showFilter: true,
            enablePinning: true
            /*,
             plugins: [ plg ]*/
        };

//        $http.get(attrs.ajaxColumnUrl)
//            .success(function (data) {
//                debugger;
//                gridOptions['columnDefs'] = data;
//              })
//            .error(function (data) {
//                console.error(data);
//            }) ;
        return {
            restrict: 'E',
            template: '<div class="gridStyle" ng-grid="gridOptions"></div>',
            scope: {},
            controller: function ($scope, $element, $attrs) {
                var attrs = $attrs;
                $scope.myData = [];
                $scope.gridOptions = {};
                // var plg = new plugin();

                configureGrid();

                // filter and Pagination
//                $scope.filterOptions = {
//                    filterText: "",
//                    useExternalFilter: true
//                };
//                $scope.totalServerItems = 0;
//                $scope.pagingOptions = {
//                    pageSizes: [5, 20, 30],
//                    pageSize: 5,
//                    currentPage: 1
//                };
//                $scope.setPagingData = function(data, page, pageSize){
//                    var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
//                    $scope.myData = pagedData;
//                    $scope.totalServerItems = data.length;
//                    if (!$scope.$$phase) {
//                        $scope.$apply();
//                    }
//                };
//                $scope.getPagedDataAsync = function (pageSize, page, searchText) {
//                    setTimeout(function () {
//                        var data;
//                        if (searchText) {
//                            var ft = searchText.toLowerCase();
//                            $http.get(attrs.ajaxDataUrl).success(function (largeLoad) {
//                                data = largeLoad.filter(function(item) {
//                                    return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
//                                });
//                                $scope.setPagingData(data,page,pageSize);
//                            });
//                        } else {
//                            $http.get(attrs.ajaxDataUrl).success(function (largeLoad) {
//                                $scope.setPagingData(largeLoad,page,pageSize);
//                            });
//                        }
//                    }, 100);
//                };
//
//                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
//
//                $scope.$watch('pagingOptions', function (newVal, oldVal) {
//                    if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
//                        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
//                    }
//                }, true);
//                $scope.$watch('filterOptions', function (newVal, oldVal) {
//                    if (newVal !== oldVal) {
//                        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
//                    }
//                }, true);


                function configureGrid() {
                    debugger;
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("GET", attrs.ajaxColumnUrl, false);
                    xmlhttp.send();
                    var data = xmlhttp.response;
                    console.log(data);
                    gridOptions['columnDefs'] = data;
                    $scope.gridOptions =gridOptions;
                    loadData();
                }

                function loadData() {
                    $http.get(attrs.ajaxDataUrl).success(function (data) {
                        debugger;
                        $scope.myData = data;
                    }).
                        error(function (data) {
                            debugger;
                        });
                }
            },
            link: function (scope, element) {
                debugger;
                //
                // scope.gridOptions ={};
                //  $scope.gridOptions = { };
                /*  var   gridOptions = {
                 columnDefs : [ {field: 'name', displayName:'Name'}, {field: 'age', displayName:'Age'}] ,
                 enableCellEditOnFocus :true ,
                 enablePaging: true,
                 showFooter: true ,
                 data: 'myData'
                 };

                 angular.forEach(gridOptions, function (value, key) {
                 scope.gridOptions[key]   = value;
                 });
                 */
                //    = gridOptions;
            }
        }

    });