/**
 * Created with IntelliJ IDEA.
 * User: Akshay
 * Date: 12/2/13
 * Time: 2:15 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('app', ['myApp', 'nvd3ChartDirectives', 'directives', 'myapp'])
    .controller('PQRController', ['$scope', function ($scope) {

    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    }])
//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
    .filter('startFrom', function () {
        return function (input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    });