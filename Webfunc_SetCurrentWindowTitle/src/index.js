/**
 *  SetCurrentWindowTitle("编辑");
 *
 */
vds.import("vds.object.*", "vds.window.*");
var main = function (newTitle) {
    if (vds.object.isUndefOrNull(newTitle))
        return;

    vds.window.setTitle(newTitle);
}
export { main }