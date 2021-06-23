/**
 *	流水号函数
 */
vds.import("vds.object.*");
var main = function(param) {
    var args = param.getArgs(),
        argsLen = args ? args.length : 0,
        TableName = argsLen >= 1 ? args[0] : null,
        TableColumn = argsLen >= 2 ? args[1] : null,
        prefix = argsLen >= 3 ? args[2] : null,
        Length = argsLen >= 4 ? args[3] : null,
        CoverLetter = argsLen >= 5 ? args[4] : null,
        likeValStr = argsLen >= 6 ? args[5] : null,
        subLength = argsLen >= 7 ? args[6] : null,
        isLeftSubFlag = argsLen >= 8 ? args[7] : null,
        isReuseSerialNumber = argsLen >= 9 ? args[8] : null;

    if (vds.object.isUndefOrNull(TableName) || vds.object.isUndefOrNull(TableColumn) || vds.object.isUndefOrNull(prefix))
        throw new Error("传入参数不能为空，请检查");

    try {
        if (vds.object.isUndefOrNull(likeValStr))
            likeValStr = "";
        if (vds.object.isUndefOrNull(subLength))
            subLength = "";

        var scope = scopeManager.getWindowScope(),
            windowCode = scope ? scope.getWindowCode() : "";

        return executeExpression(windowCode, TableName, TableColumn, prefix, Length, CoverLetter, likeValStr, subLength, isLeftSubFlag, isReuseSerialNumber);
    } catch (e) {
        throw e;
    }
}
export{    main}