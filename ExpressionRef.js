"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseExprURL = exports.exprRef2String = void 0;
const LanguageRef_1 = __importDefault(require("./LanguageRef"));
// Expression address + unique Language ID = global expression URL
class ExpressionRef {
    constructor(lang, expr) {
        this.language = lang;
        this.expression = expr;
    }
}
exports.default = ExpressionRef;
// Creates unique expression URI like this:
// expr:Qm3490gfwe489hf34:Qm90ghjoaw4iehioefwe4ort
function exprRef2String(ref) {
    if (ref.language.address === 'did')
        return ref.expression.toString();
    else
        return `${ref.language.address}://${ref.expression}`;
}
exports.exprRef2String = exprRef2String;
function parseExprURL(url) {
    const URIregexp = /^([^:^\s]+):\/\/([^\s]+)$/;
    const URImatches = URIregexp.exec(url);
    if (URImatches && URImatches.length == 3) {
        const language = URImatches[1];
        const expression = URImatches[2];
        const languageRef = new LanguageRef_1.default();
        languageRef.address = language;
        const ref = new ExpressionRef(languageRef, expression);
        return ref;
    }
    const DIDregexp = /^did:([^\s]+)$/;
    const DIDmatches = DIDregexp.exec(url);
    if (DIDmatches && DIDmatches.length == 2) {
        const languageRef = new LanguageRef_1.default();
        languageRef.address = 'did';
        const ref = new ExpressionRef(languageRef, url);
        return ref;
    }
    throw new Error("Couldn't parse string as expression URL or DID: " + url);
}
exports.parseExprURL = parseExprURL;
