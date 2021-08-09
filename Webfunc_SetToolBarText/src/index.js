/**
 *
 *
 */
//主入口(必须有)
var main = function (param) {
    //获取函数传入的参数
    var args = param.getArgs();
    //控件编码
    var widgetCode = args[0];
    //实体编码
    var entityCode = args[1];
    if (null == widgetCode || "" == widgetCode || null == entityCode || "" == entityCode) {
        return;
    }
    //标题字段
    var title = args[2] ? args[2] : "title";
    //值字段
    var value = args[3] ? args[3] : "value";
    //单位，屏蔽单位
    var unit = ""; //args[4] ? args[4] : "";

    widget = widgetContext.get(widgetCode, "widgetObj");
    var types = ["JGDataGrid", "JGTreeView", "JGTreeGrid"];
    if (widget && types.indexOf(widget.type) != -1) {
        //添加样式
        //initConfig();

        var datasource = datasourceManager.lookup({
            "datasourceName": entityCode
        });

        if (null == datasource) {
            return;
        }
        var records = datasource.getAllRecords();
        if (!records || records.length == 0) {
            return;
        }
        var currencyField = vds.window.getCurrencyField();
        var formatField = null;
        if (currencyField && currencyField[entityCode]) {
            formatField = currencyField[entityCode][value];
        }
        //如果是金额格式，并且没有配置单位，则给默认单位.
        if (formatField && formatField.numType == 2 && !unit) {
            unit = "元";
        }
        records = records.toArray();
        var html = ['<div class="box">'];
        for (var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            var t = record.get(title);
            if (null === t || undefined == t) t = "";
            var val = record.get(value);
            if (null === val || undefined == val) val = "";
            val = formatValue(val, formatField);
            html.push('<span class="item"><font>' + t + ':</font><em>' + val + unit + '</em></span>')
        }
        html.push('</div>')
        try {
            widgetProperty.set(widgetCode, "ToolbarText", html.join(""));
        } catch (e) {
            log.warn("[SetToolBarText]:设置" + widgetCode + "(" + widget.type + ")属性ToolbarText 值" + html.join("") + "出错。");
        }
    }
};

var formatValue = function (value, formatField) {
    if (!isAddStyle) {
        environment.parseCssStr(".box {white-space:  nowrap;overflow: hidden;text-overflow: ellipsis;font-size:14px;}.box .item:first-child{  padding-left:0;}.box span.item em {font-style: normal;}.box span.item {line-height: 30px;padding-left: 32px;}");
        isAddStyle = true;
    }
    if (!formatHelperUtils && window.isc && window.isc.JGFormatHelper) {
        formatHelperUtils = isc.JGFormatHelper.create();
    }
    if (!formatField || !formatHelperUtils) { //普通转移动兼容逻辑
        return value;
    }
    return formatHelperUtils.valueFormat(value, formatField.displayFormat, formatField.numType);
}
export {
    main
}