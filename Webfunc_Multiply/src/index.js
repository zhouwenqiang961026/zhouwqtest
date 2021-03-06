
vds.import("vds.math.*");
var main = function(param) {
    var args = arguments,
        argsLen = args ? args.length : 0;

    if (argsLen > 0) {
        var result = 0;
        for (var i = 0, argsLen; i < argsLen; i++) {
            var tmpArg = args[i];
            if (undefined === tmpArg || null === tmpArg || tmpArg === "")
                return 0;
            else {
                if (i === 0) {
                    result = tmpArg;
                    continue;
                }

                try {
                    result = Number(vds.math.multiply(result, tmpArg));
                } catch (e) {
                    return NaN;
                }
            }
        }

        return result;
    } else
        return NaN;
}
export{    main}