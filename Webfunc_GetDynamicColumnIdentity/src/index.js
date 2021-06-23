/**
 *
 *
 */
var main = function (param) {
    //获取函数传入的参数
    var args = param.getArgs();
    var routeContext = param.getRouteContext(); //获取路由上下文，函数里想执行一些表达式逻辑需要用到
    //获取参数
    var widgetId = args[0];//获取函数第一个参数：树表构件编号
    var columnName = args[1];//获取函数第二个参数：实体字段编号
    var widget = widgetContext.get(widgetId, "widgetObj");
    if(widget && columnName){
        var field = widget.lastClickField;
        if(field && field.remark && field.remark.identityValues){
            return field.remark.identityValues[columnName];
        }
    }
    return null;
    //...
    //根据参数实现函数处理逻辑
    //todo:
    
}
export{    main}