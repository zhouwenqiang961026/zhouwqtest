/**
 *
 *
 */
var main = function (param) {
    //获取函数传入的参数
//		var args = param.getArgs();
//		var argsLen = args ? args.length : 0;
//		
//		if(argsLen!=2){
//			 return "";
//		}
//		var fileid = args[0];
//		var FileInfoType = args[1];
    try {
         var scope = scopeManager.getWindowScope();
         var windowCode = scope ? scope.getWindowCode() : "";
         return executeExpression(windowCode);
    } catch (e) {
         throw e;
    }
    
}
export{    main}