/**
 * 
 */
//规则主入口(必须有)
var main = function (param) {
    var args = param.getArgs();
    // 参数1：Json字符串
    var json = args[0];
    // 参数2：还原实体名称
    var entityCode = args[1];
    var routeContext = param.getRouteContext();
    var datasource = GetDataSource(entityCode, routeContext);

    if (!json)
        return null;

    var configs = jsonUtil.json2obj(json);
    if (!configs || configs.length <= 0) {
        return null;
    }

    var records = [];
    for (var i = 0; i < configs.length; i++) {
        var config = configs[i];
        var id = uuid.generate();
        if (config.id && config.id != "")
            id = config["id"];

        var record = datasource.createRecord();
        for (var field in config) {
            var _val = config[field];
            if (_val instanceof Array) _val = JSON.stringify(_val);
            record.set(field, _val);
        }
        records.push(record);
    }
    //		var datasource = manager.lookup({
    //			"datasourceName": entityCode
    //		});
    var datasource = GetDataSource(entityCode, routeContext);
    var rs = datasource.insertRecords({
        "records": records
    });
    return rs;
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
    if (!datasource) throw new Error("找不到函数VRestoreJsonToEntity参数中的实体！");
    return datasource;
}
export {
    main
}