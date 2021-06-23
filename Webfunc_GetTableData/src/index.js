/**
 * 根据表名字段名以及过滤条件获取数据 代码示例1:GetTableData("contName","LMF_CONT","ID=:ID and contCode=:contCode {'ID':'fc05bfcd9b82a411339547e99ad569ca','contCode':'1003'}") 代码示例2:GetTableData("contName","LMF_CONT","ID='fc05bfcd9b82a411339547e99ad569ca' & contCode='1003'") 返回值为ID为'fc05bfcd9b82a411339547e99ad569ca'，contCode为'1003',字段为"LMF_CONT.contName"的记录 参数数量:3 参数1(字符类型)--数据源名称。 参数2(字符类型)--所查字段，存在多个则用","分开;空串为所有字段。 参数3过滤条件,过滤字符串格式可为sql字符串类似于"a.a1<2 & a.b1>1"也可为"a.a1<:a & b.b1>:b"的mql字符串 返回查询出结果集第一条记录指定字段的值，如果查询结果集无数据则返回空字符串
 */
vds.import("vds.object.*");
var main = function(param) {
    var args = param.getArgs(),
        argsLen = args ? args.length : 0,
        columnNames = argsLen >= 1 ? args[0] : null,
        dataSourceName = argsLen >= 2 ? args[1] : null,
        queryStr = argsLen >= 3 ? args[2] : null;

    if (vds.object.isUndefOrNull(dataSourceName) || vds.object.isUndefOrNull(columnNames) || vds.object.isUndefOrNull(queryStr)) {
        throw new Error("所有参数不能为空，请检查");
    }

    // 如果存在数字则转换为字符串
    dataSourceName = "" + dataSourceName;
    columnNames = "" + columnNames;
    queryStr = "" + queryStr;
    queryStr = replaceAll(queryStr, "&", " and ");
    queryStr = replaceAll(queryStr, "\\|", " or ");
    var mqlStr = "";
    if (queryStr.indexOf(":") != -1) {
        mqlStr = queryStr.substring(0, queryStr.indexOf("{"));
        var valueParamMapStr = queryStr.substring(queryStr.indexOf("{"), queryStr.length)
        var valueParamMap = jsonUtil.json2obj(valueParamMapStr);
        if (!mqlStr) {
            mqlStr = "1=0";
        }
    } else
        mqlStr = queryStr;

    // 修改调用后台查询逻辑 dengb
    var expression = "WebFunc_GetTableData(\"" + columnNames + "\",\"" + dataSourceName + "\",\"" + mqlStr + "\")";

    var findParam = {
        "expression": expression
    }
    var scope = scopeManager.getWindowScope();
    var windowCode = scope ? scope.getWindowCode() : "";
    var result;
    operation.request({
        "windowCode": windowCode,
        "operation": "WebExecuteFormulaExpression",
        "isAsync": false,
        "params": findParam,
        "success": function(rs) {
            result = rs.data.result;
        }
    });
    return result;
}
export{    main}