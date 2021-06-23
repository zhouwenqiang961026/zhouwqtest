/**
 * 判断树的节点是否是叶子节点。
 * 
 */
vds.import("vds.object.*", "vds.ds.*");
var main = function(dataSourceName, nodeId, treeStructCfgStr) {
    // 示例：IsLeaf("datasourceName", "ID", "type:1,pidField:PID,treeCodeField:InnerCode,orderField:orderNo,isLeafField:isLeaf,busiFilterField:myBusiField")
    var treeStructCfgObj = parseCfgObj(treeStructCfgStr);

    // 树类型，1=层级码，2=左右树, 3=编码树
    var type = getPropertyValue(treeStructCfgObj, "type");
    // 父节点PID字段名
    var pidField = getPropertyValue(treeStructCfgObj, "pidField");
    // 层级码字段名
    var treeCodeField = getPropertyValue(treeStructCfgObj, "treeCodeField");
    // 顺序号字段名
    var orderField = getPropertyValue(treeStructCfgObj, "orderField");
    // 是否叶子节点字段名
    var isLeafField = getPropertyValue(treeStructCfgObj, "isLeafField");
    // 左右树left字段名
    var leftField = getPropertyValue(treeStructCfgObj, "leftField");
    // 左右树right字段名
    var rightField = getPropertyValue(treeStructCfgObj, "rightField");
    // 业务编码字段
    var bizCodeField = getPropertyValue(treeStructCfgObj, "bizCodeField");
    // 业务编码格式
    var bizCodeFormat = getPropertyValue(treeStructCfgObj, "bizCodeFormat");
    // 业务过滤字段
    var busiFilterField = getPropertyValue(treeStructCfgObj, "busiFilterField");

    var treeStruct = {};
    if ("1" == type) {
        if (vds.object.isUndefOrNull(pidField))
            throw vds.exception.newConfigException("isLeaf函数的第3个参数(树配置信息)表示层级码树时pidField不能为空！");
        if (vds.object.isUndefOrNull(treeCodeField))
            throw vds.exception.newConfigException("isLeaf函数的第3个参数(树配置信息)表示层级码树时treeCodeField不能为空！");
        if (vds.object.isUndefOrNull(orderField))
            throw vds.exception.newConfigException("isLeaf函数的第3个参数(树配置信息)表示层级码树时orderField不能为空！");
        if (vds.object.isUndefOrNull(isLeafField))
            throw vds.exception.newConfigException("isLeaf函数的第3个参数(树配置信息)表示层级码树时isLeafField不能为空！");

        treeStruct["type"] = type;
        treeStruct["pidField"] = pidField;
        treeStruct["treeCodeField"] = treeCodeField;
        treeStruct["orderField"] = orderField;
        treeStruct["isLeafField"] = isLeafField;

    } else if (type == "2") {
        if (vds.object.isUndefOrNull(pidField))
            throw vds.exception.newConfigException("isLeaf函数的第3个参数(树配置信息)表示左右树时pidField不能为空！");
        if (vds.object.isUndefOrNull(leftField))
            throw vds.exception.newConfigException("isLeaf函数的第3个参数(树配置信息)表示左右树时leftField不能为空！");
        if (vds.object.isUndefOrNull(rightField))
            throw vds.exception.newConfigException("isLeaf函数的第3个参数(树配置信息)表示左右树时rightField不能为空！");

        treeStruct["type"] = type;
        treeStruct["pidField"] = pidField;
        treeStruct["leftField"] = leftField;
        treeStruct["rightField"] = rightField;
    } else if (type == "3") {
        if (vds.object.isUndefOrNull(bizCodeField))
            throw vds.exception.newConfigException("isLeaf函数的第3个参数(树配置信息)表示编码树时bizCodeField不能为空！");
        if (vds.object.isUndefOrNull(bizCodeFormat))
            throw vds.exception.newConfigException("isLeaf函数的第3个参数(树配置信息)表示编码树时bizCodeFormat不能为空！");

        treeStruct["type"] = type;
        treeStruct["bizCodeField"] = bizCodeField;
        treeStruct["bizCodeFormat"] = bizCodeFormat;
    } else {
        throw vds.exception.newConfigException("isLeaf函数的第3个参数(树配置信息)中的type类型值必须为1,2,3三种！");
    }

//        if (vds.object.isUndefOrNull(busiFilterField))
//            throw new Error("isLeaf函数的第3个参数(树配置信息)中的业务过滤字段busiFilterField不能为空！");

    var selectedRecord = null;
    var datasource = vds.ds.lookup(dataSourceName);
    if(null == datasource){
        throw vds.exception.newConfigException("实体【"+dataSourceName+"】不存在");
    }
    try {
        if (!nodeId)
            selectedRecord = datasource.getCurrentRecord();
        else
            selectedRecord = datasource.getRecordById(nodeId);

    } catch (e) {
        throw new Error("isLeaf函数执行获取树数据时出错：" + e.message);
    }
    if (selectedRecord == null) {
        var msg = nodeId ? "树数据中不存在ID为" + nodeId + "的记录" : "树数据中当前行记录为空";
        throw new Error("isLeaf函数执行出错:" + msg);
    }

    try {
        var treeViewModel = treeManager.lookup({
            "datasourceName": dataSourceName,
            "treeStruct": treeStruct
        });
        var children = treeViewModel.getNodeById(nodeId);
        return children.isLeaf();
    } catch (e) {
        throw new Error("isLeaf函数执行出错：" + e.message);
    }
}
export{    main}