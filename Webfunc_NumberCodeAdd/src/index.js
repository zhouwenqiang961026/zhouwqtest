/**
 * 编码字符串累加或累减
 * @author	huangjr
 * @since	20120705
 * @param {Object} numberCode	能转换成数值的编码字符串
 * @param {Object} num	加减值
 */
var main = function(param) {
    var args = param.getArgs(),
        argsLen = args ? args.length : 0,
        numberCode = argsLen >= 1 ? args[0] : null,
        num = argsLen >= 2 ? args[1] : null;

    if (typeof numberCode == "string" && numberCode != "")
        numberCode = stringUtil.trim(numberCode);

    return mathUtil.numberCodeAdd(numberCode, num);
}
export{    main}