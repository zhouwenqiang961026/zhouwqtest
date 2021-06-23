/**
函数，根据控件编码修改控件属性
SetControlProperty("ControlCodeList","ControlPropertyCode","Value")
参数1：字符串，必填，多个控件编码逗号间隔
参数2：字符串，必填，例如Visible、ReadOnly、Enable、Lable、Value==
参数3：字符串，必填
 */
vds.import("vds.exception.*");
var main = function(controls, propertyName, propertyValue) {
    if(controls == undefined || controls === "") {
        var exception = vds.exception.newConfigException("控件编码不能为空！");
        throw exception;
    }
    controls = controls.trim();

    if(propertyName == undefined || propertyName === "") {
        var exception = vds.exception.newConfigException("属性名称不能为空！");
        throw exception;
    }
    propertyName = propertyName.trim();

    if(propertyValue === undefined) {
        var exception = vds.exception.newConfigException("属性值不能为undefined！");
        throw exception;
    }

    var widget;
    var widgetCode = "";
    var ControlList = controls.split(",");
    for(var i = 0; i < ControlList.length; i++) {
        widgetCode = ControlList[i].trim();
        widget = widgetContext.get(widgetCode, "widgetObj");
        if(widget) {
            try {
                widgetProperty.set(widgetCode, propertyName, propertyValue);
            } catch(e) {
                var widgetType = widgetContext.getType(widgetCode);
                var chineseTitleName = widgetProperty.get(widgetCode, "SimpleChineseTitle");
                vds.log.warn("[webfunc_SetControlProperty]:设置" + widgetCode + "(" + widgetType + ")属性" + propertyName + "值" + propertyValue + "出错。");
            }
        }
    }

}
export{    main}