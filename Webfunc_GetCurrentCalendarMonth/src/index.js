/**
 * 获取日历控件当前的值
 * 范例：GetCurrentCalendarMonth("JGCalendar1")
 * 返回值 "yyyyMM"
 */
var main = function(param) {
    var args = param.getArgs(),
        argsLen = args ? args.length : 0,
        expressionSrc = argsLen >= 1 ? args[0] : null;

    var widget = widgetContext.get(expressionSrc, "widgetObj");
    if (widget)
        return widget.getCurrentMonth();
    return null;
}
export{    main}