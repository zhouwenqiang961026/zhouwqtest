/**
 * 判断当前用户是否已登录：IsLogin() 当前用户已登录、并且当前会话有效（未过期），返回true；否则，返回false
 */
var main = function(param) {
    var scope = scopeManager.getWindowScope(),
        windowCode = scope ? scope.getWindowCode() : "",
        result = false;
        scope = scopeManager.getScope();
    /*operation.request({
        "windowCode": windowCode,
        "operation": "IsLoginExpression",
        "isAsync": false,
        "params": null,
        "success": function(rs) {
            if (rs.data && rs.data.id)
                result = true;
        },
        "error": function(e) {
            throw e;
        }
    });*/
    var routeContext = param.getRouteContext();
    var params = null;
    var callback = function(rs){
        if (rs.data && rs.data.id)
            result = true;
        //return result;
    };
    var sConfig = {
            "isAsyn": false,
            "componentCode": scope && scope.getComponentCode ? scope.getComponentCode() : "",
            "windowCode": windowCode,
            "transactionId": routeContext.getTransactionId(),
            ruleSetCode: "IsLoginExpression",
            isRuleSetCode:false,
            commitParams: [{
                "paramName": "InParams",
                "paramType": "char",
                "paramValue": params
            }],
            afterResponse: callback
        }

        remoteMethodAccessor.invoke(sConfig);

    return result;
}
export{    main}