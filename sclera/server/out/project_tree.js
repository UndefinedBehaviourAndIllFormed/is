"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProjectTree = exports.check = void 0;
const node_fs_1 = require("node:fs");
exports.check = false;
function validateProjectTree(connection, folders) {
    const f = folders[0];
    const project_name = f.name;
    const project_folder = decodeURI(f.uri.replace("file://", "")) + "/";
    const sclera = project_folder + project_name + ".sclera";
    const cornea = project_folder + project_name + ".cornea";
    const docs = project_folder + "docs";
    const libs = project_folder + "libs";
    const out = project_folder + "out";
    const res = project_folder + "res";
    const src = project_folder + "src";
    if (!(0, node_fs_1.existsSync)(sclera) || !(0, node_fs_1.lstatSync)(sclera).isFile())
        connection.window.showErrorMessage("The file '" + sclera.replace(project_folder, "") + "' couldn't be found");
    else if (!(0, node_fs_1.existsSync)(cornea) || !(0, node_fs_1.lstatSync)(cornea).isFile())
        connection.window.showErrorMessage("The file '" + cornea.replace(project_folder, "") + "' couldn't be found");
    else if (!(0, node_fs_1.existsSync)(docs) || !(0, node_fs_1.lstatSync)(docs).isDirectory())
        connection.window.showErrorMessage("The documentation folder couldn't be found");
    else if (!(0, node_fs_1.existsSync)(libs) || !(0, node_fs_1.lstatSync)(libs).isDirectory())
        connection.window.showErrorMessage("The libraries folder couldn't be found");
    else if (!(0, node_fs_1.existsSync)(out) || !(0, node_fs_1.lstatSync)(out).isDirectory())
        connection.window.showErrorMessage("The output folder couldn't be found");
    else if (!(0, node_fs_1.existsSync)(res) || !(0, node_fs_1.lstatSync)(res).isDirectory())
        connection.window.showErrorMessage("The resources folder couldn't be found");
    else if (!(0, node_fs_1.existsSync)(src) || !(0, node_fs_1.lstatSync)(src).isDirectory())
        connection.window.showErrorMessage("The source folder couldn't be found");
    else
        exports.check = true;
}
exports.validateProjectTree = validateProjectTree;
//# sourceMappingURL=project_tree.js.map