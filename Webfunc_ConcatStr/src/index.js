/**
 *	字符串相互合并
 *  代码示例:ConcatStr('a','b') 返回值为'ab'
 *  参数数量:2
 *  参数1(字符串类型)，参数2(字符串类型)
 *  返回值为字符串类型
 */
vds.import("vds.object.*", "vds.string.*");
var main = function() {
    var args = arguments,
        argsLen = args ? args.length : 0,
        retStr = args && argsLen >= 1 &&args[0] ? args[0] : "";

    for (var index = 1; index < args.length; index++) {
        if (vds.object.isUndefOrNull(args[index]))
            retStr = vds.string.concat(retStr, "");
        else
            retStr = vds.string.concat(retStr, args[index]);
    }

    return retStr;
}
export{    main}