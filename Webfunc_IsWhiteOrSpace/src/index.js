/**
 *	检查字符串是否仅为空白字符组成
 *  代码示例:IsWhiteorSpace('   ') 返回值为 true
 *  参数数量:1
 *  参数1(字符串类型)
 *  返回值为布尔类型
 */
vds.import("vds.object.*", "vds.string.*");
var main = function(str) {
    if (vds.object.isUndefOrNull(str)) {
        if (str === null)
            return true;
        else
            throw new Error("传入参数不存在，请检查!");
    } else {
        //替换掉前后空格
        str = vds.string.ltrim(vds.string.rtrim(String(str)));
        if (str.length > 0)
            return false;
        else
            return true;
    }
}
export{    main}