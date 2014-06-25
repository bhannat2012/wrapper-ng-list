var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/gridData', function(req, res) {
    var result= [{name: "Moroni", age: 50},
        {name: "Tiancum", age: 43},
        {name: "Jacob", age: 27},
        {name: "Nephi", age: 29},
        {name: "Enos", age: 34}] ;



});

module.exports = router;
