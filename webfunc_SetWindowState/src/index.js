/**
 *
 *
 */
var main = function (param) {
    //获取函数传入的参数
    var args = param.getArgs();
    var param1 = args[0];
    var windowScope =  ScopeManager.getWindowScope();
    var series = windowScope.getSeries();
    var el = gelEl(windowScope,series);
    Modal.setModalWindowState(param1,el);
}
export{    main}