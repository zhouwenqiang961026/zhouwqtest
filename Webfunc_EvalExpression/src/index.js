/**
 * 执行表达式
 */
vds.import("vds.expression.*");
var main = function(expressionSrc) {
    var value = vds.expression.execute(expressionSrc);
    return value;
}
export{    main}