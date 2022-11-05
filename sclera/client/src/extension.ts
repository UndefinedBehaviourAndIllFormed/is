import * as path from 'path';
import { ExtensionContext, window, workspace } from 'vscode';
import { LanguageClient, TransportKind } from 'vscode-languageclient/node';

let clientIris: LanguageClient;

export function deactivate(): Thenable<void> | undefined
{
    return !clientIris ? undefined : clientIris.stop();
}

export function activate(context: ExtensionContext)
{
    const server = context.asAbsolutePath(path.join('server', 'out', 'server.js'));
    clientIris = new LanguageClient("iris", "Iris Language Server", {run: { module: server, transport: TransportKind.ipc }, debug: {module: server, transport: TransportKind.ipc}}, {documentSelector: [{ scheme: 'file', language: 'iris' }, { scheme: 'file', language: 'sclera' }, { scheme: 'file', language: 'cornea' }], synchronize: { fileEvents: workspace.createFileSystemWatcher('**/.clientrc')}});
    clientIris.start();
    workspace.onDidDeleteFiles(()=>
    {
        clientIris.sendNotification("iris.validateTree");
    });
    workspace.onDidRenameFiles(()=>
    {
        clientIris.sendNotification("iris.validateTree");
    });
}