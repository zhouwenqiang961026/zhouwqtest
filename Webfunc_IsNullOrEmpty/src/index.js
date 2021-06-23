/**
 *	空值空字符串处理
 */
vds.import("vds.object.*","vds.string.*");
var main = function(arg,defaultVal) {
    return (vds.object.isUndefOrNull(arg) || vds.string.isEmpty(arg)) ? defaultVal : arg;
}
export{    main}