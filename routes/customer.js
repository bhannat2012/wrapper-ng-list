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

router.get('/gridColumns', function(req, res) {
    var result = [
        {field: 'id', displayName: 'Sr'},
        {field: 'name', displayName:'Name'},
        {field: 'age', displayName: 'Age'}
    ];

    res.send(result);

});



module.exports = router;
