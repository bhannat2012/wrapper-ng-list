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
            enablePinning: true,
            enableColumnResize: true,
            enableSorting: false, headerRowHeight: 25
            /*,
             headerRowTemplate : ' <div class="ngHeaderSortColumn {{col.headerClass}}" ng-style="{\'cursor\': col.cursor}" ng-class="{ \'ngSorted\': !noSortVisible }">' +
             '  <div ng-click="col.sort($event)" ng-class="\'colt\' + col.index" class="ngHeaderText">{{col.displayName}}</div> ' +
             '  <div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div> ' +
             ' <div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div> '+
             ' <div class="ngSortPriority">{{col.sortPriority}}</div>  '+
             ' <div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show="col.pinnable"></div> ' +
             ' </div> '*/
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
            template: '<div> <a> <i class="fa fa-fw" ng-click="showSearch()"></i> </a></div>' +
                '<div class="gridStyle" ng-grid="gridOptions"></div>',
            scope: {},
            controller: function ($scope, $element, $attrs) {
                var attrs = $attrs;
                $scope.myData = [];
                $scope.gridOptions = {};
                $scope.showSearch = false;
                $scope.gridSearch = [
                    {},
                    {text: ''}
                ];
                $scope.getShowSearch = function () {
                    return $scope.showSearch;
                };
                // var plg = new plugin();
                // filter and Pagination
                /*   $scope.filterOptions = {
                 filterText: "",
                    useExternalFilter: true
                 };*/
                $scope.totalServerItems = 0;
                $scope.pagingOptions = {
                    pageSizes: [5, 20, 30],
                    pageSize: 5,
                    currentPage: 1
                };
                $scope.setPagingData = function (data, page, pageSize, total) {
                    // var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
                    $scope.myData = data;
                    $scope.totalServerItems = total;
                    // debugger;
                    setTimeout(function () {
                        if (!$scope.$$phase && !$scope.$root.$$phase) {
                            $scope.$apply();
                            //  $scope.safeApply() ;
                        }
                    }, 100);
                };
                $scope.showMSG = function () {
                    alert('click');
                };
                $scope.showSearch = function () {
                    // alert('show-search');
                    debugger;
                    $scope.showSearch = true;
                    jQuery('.ngTopPanel').height(50);
                    //   $scope.gridOptions.headerRowHeight=100
                };
                $scope.getPagedDataAsync = function (pageSize, page, searchText) {
                    var params = {pageSize: pageSize, page: page };
                    setTimeout(function () {
                        var data;
                        if (searchText) {
                            var ft = searchText.toLowerCase();
                            $http.get(attrs.ajaxDataUrl).success(function (largeLoad) {
                                //           debugger;
                                data = largeLoad.filter(function (item) {
                                    return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                                });
                                $scope.setPagingData(data, page, pageSize);
                            });
                        } else {
                            $http.get(attrs.ajaxDataUrl, {params: params })
                                .success(function (responce) {
                                    $scope.setPagingData(responce.data, page, pageSize, responce.total);
                                })
                                .error(function (data) {
                                    console.log(data);
                                });
                        }
                    }, 100);
                };


                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
//
                $scope.$watch('pagingOptions', function (newVal, oldVal) {
                    if (newVal !== oldVal
                        || newVal.pageSize !== oldVal.pageSize
                        || newVal.currentPage !== oldVal.currentPage) {
                        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                    }
                }, true);

                /*$scope.$watch('filterOptions', function (newVal, oldVal) {
                 if (newVal !== oldVal) {
                 $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                 }
                }, true);
                 */

                function configureGrid() {
                    //debugger;
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("GET", attrs.ajaxGridDef, false);
                    xmlhttp.send();
                    var data = xmlhttp.response;

                    console.log(data);

                    gridOptions['columnDefs'] = data;
                    gridOptions['enablePaging'] = true;
                    gridOptions['showFooter'] = true;
                    gridOptions['totalServerItems'] = 'totalServerItems';
                    gridOptions['pagingOptions'] = $scope.pagingOptions;
                    //   gridOptions['filterOptions'] = $scope.filterOptions;

                    $scope.gridOptions =gridOptions;
                    //  loadData();
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

                configureGrid();
            },
            link: function (scope, element) {
                // debugger;
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