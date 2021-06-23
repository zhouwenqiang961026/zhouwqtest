/**
 *  SetCurrentWindowTitle("编辑");
 *
 */
var main = function (param){
    var args = param.getArgs(),
    argsLen = args ? args.length : 0,
            newTitle = argsLen >= 1 ? args[0] : null;
        if (newTitle == null)
            return;
    var scope = scopeManager.getWindowScope();
    if(scope){
        windowContainerManager.updateTitleByScopeId(scope.getInstanceId(),newTitle);
    }
}
export{    main}