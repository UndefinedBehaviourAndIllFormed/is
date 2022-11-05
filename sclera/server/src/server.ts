import { TextDocument } from "vscode-languageserver-textdocument";
import { CompletionItem, CompletionItemKind, createConnection, CreateFilesParams, Diagnostic, DidChangeConfigurationNotification, InitializeParams, InitializeResult, NotificationHandler, ProposedFeatures, TextDocumentPositionParams, TextDocuments, TextDocumentSyncKind, WorkspaceFolder } from "vscode-languageserver/node";
import { check, validateProjectTree } from "./project_tree";

/*const connection = createConnection(ProposedFeatures.all);
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);
let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;

connection.onInitialize((params: InitializeParams) =>
{
	const capabilities = params.capabilities;
	hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
	hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
	const result: InitializeResult = { capabilities: { textDocumentSync: TextDocumentSyncKind.Incremental, completionProvider: { resolveProvider: true }}};
	if (hasWorkspaceFolderCapability)
		result.capabilities.workspace = { workspaceFolders: {supported: true}};
	if(params.workspaceFolders)
		connection.console.error(params.workspaceFolders[0].uri);
	connection.workspace.initialize(capabilities);
	return result;
});

connection.onInitialized(() =>
{
	if (hasConfigurationCapability)
		connection.client.register(DidChangeConfigurationNotification.type, undefined);
	if (hasWorkspaceFolderCapability)
		connection.workspace.onDidChangeWorkspaceFolders(_event => {connection.console.log('Workspace folder change event received.');});
	validateBasicTree();
	
	connection.workspace.onDidCreateFiles(v =>
		{
			validateBasicTree();
		});
		
		connection.workspace.onDidDeleteFiles(v =>
		{
			validateBasicTree();
		});
		
		connection.workspace.onDidRenameFiles(v =>
		{
			validateBasicTree();
		});
});

interface ScleraSettings
{
	maxNumberOfProblems:number;
}

let defaultSettings: ScleraSettings = {maxNumberOfProblems: 100};
let globalSettings: ScleraSettings = defaultSettings;
const documentSettings: Map<string, Thenable<ScleraSettings>> = new Map();

connection.onDidChangeConfiguration(change =>
{
	hasConfigurationCapability ? documentSettings.clear() : globalSettings = <ScleraSettings>((change.settings.languageServerExample || defaultSettings));
	documents.all().forEach(validateTextDocument);
});

function getDocumentSettings(resource: string): Thenable<ScleraSettings>
{
	if (!hasConfigurationCapability)
		return Promise.resolve(globalSettings);
	let result = documentSettings.get(resource);
	if (!result)
    {
		result = connection.workspace.getConfiguration({scopeUri: resource, section: 'iris'});
		if(!result)
		{
			connection.workspace.getConfiguration({scopeUri: resource, section: 'cornea'});
			if(!result)
				connection.workspace.getConfiguration({scopeUri: resource, section: 'sclera'});
		}
		documentSettings.set(resource, result);
	}
	return result;
}

documents.onDidClose(e =>
{
	documentSettings.delete(e.document.uri);
});

let active: string = "";
let mode: number = 0;
let ft: boolean = false;

function loadActive(f: string)
{
	active = f;
	if(f.endsWith(".sclera"))
		mode = 1;
	else if(f.endsWith(".cornea"))
		mode = 2;
	else if(f.endsWith(".iris"))
		mode = 3;
	else
		mode = 0;
}

/*connection.workspace.onDidRenameFiles(handler =>
{
	for(let x = 0; x < handler.files.length; ++x)
		if(handler.files[x].newUri == active)
		{
			loadActive(handler.files[x].newUri);
			break;
		}
});

function validateBasicTree()
{
	connection.window.showInformationMessage("hewwo");
	connection.workspace.getWorkspaceFolders().then((v) =>
	{
		if(!v)
			connection.window.showErrorMessage("The project is not a workspace folder");
		else
			validateProjectTree(connection, v);
	});
}

documents.onDidOpen(e =>
{
	//loadActive(e.document.uri);
});

documents.onDidChangeContent(change =>
{
	//validateTextDocument(change.document);
});

async function validateTextDocument(textDocument: TextDocument): Promise<void>
{
	//lexer.settings = await getDocumentSettings(textDocument.uri);
	//if(mode == 3)
	//{const diagnostics = lex(hasDiagnosticRelatedInformationCapability, textDocument.getText() + " ");
	//connection.sendDiagnostics({ uri: textDocument.uri,  diagnostics: diagnostics ? diagnostics : [] });
};

connection.onDidChangeWatchedFiles(_change =>
{
	connection.console.log('We received an file change event');
});

connection.onCompletion((_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] =>
{
	switch(mode)
	{
		case 1:
		return [
			{
				label: 'compiler_version',
				kind: CompletionItemKind.Keyword,
				data: 1
			},
			{
				label: 'indentation',
				kind: CompletionItemKind.Keyword,
				data: 2
			},
    	    {
				label: 'measurement',
				kind: CompletionItemKind.Keyword,
				data: 3
			},
        	{
				label: 'nanoseconds',
				kind: CompletionItemKind.Constant,
				data: 4
			},
	        {
				label: 'microseconds',
				kind: CompletionItemKind.Constant,
				data: 5
			},
    	    {
				label: 'milliseconds',
				kind: CompletionItemKind.Constant,
				data: 6
			}
		];
		break;
		case 2:
		break;
		case 3:
		break;
	}
	return [];
});

connection.onCompletionResolve((item: CompletionItem): CompletionItem =>
{
	switch(mode)
	{
		case 1:
		switch(item.data)
		{
			case 1:
				item.detail = 'Project compiler version';
				item.documentation = 'The compiler version being use to compile the project';
			break;
			case 2:
				item.detail = 'Project tabulation indentation';
				item.documentation = 'The indentation of the tabulation key for the project';
			break;
			case 3:
				item.detail = 'Project measurement unit';
				item.documentation = 'The measurement unit for the project, it can be one of the following:\n\nnanoseconds\nmicroseconds\nmilliseconds';
			break;
			case 4:
				item.detail = 'Nanoseconds measurement unit';
				item.documentation = 'Nanoseconds measurement unit constant';
			break;
			case 5:
				item.detail = 'Microseconds measurement unit';
				item.documentation = 'Microseconds measurement unit constant';
			break;
			case 6:
				item.detail = 'Milliseconds measurement unit';
				item.documentation = 'Milliseconds measurement unit constant';
			break;
		}
		break;
		case 2:
		break;
		case 3:
		break;
	}
	return item;
});

documents.listen(connection);
connection.listen();*/

const connection = createConnection(ProposedFeatures.all);
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

connection.onInitialize((params: InitializeParams) =>
{
	const result: InitializeResult = { capabilities: { textDocumentSync: TextDocumentSyncKind.Incremental, completionProvider: { resolveProvider: true }}};
	if (params.capabilities.workspace && params.capabilities.workspace.workspaceFolders)
		result.capabilities.workspace = { workspaceFolders: {supported: true}};
	return result;
});

function validateBasicTree()
{
	connection.workspace.getWorkspaceFolders().then((v) =>
	{
		!v ? connection.window.showErrorMessage("The project is not a workspace folder") : validateProjectTree(connection, v);
	});
}

connection.onInitialized(()=>
{
	validateBasicTree();
	connection.onNotification("iris.validateTree", () =>
	{
		validateBasicTree();
	});
});

documents.listen(connection);
connection.listen();