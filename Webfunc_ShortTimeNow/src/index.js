/**
 * 短时间(返回当前时间的短时间格式) 代码示例:ShortTimeNow()返回值为{12:05} 无参数 返回值为日期类型
 */
vds.import("vds.rpc.*", "vds.date.*");
var main = function() {
    var value = vds.date.format(vds.rpc.getDate(),"HH:mm");
    return value;
}
export{    main}