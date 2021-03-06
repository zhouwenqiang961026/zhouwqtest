/**
 *	将实体中某个字段值拼接成一个字符串
 */
vds.import("vds.object.*", "vds.ds.*", "vds.exception.*","vds.expression.*");
var main = function(dsName,columnName,separator,selectType,isNullFilter,isUnique) {
    if (vds.object.isUndefOrNull(dsName))
        throw new Error("实体名称不允许为空，请检查");

    if (vds.object.isUndefOrNull(isNullFilter))
        isNullFilter = false;

    if (vds.object.isUndefOrNull(columnName))
        return "";

    if (vds.object.isUndefOrNull(separator))
        separator = ";"; //为空默认取分号

    // 兼容原有函数
    if (null == selectType || undefined == selectType)
        selectType = 0; // 0：全部记录；1：选中记录；默认为0。原有为0。

    //从DB中取值
    var records;
    var datasource = null;
    //		if(vds.ds.isDatasource(tableName)){
    //			datasource = tableName;
    //		}else{
    //			datasource = vds.ds.lookup(tableName);
    //		}
    if (vds.ds.isDatasource(dsName)) {
        datasource = dsName;
    } else {
        if (dsName.indexOf(".") == -1 && dsName.indexOf("@") == -1) {
            datasource = vds.ds.lookup(dsName);
        } else {
            datasource = vds.expression.execute(dsName);
        }
    }
    if(!datasource)
        throw vds.exception.newConfigException("无法获取实体【"+dsName+"】, 请检查实体是否存在");
    if (selectType == 1)
        records = datasource.getSelectedRecords();
    else
        records = datasource.getAllRecords(); // 默认0

    var retStr = "";
    if (null != records && records.toArray().length > 0) {
        records = records.toArray();
        var arr = new Array();
        for (var i = 0; i < records.length; i++) {
            var record = records[i];
            var temValue = record.get(columnName);
            if (isUnique) {
                if (!contains(arr, temValue)) {
                    arr.push(temValue);
                    if (isNullFilter) {
                        if (!vds.object.isUndefOrNull(temValue)) {
                            if (retStr == "")
                                retStr = temValue;
                            else
                                retStr = retStr + separator + temValue;
                        }
                    } else {
                        if (i == 0 && retStr == "")
                            retStr = temValue;
                        else
                            retStr = retStr + separator + temValue;
                    }
                }
            } else {
                if (isNullFilter) {
                    if (!vds.object.isUndefOrNull(temValue)) {
                        if (retStr == "")
                            retStr = temValue;
                        else
                            retStr = retStr + separator + temValue;
                    }
                } else {
                    if (i == 0 && retStr == "")
                        retStr = temValue;
                    else
                        retStr = retStr + separator + temValue;
                }
            }



        }
    } else
        return null;

    return retStr;
}
function contains(arr, obj) {
    var i = arr.length;
    if (i > 0) {
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
    }
    return false;
}
export{    main}