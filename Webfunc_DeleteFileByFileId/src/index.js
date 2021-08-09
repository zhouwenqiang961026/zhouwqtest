/**
 * 
 */
//规则主入口(必须有)
var main = function (ruleContext) {

    var args = ruleContext.getArgs();
    var argsLen = args ? args.length : 0;
    var fileid = argsLen == 1 ? args[0] : null;
    if (mathUtil.isEmpty(fileid)) {
        throw new Error("参数不能为空，请检查");
    }
    var expression = "WebFunc_DeleteFileByFileId(\"" + fileid + "\")";

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
        "success": function (rs) {
            result = rs.data.result;
        }
    });
    return result;
};
export {
    main
}