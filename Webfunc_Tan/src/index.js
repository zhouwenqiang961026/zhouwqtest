/**
 * 正切 代码示例:Tan(1) 1.5574077246549023 参数数量:1 参数1--指定的角度(小数类型) 返回值为小数
 */
vds.import("vds.object.*", "vds.math.*", "vds.number.*");
var main = function(arg) {
    if (vds.object.isUndefOrNull(arg))
        throw new Error("正切函数参数为空，请检查");
    if (!vds.object.isNumber(arg))
        throw new Error("正切函数参数不是数字，请检查");

    var pai = vds.math.pi();
    var judgeNum = vds.math.remainder((arg - pai / 2), pai);
    if (judgeNum == 0)
        throw new Error("正切函数参数不符合要求，请检查");

    var result = vds.number.toFixed(vds.math.tan(arg), 10);
    return Number(result);
}
export{    main}