var express = require('express');
var router = express.Router();
var _ = require('lodash-node');

/* GET home page. */
router.get('/gridData', function(req, res) {
    var params = req.query;
    var data = [
        {id:1,name: "Moroni", age: 50},
        {id:2,name: "Tiancum", age: 43},
        {id:3,name: "Jacob", age: 27},
        {id:4,name: "Nephi", age: 29},
        {id:5,name: "Nephi", age: 29},
        {id:6,name: "Nephi", age: 29},
        {id:7,name: "Nephi", age: 29},
        {id:8,name: "Nephi", age: 29},
        {id:9,name: "Nephi", age: 29},
        {id:10,name: "Nephi", age: 29},
        {id:11,name: "Nephi", age: 29},
        {id:12,name: "Nephi", age: 29},
        {id:13,name: "Nephi", age: 29},
        {id: 14, name: "Nephi", age: 15},
        {id: 15, name: "Nephi", age: 15},
        {id: 16, name: "Nephi", age: 15},
        {id: 17, name: "Nephi", age: 15},
        {id: 18, name: "Nephi", age: 15},
        {id: 19, name: "Nephi", age: 15},
        {id: 20, name: "Nephi", age: 15},
        {id: 21, name: "Nephi", age: 15},
        {id: 22, name: "Nephi", age: 15},
        {id: 23, name: "Nephi", age: 15},
        {id: 24, name: "Nephi", age: 15},
        {id: 25, name: "Nephi", age: 15},
        {id: 26, name: "Nephi", age: 15},
        {id: 27, name: "Nephi", age: 15},
        {id:28,name: "Nephi", age: 29},
        {id:29,name: "Nephi", age: 29},
        {id:30,name: "Enos", age: 34}] ;

//    var result = _.filter(data, function (temp) {
//        return temp.age == 20;
//    });
    var result = data.slice((params.page - 1) * params.pageSize, params.page * params.pageSize);
    res.send({data: result, total: data.length});

});

router.get('/gridDef', function (req, res) {


    var ngClass = "'colt' + col.index";
    // {{showSearch?searchHeight:' +"searchHeight0"+'}}
    var headerTemplate = '<div class="ngHeaderSortColumn {{col.headerClass}} searchHeight " ng-style="{cursor: col.cursor}" ng-class="{ ngSorted: !noSortVisible }">' +
            //'<div ng-click="col.sort($event)" ng-class="' + ngClass +'" class="ngHeaderText">{{col.displayName}}</div>'+
            '<div ng-click="showMSG()" ng-class="' + ngClass + '" class="ngHeaderText">{{col.displayName}}' +
            '</div>' +
            '<div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>' +
            '<div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>' +
            '<div class="ngSortPriority">{{col.sortPriority}}</div>' +
            '</div>' +
            '<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>'
            + '<div class = "searchBoxes"><input type="text" ng-model="gridSearch[1].text" > </input> </div>'
        ;


    var columns = [
        {field: 'id', displayName: 'Sr', width: "10%"},
        {field: 'name', displayName: 'Name', width: "*", headerCellTemplate: headerTemplate},
        {field: 'age', displayName: 'Age', width: "20%"}
    ];

    res.send(columns);

});



module.exports = router;
