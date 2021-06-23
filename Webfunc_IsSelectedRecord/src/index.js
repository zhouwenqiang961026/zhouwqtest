/**
 *  判断记录是否选中
 *  代码示例:
 *  IsSelectedRecord("book","name","数据")
 *  返回值为：true
 *  参数数量:3
 *  参数1：实体编码,必填
    参数2：字段编码,必填
    参数3：字段值,必填
 *  
 *  返回值为布尔类型
 */
vds.import("vds.ds.*","vds.exception.*");
var main = function (param) {
    //获取函数传入的参数
    var args = param.getArgs();
    if(args.length!=3){
        var exception = vds.exception.newConfigException("函数参数个数必须为3个!");
        throw exception;
    }
    var entityCode = args[0];
    var fieldCode = args[1];
    var fieldValue = args[2];
    if(!entityCode||"" == entityCode){
        var exception = vds.exception.newConfigException("函数第一个参数,实体编码不能为空!");
        throw exception;
    } 
    if(!fieldCode||"" == fieldCode){
        var exception = vds.exception.newConfigException("函数第二个参数,字段编码不能为空!");
        throw exception;
    }
    if(!fieldValue||"" == fieldValue){
        var exception = vds.exception.newConfigException("函数第三个参数,字段值不能为空!");
        throw exception;
    }
    var datasource = vds.ds.lookup(entityCode);
    if(!datasource){
        var exception = vds.exception.newConfigException("实体不存在，请重新配置!");
        throw exception;
    }
    //判断字段是否存在
    var fields = datasource.getMetadata().fields;
    var isField = false;
    for (var i = 0;i < fields.length;i++){
        var entityField = fields[i].code;
        if( entityField == fieldCode ){
            isField = true ;
            break;
        }
    }
    if(!isField){
        var exception = vds.exception.newConfigException("实体字段不存在，请重新配置!");
        throw exception;
    }
    //根据条件获取记录数
    var querycondition = new criteCondition();
    var criteriaS = querycondition.sw(fieldCode,fieldValue);
    var returnvalue = false;
    var records = datasource.queryRecord({"criteria":criteriaS});
    records = records.toArray();
    for (var rIndex = 0; rIndex < records.length; rIndex++) {
        var selRecord = records[rIndex];
        var isSelected = datasource.isSelectedRecord({"record":selRecord});
        if(isSelected){
            returnvalue = true;
            break;
        }
    }
    return returnvalue;
}
export{    main}