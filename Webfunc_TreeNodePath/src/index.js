/**
 *  weicd
 *
 */
vds.import("vds.object.*", "vds.ds.*", "vds.exception.*");
var main = function(param) {
    var args = param.getArgs(),
        argsLen = args ? args.length : 0,
        dataSource = argsLen >= 1 ? args[0] : null,
        fieldName = argsLen >= 2 ? args[1] : null,
        spliter = argsLen >= 3 ? args[2] : null,
        treeStructCfgStr = argsLen >= 4 ? args[3] : null;

    var treeStructCfgObj = parseCfgObj(treeStructCfgStr);
    //树类型，1=层级码，2=左右树, 3=编码树
    var type = getPropertyValue(treeStructCfgObj, "type");
    //父节点PID字段名
    var pidField = getPropertyValue(treeStructCfgObj, "pidField");
    //层级码字段名
    var treeCodeField = getPropertyValue(treeStructCfgObj, "treeCodeField");
    //顺序号字段名
    var orderField = getPropertyValue(treeStructCfgObj, "orderField");
    //是否叶子节点字段名
    var isLeafField = getPropertyValue(treeStructCfgObj, "isLeafField");
    //左右树left字段名
    var leftField = getPropertyValue(treeStructCfgObj, "leftField");
    //左右树right字段名
    var rightField = getPropertyValue(treeStructCfgObj, "rightField");
    //业务编码字段
    var bizCodeField = getPropertyValue(treeStructCfgObj, "bizCodeField");
    //业务编码格式
    var bizCodeFormat = getPropertyValue(treeStructCfgObj, "bizCodeFormat");
    //业务过滤字段
    var busiFilterField = getPropertyValue(treeStructCfgObj, "busiFilterField");

    var treeStruct = {};
    if ("1" == type) {
        if (vds.object.isUndefOrNull(pidField))
            throw new Error("TreeNodePath函数的(树配置信息)表示层级码树时pidField不能为空！");
        if (vds.object.isUndefOrNull(treeCodeField))
            throw new Error("TreeNodePath函数的(树配置信息)表示层级码树时treeCodeField不能为空！");
        if (vds.object.isUndefOrNull(orderField))
            throw new Error("TreeNodePath函数的(树配置信息)表示层级码树时orderField不能为空！");
        if (vds.object.isUndefOrNull(isLeafField))
            throw new Error("TreeNodePath函数的(树配置信息)表示层级码树时isLeafField不能为空！");

        treeStruct["type"] = type;
        treeStruct["pidField"] = pidField;
        treeStruct["treeCodeField"] = treeCodeField;
        treeStruct["orderField"] = orderField;
        treeStruct["isLeafField"] = isLeafField;

    } else if (type == "2") {
        if (vds.object.isUndefOrNull(pidField))
            throw new Error("TreeNodePath函数的(树配置信息)表示左右树时pidField不能为空！");
        if (vds.object.isUndefOrNull(leftField))
            throw new Error("TreeNodePath函数的(树配置信息)表示左右树时leftField不能为空！");
        if (vds.object.isUndefOrNull(rightField))
            throw new Error("TreeNodePath函数的(树配置信息)表示左右树时rightField不能为空！");

        treeStruct["type"] = type;
        treeStruct["pidField"] = pidField;
        treeStruct["leftField"] = leftField;
        treeStruct["rightField"] = rightField;
    } else if (type == "3") {
        if (vds.object.isUndefOrNull(bizCodeField))
            throw new Error("TreeNodePath函数的(树配置信息)表示编码树时bizCodeField不能为空！");
        if (vds.object.isUndefOrNull(bizCodeFormat))
            throw new Error("TreeNodePath函数的(树配置信息)表示编码树时bizCodeFormat不能为空！");

        treeStruct["type"] = type;
        treeStruct["bizCodeField"] = bizCodeField;
        treeStruct["bizCodeFormat"] = bizCodeFormat;
    } else {
        throw new Error("TreeNodePath函数的(树配置信息)中的type类型值必须为1,2,3三种！");
    }


    if (!spliter) {
        spliter = "/";
    }
    var datasource = vds.ds.lookup(dataSource);
    var selected = datasource.getCurrentRecord();
    var retValue = [];
    if (selected) {
        var pathArray;
        var tree = treeManager.lookup({
            "datasourceName": dataSource,
            "treeStruct": treeStruct
        });
        fieldName = _getFieldName(fieldName);
        var node = tree.getNodeById(selected.getSysId());
        pathArray = treeViewUtil.getTreeNodePath({
            "node": node,
            "fieldCode": fieldName
        })
        retValue = pathArray.reverse().join(spliter);
        return retValue;
    } else {
        return "";
    }
}
export{    main}