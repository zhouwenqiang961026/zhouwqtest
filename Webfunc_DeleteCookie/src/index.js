/**
 * 删除cookie
 */
vds.import("vds.object.*");
var main = function(param) {
    var args = param.getArgs(),
        argsLen = args ? args.length : 0,
        name = argsLen >= 1 ? args[0] : null;
    var path = argsLen >= 2 && args[1] ? args[1] : "/"; // 可选。 cookie服务器路径
    var domain = argsLen >= 3 && args[2]? args[2] : null; // 可选。cookie域名。

    if (vds.object.isUndefOrNull(name))
        throw new Error("传入cookie名称为空，请检查");

    try {
        var options = {
            path : path,
            domain : domain
        };
        // 可选。cookie服务器路径
        cookieUtil.vcookie({
            "name": name,
            "value": null,
            "options" : options
        });
        return true;
    } catch (e) {
        return false;
    }
}
export{    main}