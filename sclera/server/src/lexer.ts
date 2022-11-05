import { Diagnostic, DiagnosticRelatedInformation, DiagnosticSeverity, Position } from "vscode-languageserver/node";

/*function throwError(hasDiagnosticRelatedInformationCapability:boolean, start: Position, end: Position, msg: string, additionalInfo?: DiagnosticRelatedInformation[]): Diagnostic[]
{
    let diagnostic: Diagnostic = {severity: DiagnosticSeverity.Error, range: {start: start, end: end}, message: msg, source: 'Iris.execute'};
	if (hasDiagnosticRelatedInformationCapability && additionalInfo)
		diagnostic.relatedInformation = additionalInfo;//[{location: {uri: textDocument.uri, range: Object.assign({}, diagnostic.range)}, message: 'Spelling matters'}, {location: {uri: textDocument.uri, range: Object.assign({}, diagnostic.range)}, message: 'Particularly for names'}];
    let diagnostics: Diagnostic[] = [];
    diagnostics.push(diagnostic);
    return diagnostics;
}

enum token
{
    identifier,
    assignment,
    end_sentence,
    compiler_version,
    indentation,
    measurement,
    nanoseconds,
    microseconds,
    milliseconds,
    numerical,
    dot
}

interface key
{
    word: string;
    ln: number;
    ch: number;
    tk: token;
}

function is_numerical(s:string): boolean
{
    for(let x = 0; x < s.length; ++x)
    {
        const c = s.charAt(x);
        if(c < '0' || c > '9')
            return false;
    }
    return true;
}

function tokenize(box:{fc:boolean}, btk:{k: key}, btks:{keys:key[]}): void
{
    box.fc = false;
    btk.k.tk = is_numerical(btk.k.word) ? token.numerical : btk.k.word == "compiler_version" ? token.compiler_version : btk.k.word == "indentation" ? token.indentation : btk.k.word == "measurement" ? token.measurement : btk.k.word == "milliseconds" ? token.milliseconds : btk.k.word == "microseconds" ? token.microseconds : btk.k.word == "nanoseconds" ? token.nanoseconds : token.identifier;
    btks.keys.push(btk.k);
}

function tokenize2(ln:number, ch:number, t:token, w:string, btk:{k:key}, btks:{keys:key[]}):void
{
    btk.k.ln = ln;
    btk.k.ch = ch;
    btk.k.tk = t;
    btk.k.word = w;
    btks.keys.push(btk.k);
}

function pos(ln:number, ch:number):Position
{
    return {line: ln, character: ch};
}

//alpha: case '_':case 'A':case 'B':case 'C':case 'D':case 'E':case 'F':case 'G':case 'H':case 'I':case 'J':case 'K':case 'L':case 'M':case 'N':case 'O':case 'P':case 'Q':case 'R':case 'S':case 'T':case 'U':case 'V':case 'W':case 'X':case 'Y':case 'Z':case 'a':case 'b':case 'c':case 'd':case 'e':case 'f':case 'g':case 'h':case 'i':case 'j':case 'k':case 'l':case 'm':case 'n':case 'o':case 'p':case 'q':case 'r':case 's':case 't':case 'u':case 'v':case 'w':case 'x':case 'y':case 'z':
//numeric: case '0':case '1':case '2':case '3':case '4':case '5':case '6':case '7':case '8':case '9':
//alphanumeric: case '_':case 'A':case 'B':case 'C':case 'D':case 'E':case 'F':case 'G':case 'H':case 'I':case 'J':case 'K':case 'L':case 'M':case 'N':case 'O':case 'P':case 'Q':case 'R':case 'S':case 'T':case 'U':case 'V':case 'W':case 'X':case 'Y':case 'Z':case 'a':case 'b':case 'c':case 'd':case 'e':case 'f':case 'g':case 'h':case 'i':case 'j':case 'k':case 'l':case 'm':case 'n':case 'o':case 'p':case 'q':case 'r':case 's':case 't':case 'u':case 'v':case 'w':case 'x':case 'y':case 'z':case '0':case '1':case '2':case '3':case '4':case '5':case '6':case '7':case '8':case '9':
export function lex(b: boolean, content: string)
{
    let keys = new Array<key>();
    {
        let k: key = {word: "", ln: 0, ch: 0, tk: token.identifier};
        let ln = 0;
        let ch = -1;
        let mode = 0;
        let fc = false;
        for(let x = 0; x < content.length; ++x)
        {
            const c = content.charAt(x);
            c == "\n" ? (++ln, ch = -1) : ++ch;
            switch(mode)
            {
                case 0:
                    switch(c)
                    {
                        //alphanumeric
                        case '_':case 'A':case 'B':case 'C':case 'D':case 'E':case 'F':case 'G':case 'H':case 'I':case 'J':case 'K':case 'L':case 'M':case 'N':case 'O':case 'P':case 'Q':case 'R':case 'S':case 'T':case 'U':case 'V':case 'W':case 'X':case 'Y':case 'Z':case 'a':case 'b':case 'c':case 'd':case 'e':case 'f':case 'g':case 'h':case 'i':case 'j':case 'k':case 'l':case 'm':case 'n':case 'o':case 'p':case 'q':case 'r':case 's':case 't':case 'u':case 'v':case 'w':case 'x':case 'y':case 'z':case '0':case '1':case '2':case '3':case '4':case '5':case '6':case '7':case '8':case '9':
                            if(!fc)
                            {
                                fc = true;
                                k.ln = ln;
                                k.ch = ch;
                                k.word = c;
                            }
                            else
                                k.word += c;
                        break;
                        case '`':
                            //mode = 1;
                            if(fc)
                                tokenize({fc}, {k}, {keys});
                        break;
                        case ' ':case '\n':
                            if(fc)
                                tokenize({fc}, {k}, {keys});
                        break;
                        case '=':
                            if(fc)
                                tokenize({fc}, {k}, {keys});
                            tokenize2(ln, ch, token.assignment, "=", {k}, {keys});
                        break;
                        case '.':
                            if(fc)
                                tokenize({fc}, {k}, {keys});
                            tokenize2(ln, ch, token.dot, ".", {k}, {keys});
                        break;
                        case ';':
                            if(fc)
                                tokenize({fc}, {k}, {keys});
                            tokenize2(ln, ch, token.end_sentence, ";", {k}, {keys});
                        break;
                        default:
                            return throwError(b, pos(15, 9), pos(15, 9), "Almost there...");
                    }
                break;
            }
        }
    }
}*/

