/**
 * MD5加密函数
 * by liyp on 20120615
 * 参数：encryptValue 需要加密的控件值
 */
var main = function(param) {
    var args = param.getArgs(),
        argsLen = args ? args.length : 0,
        encryptValue = argsLen >= 1 ? args[0] : null;

    if (encryptValue == null)
        return "";

    try {
        var scope = scopeManager.getWindowScope(),
            windowCode = scope ? scope.getWindowCode() : "";

        return executeExpression(windowCode, encryptValue);
    } catch (e) {
        throw e;
    }
}
export{    main}