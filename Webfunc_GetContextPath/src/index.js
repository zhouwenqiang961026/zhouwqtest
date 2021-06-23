/**
 * 获取当前应用上下文：GetContextPath() 返回值等同 request.getContextPath的效果。
 */
var main = function(param) {
    return environment.getContextPath();
}
export{    main}