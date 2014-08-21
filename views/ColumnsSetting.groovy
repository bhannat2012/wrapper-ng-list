package com.system

class ColumnsSetting {

    User user
    Screen screen

    static constraints = {
        user()
        screen()
    }

    static hasMany = [child: ColumnsSettingChild]
}
