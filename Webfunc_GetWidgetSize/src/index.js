/**
 * GetWidgetSize("WidgetCode", "height/width") 返回数值
 * 暂时只支持普通窗体面板和流布局
 */
var main = function(param) {
    var args = param.args;

    var widgetCode = args[0];
    if (!widgetCode)
        exceptionHandler("函数 GetWidgetSize 第一个参数，控件Code不能为空！");

    var valueCode = args[1];
    if (!valueCode || (valueCode !== "height" && valueCode !== "width"))
        exceptionHandler("函数 GetWidgetSize 第二个参数，属性 Code 必须为 height 或者 width！");

    if (valueCode)
       return widgetAction.executeWidgetAction(widgetCode, _genActionMethodName(valueCode));
    else
       return 0;
}
export{    main}