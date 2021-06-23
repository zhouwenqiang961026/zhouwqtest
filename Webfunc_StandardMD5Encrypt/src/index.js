/**
 * 前台函数 标准加密
 * 代码示例:StandardMD5Encrypt("123456","16","big")  返回值为："49BA59ABBE56E057"
     参数数量:3
     参数1(字符串类型，必填，需要加密的字符串)
     参数2(字符串类型，可选填，加密的位数，有16位和32位两种类型）
     参数3(字符串类型，可选填，输出的大小写，有"big"和"small"两种类型）
     参数2和参数3都不填，则默认为32位大写
     返回值为字符串类型
 * 
 *
 */
var main = function (param) {
    var args = param.getArgs(),
    argsLen = args ? args.length : 0,
    retVal = "",
    encryptValue = argsLen >= 1 ? args[0] : null;
   
    if (encryptValue == null || encryptValue == "")
       return "";
    var unit = "32";
    var upperType = "big";
    if(argsLen > 1){
        if( args[1] == "16"){
            unit = "16";
        }
        if( argsLen > 2){
            if(args[2] == "small"){
                upperType = "small";
            }
        }
    }
     
    retVal = hex_md5(utf16to8(encryptValue));
    if( unit == "16"){
        retVal = retVal.substring(8, 24);
    }
    if( upperType == "big"){
        retVal = retVal.toUpperCase();
    }
    
    return retVal;
 }
export{    main}