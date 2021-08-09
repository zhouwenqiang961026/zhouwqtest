/**
 * 
 */
//规则主入口(必须有)
var main = function (param) {
    var args = param.getArgs(),
        argsLen = args ? args.length : 0,
        actionXML = argsLen >= 1 ? args[0] : null;

    if (!actionXML || actionXML == "")
        throw new Error("[VRestoreXMLToEntity.main]执行失败，参数1:流程动作XML配置信息为空");

    actionXML = encodeURIComponent(actionXML);

    var expression = 'VRestoreXMLToEntity("' + actionXML + '")';
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
    var tableDataMap = null;
    if (result && result.success == true)
        tableDataMap = result.data.result;
    else
        throw new Error("[VRestoreXMLToEntity.main]解析实体数据失败，result=" + result);


    if (null != tableDataMap) {
        for (var tableName in tableDataMap) {
            var routeContext = param.getRouteContext();
            var exists = GetDataSource(tableName, routeContext);
            if (!exists) {
                log.warn("[VRestoreXMLToEntity.main]需要还原的表" + tableName + "不存在");
                continue;
            }
            var tableDatas = tableDataMap[tableName];
            var routeContext = param.getRouteContext();

            //获取记录
            var loadRecords = createRecords({
                "datasourceName": tableName,
                "datas": tableDatas
            }, routeContext);
            // 加载数据
            loadRecordsToEntity({
                "datasourceName": tableName,
                "records": loadRecords
            }, routeContext);

        }
    }
};
//根据xml信息去生成记录数组
function createRecords(params, routeContext) {
    var datas = params.datas;
    if (datas && datas.length > 0) {
        var datasource = GetDataSource(params.datasourceName, routeContext); //获取对应的数据源
        if (!datasource) {
            return [];
        }
        var rs = [];
        for (var i = 0, l = datas.length; i < l; i++) {
            var data = datas[i];
            var record = datasource.createRecord();
            record.setDatas(data);
            rs.push(record);
        }
        return rs;
    }
    return [];
};
//将记录加载到实体里面
function loadRecordsToEntity(params, routeContext) {
    var records = params.records;
    if (records && records.length > 0) {
        var datas = [];
        var isAppend = params.hasOwnProperty("isAppend") ? params.isAppend : false;
        var datasource = GetDataSource(params.datasourceName, routeContext); //获取对应的数据源
        if (!datasource) {
            return;
        }
        for (var i = 0, l = records.length; i < l; i++) {
            datas.push(records[i].toMap());
        }
        datasource.load({
            "datas": datas,
            "isAppend": isAppend
        });
    }
};
//获取数据源
function GetDataSource(ds, routeContext) {
    var dsName = ds;
    var datasource = null;
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
    if (!datasource) {
        //	throw new Error("找不到函数VRestoreXMLToEntity参数中的实体！");
        //	忽略不存在的实体，无需报错
        return null;
    }
    return datasource;
};
export {
    main
}