/**
 *	流水号函数
 */
vds.import("vds.object.*");
var main = function(param) {
    var args = param.getArgs(),
        argsLen = args ? args.length : 0,
        key = argsLen >= 1 ? args[0] : null;

    if (vds.object.isUndefOrNull(key))
        throw new Error("传入参数不能为空，请检查");

    try {
        var scope = scopeManager.getWindowScope(),
        windowCode = scope ? scope.getWindowCode() : "";
        
        return executeExpression(windowCode, key);
    } catch (e) {
        throw e;
    }
}
export{    main}