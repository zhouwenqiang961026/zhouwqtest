/**
 *
 *
 */
var main = function (param) {

    var scope = scopeManager.getWindowScope();
    return scope ? scope.getWindowCode() : "";
}
export{    main}