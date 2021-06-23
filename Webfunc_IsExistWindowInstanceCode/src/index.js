/**
 *
 *
 */
var main = function (param) {
    var FUNCNAME = "前台函数[IsExistWindowInstanceCode]-";
    //获取函数传入的参数
    var _result = true;
    var args = param.getArgs();
    if(!CheckParamNum(FUNCNAME,args,1)) return false;
    var scopeId = args[0];//获取函数第一个参数
    if(undefined == scopeId || scopeId == ""){
        DWException(FUNCNAME+"第一个参数为空,请检查配置！");
        return false;
    }
    scopeManager.openScope(scopeId);
    var scope = scopeManager.getWindowScope();
    if(undefined == scope){
        _result = false;
    }
    scopeManager.closeScope();
    return _result;
}
export{    main}