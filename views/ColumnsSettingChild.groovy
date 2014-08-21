package com.system

import org.codehaus.groovy.grails.web.json.JSONObject

class ColumnsSettingChild {

    String displayName, field
    boolean visible = false, sortable = false, resizable = false, groupable = false, pinned = false
    boolean enableCellEdit = false, cellEditableCondition = false, editableCellTemplate = false
    String width, minWidth, maxWidth, columnsIndex
    String sortFn, cellTemplate, cellClass, headerClass
    String headerCellTemplate, cellFilter, aggLabelFilter

    static constraints = {
        displayName nullable: true
        field nullable: true
        sortFn size: 0..1024, nullable: true
        cellTemplate size: 0..1024, nullable: true
        cellClass size: 0..1024, nullable: true
        headerClass size: 0..1024, nullable: true
        headerCellTemplate size: 0..1024, nullable: true
        cellFilter size: 0..1024, nullable: true
        aggLabelFilter size: 0..1024, nullable: true
    }
    static belongsTo = [parent: ColumnsSetting]

    static saveData(JSONObject col) {
        return new ColumnsSettingChild(
                displayName: col?.displayName ?: '',
                visible: col?.visible ?: false,     //boolean
                sortable: col?.sortable ?: false,      //boolean
                resizable: col?.resizable ?: false,     //boolean
                groupable: col?.groupable ?: false,   //boolean
                pinned: col?.pinned ?: false, // boolean
                enableCellEdit: col?.enableCellEdit ?: false,  //boolean
                cellEditableCondition: col?.cellEditableCondition ?: false,//boolean
                editableCellTemplate: col?.editableCellTemplate ?: false,//boolean
                width: col.width,                // numeric
                minWidth: col.minWidth,         // numeric
                maxWidth: col.maxWidth,        // numeric
                columnsIndex: col.columnsIndex,// numeric
                sortFn: col?.sortFn ?: null,     //String
                cellTemplate: col.cellTemplate,   //String
                cellClass: col.cellClass,       //String
                headerClass: col.headerClass,//String
                headerCellTemplate: col?.headerCellTemplate?.replace("'colt'", "'colt'+") ?: '',  //String
                cellFilter: col.cellFilter,         //String
                aggLabelFilter: col.aggLabelFilter,  //String
                field: col.field //String
        )

    }
}
