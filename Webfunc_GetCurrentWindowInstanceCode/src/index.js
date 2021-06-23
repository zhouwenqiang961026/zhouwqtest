/**
 * 
 * 
 */
var main = function(param) {
//		var currentWindowInstanceCode = scopeManager.getCurrentScopeId();//客户端方法里面执行会取到构件域
//		return currentWindowInstanceCode ? currentWindowInstanceCode : null;
    var winScope = scopeManager.getWindowScope();
    if(winScope){
        return winScope.getInstanceId();
    }
    return null;
}
export{    main}