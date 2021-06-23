/**
 * 时间日期(返回当前的时间日期) 代码示例:LocateDateTimeNow()返回值为{2011-10-19 12:03:44} 无参数 获取本地浏览器的时间，按yyyy-MM-dd HH:mm:ss格式输出
 */
vds.import("vds.date.*");
var main = function() {
    var value = vds.date.format(new Date(), "yyyy-MM-dd HH:mm:ss");
    return value;
}
export{    main}