/**
 *  前台MD5加密函数,编码方式为utf-8
 *  MD5EncryptByUTF8("同望")，返回值为：wd7VFY1HGgjdEK2kbS7L+w==
 *  参数数量：1 
    参数1(字符串类型，需要加密的字符串)；
    返回值为字符串类型。 
 * 
 */
var main = function (param) {
    var args = param.getArgs(),
    argsLen = args ? args.length : 0,
    retVal = "",
    encryptValue = argsLen >= 1 ? args[0] : null;
    if (encryptValue == null || encryptValue == "" || encryptValue == "null")
       return "";
    retVal = b64_md5(utf16to8(encryptValue));
    return retVal;
}
export{    main}