/**
 * 从指定的界面实体获取记录数 参数数量:1 参数1 表名 (字符串类型) 返回值为整数类型
 */
vds.import("vds.object.*","vds.ds.*", "vds.exception.*","vds.expression.*","vds.log.*");
var main = function(dsName, condition) {
    if (dsName==null){
        throw vds.exception.newConfigException("实体编码不允许为空，请检查配置");
    }
    var datasource = null;
    if(vds.ds.isDatasource(dsName)){
        datasource = dsName;
    }else{
        if(dsName.indexOf(".")==-1&&dsName.indexOf("@")==-1){
            datasource = vds.ds.lookup(dsName);
        }else{
            datasource = vds.expression.execute(dsName);
        }
    }
    if(!datasource) 
        throw vds.exception.newConfigException("无法获取实体【"+dsName+"】, 请检查实体是否存在");
    var allRecords = datasource.getAllRecords().toArray();

    if (vds.object.isUndefOrNull(condition) || typeof(condition) == 'undefined') {
        return allRecords.length;
    }
    var results = [];
    for (var i = 0; i < allRecords.length; i++) {
        var record = allRecords[i];
        try {
            var ret = vds.expression.execute(condition,{records:[record]});

            if (typeof ret != "boolean")
                throw vds.exception.newConfigException("条件必须返回布尔类型,条件表达式：【"+condition+"】");

            // 条件满足
            if (ret == true)
                results.push(record);
        } catch (e) {
            var message = "表达式执行错误！condition=" + condition + "错误信息：" + e.message;
            vds.log.error(message);
            throw vds.exception.newConfigException("实体过滤条件不正确！" + message);
        }
    }
    return results.length;
}
export{    main}