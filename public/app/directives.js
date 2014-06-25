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