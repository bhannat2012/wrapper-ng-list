/**
 * Created by Akhil on 21-06-2014.
 */
angular.module('myapp.directives',[])
    .directive('myGrid',function(){



       /* $scope.gridOptions = {
            data: 'myData',
            columnDefs: [{field:'name', displayName:'Name'}, {field:'age', displayName:'Age'}]
        };*/

        return {
            restrict:'E',
            template : '<div class="gridStyle" ng-grid="gridOptions"></div>',
            scope: {},
            controller:function ($scope,$element,$attrs){
                var gridNM =
                $scope.myData = [] ;
               // var plg = new plugin();
                debugger;
                $scope.gridOptions = { data:'myData',
                    enableCellEditOnFocus :true ,
                    enablePaging: true,
                    showFooter: true,enablePinning:true/*,
                    plugins: [ plg ]*/
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

    }) ;