/**
 * 
 */
vds.import("vds.object.*");
var main = function(str) {
    if (vds.object.isUndefOrNull(str))
        return 0;

    str = String(str);
    return str.length;
}
export{    main}