/**
 *	数字的平方根
 *  代码示例:Sqrt(4)返回值为2
 *  参数数量:1
 *  参数1--指定的数字(小数类型)
 *  返回值为小数
 */
vds.import("vds.object.*", "vds.math.*");
var main = function(arg) {
    if (vds.object.isUndefOrNull(arg))
        throw new Error("数字的平方根函数参数为空，请检查");
    if (!vds.object.isNumber(arg))
        throw new Error("数字的平方根函数参数不是数字，请检查");
    if (arg < 0)
        throw new Error("数字的平方根函数参数为负数，请检查");

    return vds.math.sqrt(arg);
}
export{    main}