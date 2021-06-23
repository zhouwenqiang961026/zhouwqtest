/**
 * 获取cookie值(从客户端获取cookie值)
 */
vds.import("vds.object.*");
var main = function(param) {
    var args = param.getArgs(),
        argsLen = args ? args.length : 0,
        name = argsLen >= 1 ? args[0] : null,
        defaultVal = argsLen >= 2 ? args[1] : null;

    if (vds.object.isUndefOrNull(name))
        throw new Error("传入cookie名称为空，请检查");
    if (vds.object.isUndefOrNull(defaultVal))
        throw new Error("传入cookie值的默认值为空，请检查");

    var cookieVal = cookieUtil.vcookie({
        "name": name
    });

    if (vds.object.isUndefOrNull(cookieVal))
        return defaultVal;

    return cookieVal;
}
export{    main}