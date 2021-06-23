/**
 *  获取树和树表控件特定节点及子节点的id集合
    代码示例：
    GetTreeEntityIds("JGTreeGrid1","1","-")
    返回值为："1-2-4-3"
    参数1：树/树表控件编码，必填（字符串类型）
    参数2：记录id，选填，默认为当前行记录id（字符串类型）
    参数3：分隔符，选填，默认为 ","（字符串类型）
    返回值为字符串类型

*/
var main = function (widgetCode, recordId, spitStr) {
    if(!widgetCode||"" == widgetCode){
        var exception = vds.exception.newConfigException("函数第一个参数,实体编码不能为空!");
        throw exception;
    } 
    //获取控件树形结构
    var pidField = widgetContext.get(widgetCode, "PIDColumn");
    var orderField = widgetContext.get(widgetCode, "OrderNoColumn");
    var treeCodeField = widgetContext.get(widgetCode, "InnerCodeColumn");
    var leftField = widgetContext.get(widgetCode, "LeftCodeColumn");
    var rightField = widgetContext.get(widgetCode, "RightCodeColumn");
    var	isLeafField = widgetContext.get(widgetCode, "LeafNode");
    //获取实体名
    var tableName = widgetMapping.getDatasourceNamesByWidgetCode({"widgetCode":widgetCode});
    /*var treeStruct = {
         "type": "1",
         "pidField": "code",
         "treeCodeField": "InnerCode",
         "orderField": "OrderNo",
         "isLeafField": "IsLeaf",
         "leftField": "LeftCode",
         "rightField": "RightCode"
       };*/
    var treeStruct = {
             "type": "1",
             "pidField": pidField,
             "treeCodeField": treeCodeField,
             "orderField": orderField,
             "isLeafField": isLeafField,
             "leftField": leftField,
             "rightField": rightField
           };
    //获取树形实体
    var treeManager = sandbox.getService("vjs.framework.extension.platform.services.model.manager.tree.TreeManager");
    var tree = treeManager.lookup({"datasourceName":tableName,"treeStruct":treeStruct});
    //获取节点id(若为空，则取当前记录)
    if( recordId == ''){
        //获取当前记录
        var record = tree.getCurrentRecord();
        var recordId = record.getSysId();
        //var recordId = record.get("id");
    }
    var node = tree.getNodeById(recordId);
    var ids = [recordId];
    ids = ids.concat(iterate(node));
    //设置返回结果
    if( spitStr == ''){
        spitStr = ",";
    }
    return ids.join(spitStr);
}
export{    main}