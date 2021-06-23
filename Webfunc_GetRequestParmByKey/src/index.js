var main = function(param) {

    
    var args = param.getArgs();
    var key = args[0];
    //是否解码,默认解码
    var isDeCode = false === args[1] ? false : true ;
    var retStr = "";
    var url = window.document.location.href.toString();
    var u = url.split("?");
    var get = {};
    if(typeof(u[1]) == "string"){
        u = u[1].split("&");
        for(var i=0;i<u.length;i++){
             var j = u[i].split("=");
             get[j[0]] = j[1];
        }
    }
    if(get.hasOwnProperty(key)){
        var val = get[key];
        if(isDeCode && null != val){
            retStr = decodeURIComponent(val);
        }else{
            retStr = val;
        }
    }
    return retStr;
    
}
export{    main}