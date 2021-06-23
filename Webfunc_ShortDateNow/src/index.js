/**
 * 短日期(返回当前的时间的短日期格式) 代码示例:ShortDateNow()返回值为{2011-10-19} 无参数 返回值为日期类型
 */
vds.import("vds.rpc.*", "vds.date.*");
var main = function() {
    var value = vds.date.format(vds.rpc.getDate(),"yyyy-MM-dd");
    return value;
}
export{    main}