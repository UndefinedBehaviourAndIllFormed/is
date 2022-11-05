import { existsSync, lstatSync } from 'node:fs';
import { WorkspaceFolder, _, _Connection } from "vscode-languageserver/node";

export let check: boolean = false;

export function validateProjectTree(connection: _Connection<_, _, _, _, _, _, _, _>, folders: WorkspaceFolder[])
{
    const f: WorkspaceFolder = folders[0];
    const project_name: string = f.name;
    const project_folder: string = decodeURI(f.uri.replace("file://", "")) + "/";
    const sclera: string = project_folder + project_name + ".sclera";
    const cornea: string = project_folder + project_name + ".cornea";
    const docs: string = project_folder + "docs";
    const libs: string = project_folder + "libs";
    const out: string = project_folder + "out";
    const res: string = project_folder + "res";
    const src: string = project_folder + "src";
    if(!existsSync(sclera) || !lstatSync(sclera).isFile())
        connection.window.showErrorMessage("The file '" + sclera.replace(project_folder, "") + "' couldn't be found");
    else if(!existsSync(cornea) || !lstatSync(cornea).isFile())
        connection.window.showErrorMessage("The file '" + cornea.replace(project_folder, "") + "' couldn't be found");
    else if(!existsSync(docs) || !lstatSync(docs).isDirectory())
        connection.window.showErrorMessage("The documentation folder couldn't be found");
    else if(!existsSync(libs) || !lstatSync(libs).isDirectory())
        connection.window.showErrorMessage("The libraries folder couldn't be found");
    else if(!existsSync(out) || !lstatSync(out).isDirectory())
        connection.window.showErrorMessage("The output folder couldn't be found");
    else if(!existsSync(res) || !lstatSync(res).isDirectory())
        connection.window.showErrorMessage("The resources folder couldn't be found");
    else if(!existsSync(src) || !lstatSync(src).isDirectory())
        connection.window.showErrorMessage("The source folder couldn't be found");
    else
        check = true;
}