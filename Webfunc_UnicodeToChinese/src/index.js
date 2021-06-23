/**
 *
 *
 */
vds.import("vds.object.*");
var toChinese = function(data) {
    if (vds.object.isUndefOrNull(data))
        return "";

    data = data.replace(/\\/g, "%");  
    var retVal = unescape(data);
    return retVal;
}
var main = function (arg1) {
    if (vds.object.isUndefOrNull(arg1))
        return "";

    arg1 = String(arg1);
    var retVal = toChinese(arg1);
    return retVal;
}
export{    main}