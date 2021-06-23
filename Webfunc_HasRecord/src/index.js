/**
 * 检查是组件否有值 代码示例:HasRecord('Contract')返回值布尔类型 参数数量:1 参数1--表名(文本类型)
 * 返回值记录数,如果为-1则表示无表或查询出错
 */
vds.import("vds.object.*");
var main = function(param) {
    var args = param.getArgs(),
        argsLen = args ? args.length : 0,
        dsName = argsLen >= 1 ? args[0] : null;

    if (vds.object.isUndefOrNull(dsName))
        throw new Error("传入表名为空，请检查");

    try {
        var scope = scopeManager.getWindowScope();
        var windowCode = scope ? scope.getWindowCode() : "";
        return executeExpression(windowCode, dsName);
    } catch (e) {
        throw new Error("函数执行失败");
    }
}
export{    main}