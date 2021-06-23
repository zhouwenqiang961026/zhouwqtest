/**
 *	空值处理
 */
vds.import("vds.object.*");
var main = function(arg,defaultVal) {
    return vds.object.isUndefOrNull(arg) ? defaultVal : arg;
}
export{    main}