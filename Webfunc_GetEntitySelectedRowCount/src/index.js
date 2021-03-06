/**
 * 从指定的界面实体获取记录数 参数数量:1 参数1 实体编码 (字符串类型) 返回值为整数类型
 */
vds.import("vds.ds.*","vds.exception.*");
var main = function(dsName) {
    if (dsName==null)
        throw vds.exception.newConfigException("实体名称不允许为空，请检查");
    var datasource = vds.ds.lookup(dsName);
    if(!datasource) 
        throw vds.exception.newConfigException("无法获取实体【"+dsName+"】, 请检查实体是否存在");
    var selectedRecords = datasource.getSelectedRecords().toArray();
    return selectedRecords.length;
}
export{    main}