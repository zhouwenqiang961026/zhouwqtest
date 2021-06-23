/**
 *	移除前导空白字符
 *  代码示例:TrimStart('  sdfsd ') 返回值为 'sdfsd '
 *  参数数量:1
 *  参数1(字符串类型)
 *  返回值为字符串类型
 */
vds.import("vds.object.*", "vds.string.*");
var main = function(str) {
    if (vds.object.isUndefOrNull(str))
        return "";
    else {
        //替换掉前空格
        str = String(str);
        return vds.string.ltrim(str);
    }
}
export{    main}