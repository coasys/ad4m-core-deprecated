"use strict";
exports.__esModule = true;
exports.parseExprURL = exports.exprRef2String = void 0;
var LanguageRef_1 = require("./LanguageRef");
// Expression address + unique Language ID = global expression URL
var ExpressionRef = /** @class */ (function () {
    function ExpressionRef(lang, expr) {
        this.language = lang;
        this.expression = expr;
    }
    return ExpressionRef;
}());
exports["default"] = ExpressionRef;
// Creates unique expression URI like this:
// expr:Qm3490gfwe489hf34:Qm90ghjoaw4iehioefwe4ort
function exprRef2String(ref) {
    if (ref.language.address === 'did')
        return ref.expression.toString();
    else
        return ref.language.address + "://" + ref.expression;
}
exports.exprRef2String = exprRef2String;
function parseExprURL(url) {
    var URIregexp = /^([^:^\s]+):\/\/([^\s]+)$/;
    var URImatches = URIregexp.exec(url);
    if (URImatches && URImatches.length == 3) {
        var language = URImatches[1];
        var expression = URImatches[2];
        var languageRef = new LanguageRef_1["default"]();
        languageRef.address = language;
        var ref = new ExpressionRef(languageRef, expression);
        return ref;
    }
    var DIDregexp = /^did:([^\s]+)$/;
    var DIDmatches = DIDregexp.exec(url);
    if (DIDmatches && DIDmatches.length == 2) {
        var languageRef = new LanguageRef_1["default"]();
        languageRef.address = 'did';
        var ref = new ExpressionRef(languageRef, url);
        return ref;
    }
    throw new Error("Couldn't parse string as expression URL or DID: " + url);
}
exports.parseExprURL = parseExprURL;
