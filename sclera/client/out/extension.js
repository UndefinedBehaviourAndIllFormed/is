"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = exports.deactivate = void 0;
const path = require("path");
const vscode_1 = require("vscode");
const node_1 = require("vscode-languageclient/node");
let clientIris;
function deactivate() {
    return !clientIris ? undefined : clientIris.stop();
}
exports.deactivate = deactivate;
function activate(context) {
    const server = context.asAbsolutePath(path.join('server', 'out', 'server.js'));
    clientIris = new node_1.LanguageClient("iris", "Iris Language Server", { run: { module: server, transport: node_1.TransportKind.ipc }, debug: { module: server, transport: node_1.TransportKind.ipc } }, { documentSelector: [{ scheme: 'file', language: 'iris' }, { scheme: 'file', language: 'sclera' }, { scheme: 'file', language: 'cornea' }], synchronize: { fileEvents: vscode_1.workspace.createFileSystemWatcher('**/.clientrc') } });
    clientIris.start();
    vscode_1.workspace.onDidCreateFiles(() => {
        clientIris.sendNotification("iris.validateTree");
    });
    vscode_1.workspace.onDidDeleteFiles(() => {
        clientIris.sendNotification("iris.validateTree");
    });
    vscode_1.workspace.onDidRenameFiles(() => {
        clientIris.sendNotification("iris.validateTree");
    });
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map