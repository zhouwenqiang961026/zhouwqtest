/**
 *  获取日历控件选中日期并新增到对应实体
 *  代码示例:
 *  GetSelectedDateToEntity("JGCalendar1", "Entity1", "date")
 *  参数数量:3
 *  参数1(字符串类型，必填，控件Code)
 *  参数2(字符串类型，必填，实体Code)
 *  参数3(字符串类型，必填，实体字段名)
 *  
 *  返回值
 */
var main = function(param) {
    var args = param.getArgs();
    if (args.length != 3)
        exceptionHandler("函数 GetSelectedDateToEntity 参数个数必须为3个!");

    var widgetCode = args[0];
    if (!widgetCode)
        exceptionHandler("函数 GetSelectedDateToEntity 第一个参数,控件Code不能为空!");

    var entityCode = args[1];
    if (!entityCode)
        exceptionHandler("函数 GetSelectedDateToEntity 第二个参数,实体名称不能为空!");

    var fieldName = args[2];
    if (!fieldName)
        exceptionHandler("函数 GetSelectedDateToEntity 第三个参数,实体字段名称不能为空!");

    // 调用控件Action方法
    var selectedDate = widgetAction.executeWidgetAction(widgetCode, "getSelectedDate", widgetCode);

    var routeContext = param.getRouteContext();

    var ds = _getDataSource(entityCode);
    insertDateToEntity(ds, fieldName, selectedDate)

    return true;
}
export{    main}