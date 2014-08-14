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
    var search = params.search;


    var result = data.slice((params.page - 1) * params.pageSize, params.page * params.pageSize);
    res.send({data: result, total: data.length});

});

router.get('/gridDef', function (req, res) {

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
    //  return columns;
    res.send(columns);

});



module.exports = router;

// Employee

/*
 def gridData(){
 def page = Integer.parseInt(params.page), pageSize = Integer.parseInt(params.pageSize) ;
 def search = JSON.parse(params.search);
 def hqxl = new ArrayList<String>();

 if(search.size() > 0 ) {
 search.each {p->
 if(p.searchText) {
 hqxl.add ( 'e.'+ p.dataNM.trim() + "='" +p.searchText + "'" ) ;
 }
 }
 }
 def hqxlTxt = '' ;
 if(hqxl.size() >0 ) {
 hqxlTxt = 'from Employee as e  where ' +  hqxl.join(' and ') ;
 }else{
 hqxlTxt = 'from Employee as e ' ;
 }

 def results =Employee.findAll(hqxlTxt ,[max: pageSize, offset: (page-1) * pageSize])
 def respo =[data: results, total: Employee.findAll(hqxlTxt).size()];
 render respo as JSON
 }
 def gridDataA(){
 def page = Integer.parseInt(params.page), pageSize = Integer.parseInt(params.pageSize) ;
 def search = JSON.parse(params.search);


 def c = Employee.createCriteria() ;

 // c.maxResults(pageSize)  ;




 def data = c.list (max: pageSize, offset: (page-1) * pageSize) {}  ;
 //
 //def result=[];

 */
/*
 for(def  i = (page-1) * pageSize ; i<   page * pageSize; i++){
 result.push( data[i]) ;
 }
 *//*

 // def result = data.slice((params.page - 1) * params.pageSize, params.page * params.pageSize);
 def respo =[data: data, total: Employee.count()];

 render respo as JSON

 }

 def gridDef(){
 def ngClass = "'colt' + col.index";
 // {{showSearch?searchHeight:' +"searchHeight0"+'}}
 def elemnt = ' <input  ui-event="{ blur : \'showMSG($event,col)\' }" class="searchText" ng-show="showSearch" type="text" ng-model="col.searchText" > </input>';

 def headerT1 = '<div class="ngHeaderSortColumn {{col.headerClass}} searchHeight " ng-style="{cursor: col.cursor}" ng-class="{ ngSorted: !noSortVisible }">' +
 //'<div ng-click="col.sort($event)" ng-class="' + ngClass +'" class="ngHeaderText">{{col.displayName}}</div>'+
 '<div   ng-class="' + ngClass + '" class="ngHeaderText"> <span ng-show="!showSearch"> {{col.displayName}} </span> ';
 def headerT2 = '</div>' +
 '<div class="ngSortButtonDown" ng-show="col.showSortButtonDown()"></div>' +
 '<div class="ngSortButtonUp" ng-show="col.showSortButtonUp()"></div>' +
 '<div class="ngSortPriority">{{col.sortPriority}}</div>' +
 '</div>' +
 '<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>'
 ;

 def columns = [
 [field: 'id', displayName: 'Sr', width: "10%"],
 [field: 'name', displayName: 'Name', width: "*", headerCellTemplate: headerT1 + elemnt + headerT2],
 [field: 'age', displayName: 'Age', width: "20%", headerCellTemplate: headerT1 + elemnt + headerT2]
 ];

 render columns as JSON;
 }
 ========================================================================================================================
 def gridData() {
 //        def iid = session['activeUser'].company.id;
 def page = Integer.parseInt(params.page), pageSize = Integer.parseInt(params.pageSize);
 def search = JSON.parse(params?.search ?: '[]');
 def hqxl = new ArrayList<String>();
 if (search.size() > 0) {
 search.each { p ->
 if (p?.searchText) {
 if (p?.searchText?.contains("*")) {
 hqxl.add('u.' + p.dataNM.trim() + " like '" + p.searchText.replace("*", "%") + "'");
 } else if (p?.searchText?.contains("<")) {
 hqxl.add('u.' + p.dataNM.trim() + " < '" + p.searchText.replace("<", "") + "'");
 } else if (p?.searchText?.contains(">")) {
 hqxl.add('u.' + p.dataNM.trim() + " > '" + p.searchText.replace(">", "") + "'");
 } else {
 hqxl.add('u.' + p.dataNM.trim() + " = '" + p.searchText + "'");
 }
 }
 }
 }
 def hqxlTxt = '';
 if (hqxl.size() > 0) {
 hqxlTxt = 'from GenerateLead as u where ' + hqxl.join(' and ');
 } else {
 hqxlTxt = 'from GenerateLead as u ';
 }
 def results = GenerateLead.findAll(hqxlTxt, [max: pageSize, offset: (page - 1) * pageSize]).sort {
 it.leadChild.last().followUpDate
 }.reverse(true).collect {
 [
 id           : it.id,
 leadNo       : it.leadNo,
 projectName  : it.projectName,
 customerName : it.customerName,
 email        : it.email,
 webSite      : it.webSite,
 city         : it.city,
 contactNo    : it.contactNo1,
 createdBy    : it.createdBy,
 assignedTo   : it.assignedTo,
 leadStatus   : it.leadStatus,
 refference   : it.refference,
 contactPerson: it.contactPerson,
 sendMailBool : false,
 followUpDate : it.leadChild.last().followUpDate,
 remark       : it.leadChild.last().remark
 ]
 }
 def respo = [data: results, total: GenerateLead.findAll(hqxlTxt).size()];
 render respo as JSON
 }

 def gridDef() {

 def d = ColumnsSetting.findByScreenAndUser(session['activeScreen'] as Screen, session['activeUser'] as User);
 if (d) {
 def columns = [];
 d.child.sort { it.columnsIndex }.each { col ->
 columns.push([
 displayName          : col?.displayName ?: '',
 "col.index"          : col?.columnsIndex,
 visible              : col?.visible ?: false,     //boolean
 sortable             : col?.sortable ?: false,      //boolean
 resizable            : col?.resizable ?: false,     //boolean
 groupable            : col?.groupable ?: false,   //boolean
 pinned               : col?.pinned ?: false, // boolean
 enableCellEdit       : col?.enableCellEdit ?: false,  //boolean
 cellEditableCondition: col?.cellEditableCondition ?: false,//boolean
 editableCellTemplate : col?.editableCellTemplate ?: false,//boolean
 width                : col.width,                // numeric
 minWidth             : col.minWidth,         // numeric
 maxWidth             : col.maxWidth,        // numeric
 columnsIndex         : col.columnsIndex,// numeric
 sortFn               : col?.sortFn ?: '',     //String
 cellTemplate         : col?.cellTemplate ?: '',   //String
 cellClass            : col?.cellClass ?: '',       //String
 headerClass          : col?.headerClass ?: '',//String
 headerCellTemplate   : col?.headerCellTemplate ?: '',  //String
 cellFilter           : col?.cellFilter ?: '',         //String
 aggLabelFilter       : col?.aggLabelFilter ?: '',  //String
 field                : col?.field ?: '' //String
 ])
 }
 render columns as JSON;
 } else {

 def ngClass = "'colt' + col.index";
 // {{showSearch?searchHeight:' +"searchHeight0"+'}}
 def elemnt = ' <input  ui-event="{ blur : \'showMSG($event,col)\' }" class="searchText" ng-show="showSearch" type="text" ng-model="col.searchText" placeholder="{{col.displayName}}"> </input>';
 def elemntDate = ' <input  ui-event="{ blur : \'showMSG($event,col)\' }" class="searchText" ng-show="showSearch" type="date" ng-model="col.searchText" placeholder="{{col.displayName}}"> </input>';

 def headerT1 = '<div class="ngHeaderSortColumn {{col.headerClass}} searchHeight " ng-style="{cursor: col.cursor}" ng-class="{ ngSorted: !noSortVisible }">' +
 //'<div ng-click="col.sort($event)" ng-class="' + ngClass +'" class="ngHeaderText">{{col.displayName}}</div>'+
 '<div ng-click="col.sort($event)"  ng-class="' + ngClass + '" class="ngHeaderText"> <span ng-show="!showSearch"> {{col.displayName}} </span> ';
 def headerT2 = '</div>' +
 '<div class="ngSortButtonDown" ng-click="col.sort($event)" ng-show="col.showSortButtonDown()"></div>' +
 '<div class="ngSortButtonUp" ng-click="col.sort($event)" ng-show="col.showSortButtonUp()"></div>' +
 '<div class="ngSortPriority">{{col.sortPriority}}</div>' +
 '<div ng-class="{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }" ng-click="togglePin(col)" ng-show=\"(col.pinnable && !showSearch)\"></div>' +
 '</div>' +
 '<div ng-show="col.resizable" class="ngHeaderGrip" ng-click="col.gripClick($event)" ng-mousedown="col.gripOnMouseDown($event)"></div>'
 ;


 def editDeleteButton = '<a tabindex=\"-1\" ng-href=\"/' + grailsApplication.config.erpName + '/' + controllerName + '/edit?id={{row.entity.id}}&scrid=' + session["activeScreen"].id + '\"  style="padding-right:8%;padding-left: 8%;">' +
 '<i class=\"icon-pencil bigger-130\"></i></a>' +
 //                    '<button type="button" id="{{row.entity.id}}" ng-click="showPopup(row.entity.id)" style="border: none; background: transparent">' +
 //                    '<img src="/' + grailsApplication.config.erpName + '/assets/avatars/thumbs_up_like_vote_yes_hand-128.png"></button>' +
 '<a ng-href="/' + grailsApplication.config.erpName + '/leadGenerationReport/print_action?id={{row.entity.id}}" target="_blank">' +
 '<img src="/' + grailsApplication.config.erpName + '/assets/avatars/print.jpg" text="Print"/></a>';
 //                    '<webcam:webcamAnchor/>'+
 //            '<a id="webCamDiv" href=\"/'+grailsApplication.config.erpName+'/static/plugins/web-snap-0.1/swf/WebCam.swf\"><img src=\"/'+ grailsApplication.config.erpName+'/images/webcam_icon.jpg\" border="0" width="40" height="40"/></a>';

 def linkCellTemplate = '<div class="ngCellText" ng-class="col.colIndex()">' +
 '  <a href="http://{{row.getProperty(col.field)}}" ng-bind="row.getProperty(col.field)" target="_blank"></a>' +
 '</div>';
 def mailCellTemplate = '<div class="ngCellText" ng-class="col.colIndex()">' +
 '  <a href="mailto:{{row.getProperty(col.field)}}" ng-bind="row.getProperty(col.field)"></a>' +
 '</div>';
 def checkboxHeader = '<input type="checkbox" ng-model="bool" ng-change="checkAll(bool)" style="width:18px;margin-top:5px;margin-left: 5px;"/><span class="lbl" style="padding-left: 5px;padding-right: 5px;"></span>';
 def checkboxCell = '<input type="checkbox" ng-model="row.entity.sendMailBool" style="width:18px;margin-top:5px;margin-left: 5px;"/><span class="lbl" style="padding-left: 5px;padding-right: 5px;"></span>';
 def actionName = '<span style="padding-left: 12%;">Action </span>';

 def columns = [

 //                    [field: 'id', displayName: 'Serial Number', width: "100",visible:false],
 //                    [field: '', displayName: 'Check', width: "30", cellTemplate: checkbox,pinned:true],
 [field: '', displayName: 'Action', width: "90", cellTemplate: editDeleteButton, pinned: true, headerCellTemplate: actionName],
 [field: 'followUpDate', displayName: 'FollowUpDate', width: "100", cellFilter: 'date:\'dd-MMM-yyyy\''],
 [field: 'remark', displayName: 'Remark', width: "100"],
 [field: 'leadNo', displayName: 'Lead No', width: "50", headerCellTemplate: headerT1 + elemnt + headerT2],
 [field: 'projectName.projectName', displayName: 'Project Name', width: "100", headerCellTemplate: headerT1 + elemnt + headerT2],
 [field: 'customerName', displayName: 'Customer Name', width: "150", headerCellTemplate: headerT1 + elemnt + headerT2],
 [field: 'email', displayName: 'Email', width: "150", headerCellTemplate: headerT1 + elemnt + headerT2, cellTemplate: mailCellTemplate],
 [field: 'webSite', displayName: 'WebSite', width: "150", headerCellTemplate: headerT1 + elemnt + headerT2, cellTemplate: linkCellTemplate],
 [field: 'city', displayName: 'City', width: "100", headerCellTemplate: headerT1 + elemnt + headerT2],
 [field: 'contactNo', displayName: 'Contact No', width: "50", headerCellTemplate: headerT1 + elemnt + headerT2],
 [field: 'createdBy.name', displayName: 'Created By', width: "100", headerCellTemplate: headerT1 + elemnt + headerT2],
 [field: 'assignedTo.name', displayName: 'Assigned To', width: "100", headerCellTemplate: headerT1 + elemnt + headerT2],
 [field: 'leadStatus.name', displayName: 'Lead Status', width: "50", headerCellTemplate: headerT1 + elemnt + headerT2],
 [field: 'contactPerson', displayName: 'Contact Person', width: "100", headerCellTemplate: headerT1 + elemnt + headerT2],
 [field: 'refference.refferenceName', displayName: 'Refference', width: "100", headerCellTemplate: headerT1 + elemnt + headerT2],
 ];
 render columns as JSON;
 }


 }

 def menuDef() {
 if (params.columnsField) {
 def columns = JSON.parse((params.columnsField).replaceAll("amp", "&"));


 def columnsInstance = ColumnsSetting.findByScreenAndUser(session['activeScreen'] as Screen, session['activeUser'] as User);
 if (columnsInstance) {
 ColumnsSetting.executeUpdate("delete ColumnsSettingChild c where c.parent.id=:id", [id: columnsInstance.id]);
 columnsInstance.save();
 columns.each { col ->
 columnsInstance.addToChild(ColumnsSettingChild.saveData(col))
 }
 columnsInstance.save();

 } else {
 ColumnsSetting columnsInstance1 = new ColumnsSetting();
 columnsInstance1.screen = session['activeScreen'] as Screen;
 columnsInstance1.user = session['activeUser'] as User;
 columns.each { col ->
 columnsInstance1.addToChild(ColumnsSettingChild.saveData(col))
 }
 columnsInstance1.save();
 }
 }

 render "Table Columns save";
 }
 */



