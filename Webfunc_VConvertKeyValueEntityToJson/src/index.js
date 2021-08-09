/**
 * 
 */
//规则主入口(必须有)
var main = function (param) {
    var args = param.getArgs();
    // 参数1：实体名称
    var entityCode = args[0];
    // 参数2：作为key的字段名
    var keyColumn = args[1];
    // 参数3：作为value的字段名
    var valueColumn = args[2];
    // 参数4：获取记录的方式0所有行/1选中行，默认为0
    var recordType = args[3];
    // 参数5：需要使用对象方式的key列表，逗号分隔
    var objKeyString = args[4];

    var records = [];
    var routeContext = param.getRouteContext();
    var datasource = GetDataSource(entityCode, routeContext); //获取对应的数据源

    if (1 == recordType)
        records = datasource.getSelectedRecords().toArray(); // 注意返回值对象有改变
    else
        records = datasource.getAllRecords().toArray();

    var objKeys = [];
    if (objKeyString)
        objKeys = objKeyString.split(",");

    var object = {};
    for (var i = 0; i < records.length; i++) {
        var record = records[i];
        var key = record.get(keyColumn);
        var value = record.get(valueColumn);
        if (value && objKeys && objKeys.length > 0) {
            for (var j = 0; j < objKeys.length; j++) {
                var objKey = objKeys[j];
                if (objKey == key)
                    value = jsonUtil.json2obj(value);
            }
        }
        object[key] = value;
    }

    return jsonUtil.obj2json(object);
};

function GetDataSource(ds, routeContext) { //获取数据源
    var dsName = ds;
    var datasource = null;
    if (DBFactory.isDatasource(dsName)) {
        datasource = dsName;
    } else {
        var context = new ExpressionContext();
        context.setRouteContext(routeContext);
        if (dsName.indexOf(".") == -1 && dsName.indexOf("@") == -1) {
            datasource = manager.lookup({
                "datasourceName": dsName
            });
        } else {
            datasource = engine.execute({
                "expression": dsName,
                "context": context
            });
        }
    }
    if (!datasource) throw new Error("找不到函数VConvertKeyValueEntityToJson参数中的实体！");
    return datasource;
}
export {
    main
}