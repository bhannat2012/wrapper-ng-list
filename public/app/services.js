/**
 * Created by Akhil on 21-06-2014.
 */

angular.module('myapp.services',[])
    .service('printService', function ($window) {

        var writeStyle = function (styleUrl) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", styleUrl, false);
            xmlhttp.send();
            return xmlhttp.response;
        };

        return {
            print: function () {
                debugger;
                var html = document.querySelector('.gridStyle').innerHTML;
                var win = $window.open();
                //win = window.open();
                $window.focus();
                win.document.open();
                win.document.write('<' + 'html' + '><' + 'head' + '><' + 'style' + '>');
                //win.document.write('body, td { font-family: Verdana; font-size: 10pt;}');

                win.document.write(writeStyle("/stylesheets/ng-grid.css"));
                win.document.write(writeStyle("/stylesheets/style.css"));

                win.document.write('<' + '/' + 'style' + '>');
                win.document.write('<' + '/' + 'head' + '><' + 'body' + '>');

                win.document.write(html);
                win.document.write('<' + '/' + 'body' + '><' + '/' + 'html' + '>');
                win.document.close();
                win.print();
                win.close();
                //$window.print();
            }
        };
    });