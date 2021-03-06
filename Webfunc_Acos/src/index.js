vds.import("vds.object.*","vds.math.*","vds.number.*");
var main = function(num) {
    if (vds.object.isUndefOrNull(num)) {
        throw new Error("反余弦函数参数为空，请检查");
    }
    if (!vds.object.isNumber(num)) {
        throw new Error("反余弦函数参数不是数字，请检查");
    }
    if (num > 1 || num < -1) {
        throw new Error("反余弦函数参数不在-1至1之间，请检查");
    }
    var result = vds.number.toFixed(vds.math.acos(num), 10);
    return Number(result);
};

export{
    main
}
