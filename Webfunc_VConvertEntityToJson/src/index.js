/**
 * 
 */
//规则主入口(必须有)
var main = function (param) {
    var args = param.getArgs();
    // 参数1：实体名称
    var entityCode = args[0];
    // 参数2：获取记录的方式0所有行/1选中行，默认为0
    var recordType = args[1];
    // 参数3：需要变成对象的字段列表，逗号隔开
    var objFieldString = args[2];

    var records = [];
    var routeContext = param.getRouteContext();
    //获取数据源
    var datasource = GetDataSource(entityCode, routeContext);

    if (1 == recordType)
        records = datasource.getSelectedRecords().toArray(); // 注意返回值对象有改变
    else
        records = datasource.getAllRecords().toArray();

    var objFields = [];
    if (objFieldString)
        objFields = objFieldString.split(",");

    var dataMaps = [];

    var metadata = datasource.getMetadata();
    var metaFields = metadata.getFields();

    for (var i = 0; i < records.length; i++) {
        var record = records[i];
        var dataMap = {};
        for (var j = 0; j < metaFields.length; j++) {
            var metaField = metaFields[j];
            var fieldCode = metaField.getCode();
            var fieldValue = record.get(fieldCode);
            // 存在对象字段的配置，对照字段并将值转换成obj
            if (fieldValue && objFields && objFields.length > 0) {
                for (var h = 0; h < objFields.length; h++) {
                    var objField = objFields[h];
                    if (objField == fieldCode) {
                        fieldValue = jsonUtil.json2obj(fieldValue);
                        dataMap[fieldCode] = fieldValue;
                        break;
                    }
                }
            }
            // 无对象字段配置，输出全部字段
            dataMap[fieldCode] = fieldValue;
        }
        dataMaps.push(dataMap);
    }

    var json = jsonUtil.obj2json(dataMaps);
    return json;
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
    if (!datasource) throw new Error("找不到函数VConvertEntityToJson参数中的实体！");
    return datasource;
}
export {
    main
}