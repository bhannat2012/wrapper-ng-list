/**
 * Created by Akhil on 21-06-2014.
 */
angular.module('myapp.directives', ['ui.utils'])
    .directive('myGrid', function ($http, printService) {

        /* $scope.gridOptions = {
         data: 'myData',
         columnDefs: [{field:'name', displayName:'Name'}, {field:'age', displayName:'Age'}]
         };*/

        var gridOptions = { data: 'myData',
            enableCellEditOnFocus: false,
            enablePaging: true,
            showFooter: true,
            showFilter: false,
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
            template: '<div> <a> <i class="fa fa-fw" ng-click="showSearchFN()"></i> </a></div>' +
                '<div class="gridStyle" ng-grid="gridOptions"></div>',
            scope: {},
            controller: function ($scope, $element, $attrs) {
                var attrs = $attrs;
                $scope.myData = [];
                $scope.gridOptions = {};
                $scope.showSearch = false;
                $scope.gridSearch = [ ];
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
                $scope.printList = function () {
                    debugger;
                    printService.print();
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
                $scope.showMSG = function (evnt, column) {
                    debugger;
                    var searchObj = _.find($scope.gridSearch, {dataNM: column.field});
                    if (!searchObj && column.searchText != '') {
                        $scope.gridSearch.push({  dataNM: column.field,
                            searchText: column.searchText});
                    } else {
                        if (column.searchText == '') {
                            delete $scope.gridSearch[ _.findIndex($scope.gridSearch, {dataNM: column.field})];
                            $scope.gridSearch = _.compact($scope.gridSearch);
                        } else {
                            searchObj.searchText = column.searchText;
                        }
                    }
                    // console.log(JSON.stringify($scope.gridSearch));
                    $scope.getPagedDataAsync();
                };
                $scope.showSearchFN = function () {
                    // alert('show-search');
                    //debugger;
                    console.log(JSON.stringify($scope.getShowSearch));
                    $scope.showSearch = !$scope.showSearch;
                    $scope.getShowSearch = [];
                };
                $scope.getPagedDataAsync = function () {
                    var pageSize = $scope.pagingOptions.pageSize,
                        page = $scope.pagingOptions.currentPage;
                    //
                    if (arguments.length == 2) {
                        pageSize = arguments[0];
                        page = arguments[1];
                    }
                    //
                    debugger;
                    var search = $scope.gridSearch && $scope.gridSearch.length > 0 ? $scope.gridSearch : []
                    var params = {
                        pageSize: pageSize,
                        page: page,
                        search: search
                    };
                    setTimeout(function () {
                        var data;

                        $http.get(attrs.ajaxDataUrl, {params: params })
                            .success(function (responce) {
                                $scope.setPagingData(responce.data, page, pageSize, responce.total);
                            })
                            .error(function (data) {
                                console.log(data);
                            });

                    }, 100);
                };


                $scope.getPagedDataAsync();
//
                $scope.$watch('pagingOptions', function (newVal, oldVal) {
                    if (newVal !== oldVal
                        || newVal.pageSize !== oldVal.pageSize
                        || newVal.currentPage !== oldVal.currentPage) {
                        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                    }
                }, true);

                function configureGrid() {
                    //debugger;

                    var xmlhttp = new XMLHttpRequest();
                     xmlhttp.open("GET", attrs.ajaxGridDef, false);
                     xmlhttp.send();
                    var data = xmlhttp.response;
                    // var data = getColumns();
                    console.log(data);

                    gridOptions['columnDefs'] = getColumns();
                    //  gridOptions['columnDefs'] = data;
                    gridOptions['enablePaging'] = true;
                    gridOptions['showFooter'] = true;
                    gridOptions['totalServerItems'] = 'totalServerItems';
                    gridOptions['pagingOptions'] = $scope.pagingOptions;
                    //   gridOptions['filterOptions'] = $scope.filterOptions;

                    $scope.gridOptions = gridOptions;
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

                $scope.searchData = function () {
                    debugger;
                    alert(' Searching...');
                };

                function getColumns() {

                    var ngClass = "'colt' + col.index";
                    // {{showSearch?searchHeight:' +"searchHeight0"+'}}
                    var elemnt = ' <input  ui-event="{ blur : \'showMSG($event,col)\' }" class="searchText" ng-show="showSearch" type="text" ng-model="col.searchText" > </input>';

                    var headerT1 = '<div class="ngHeaderSortColumn {{col.headerClass}} searchHeight " ng-style="{cursor: col.cursor}" ng-class="{ ngSorted: !noSortVisible }">' +
                        //'<div ng-click="col.sort($event)" ng-class="' + ngClass +'" class="ngHeaderText">{{col.displayName}}</div>'+
                        '<div   ng-class="' + ngClass + '" class="ngHeaderText"> <span ng-show="!showSearch"> {{col.displayName}} </span> ';
                    var headerT2 = '</div>' +
                            '<div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>' +
                            '<div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>' +
                            '<div class="ngSortPriority">{{col.sortPriority}}</div>' +
                            '</div>' +
                            '<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>'
                        ;


                    var columns = [
                        {field: 'id', displayName: 'Sr', width: "10%"},
                        {field: 'name', displayName: 'Name', width: "*", headerCellTemplate: headerT1 + elemnt + headerT2},
                        {field: 'age', displayName: 'Age', width: "20%", headerCellTemplate: headerT1 + elemnt + headerT2}
                    ];
                    return columns;
                }
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