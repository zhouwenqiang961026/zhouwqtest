/**
 * 获取远程图片GetImageUrlByFileId() 
 */
var main = function(param) {
    var args = param.getArgs();
    var fileId = args[0];
    var url = getImageSrc(fileId);
    return url;
}
export{    main}