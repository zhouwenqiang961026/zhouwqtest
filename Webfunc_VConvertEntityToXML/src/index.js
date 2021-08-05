/**
 * 
 */
//规则主入口(必须有)
var main = function (param) {
    var args = param.getArgs(),
        argsLen = args ? args.length : 0;

    if (argsLen <= 0)
        throw new Error("[VConvertEntityToXML.main]执行失败，必须配置至少一个参数作为表名");

    var tableDataMap = {};
    for (var i = 0; i < argsLen; i++) {
        var tableName = args[i];
        var routeContext = param.getRouteContext();
        var db = GetDataSource(tableName, routeContext); //获取对应的数据源

        var dbSeriallize = db.serialize();
        tableDataMap[tableName] = dbSeriallize;
    }

    var jsonStr = jsonUtil.obj2json(tableDataMap);
    jsonStr = encodeURIComponent(jsonStr);

    var expression = 'VConvertEntityToXML("' + jsonStr + '")';
    var scope = scopeManager.getWindowScope();
    var windowCode = scope ? scope.getWindowCode() : "";
    var result;
    vds.rpc.callCommandSync("WebExecuteFormulaExpression", null, {
        "isOperation": true,
        "operationParam": {
            "expression": expression
        },
        "success": function (rs) {
            result = rs;
        }
    })
    if (result && result.success == true)
        return result.data.result;
    else
        throw new Error("[VConvertEntityToXML.main]解析实体数据失败，result=" + result);
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
            datasource = dbManager.lookup({
                "datasourceName": dsName
            });
        } else {
            datasource = engine.execute({
                "expression": dsName,
                "context": context
            });
        }
    }
    if (!datasource) throw new Error("找不到函数VConvertEntityToXML参数中的实体！");
    return datasource;
}
export {
    main
}