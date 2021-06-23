/**
 * 将实体转换成变量字符串
 */
vds.import("vds.ds.*","vds.exception.*");
var main = function(str) {
    if (str) {
        var entities = str.split(",");
        var entitiesObj = {};
        for ( var i = 0; i < entities.length; i++) {
            var entityName = entities[i];
            var tempDB = vds.ds.lookup(entityName);
            if(!tempDB){
                throw vds.exception.newConfigException("无法获取实体【"+entityName+"】, 请检查实体是否存在");
            }
            var tempDBObj = tempDB.serialize();
            entitiesObj[entityName] = tempDBObj;
        }
        var retVar = JSON.stringify(entitiesObj);
        return retVar;
    }
}
export{    main}