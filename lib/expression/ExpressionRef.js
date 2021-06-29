"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseExprURL = exports.exprRef2String = void 0;
const LanguageRef_1 = __importDefault(require("../language/LanguageRef"));
const type_graphql_1 = require("type-graphql");
// Expression address + unique Language ID = global expression URL
let ExpressionRef = class ExpressionRef {
    constructor(lang, expr) {
        this.language = lang;
        this.expression = expr;
    }
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", LanguageRef_1.default)
], ExpressionRef.prototype, "language", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ExpressionRef.prototype, "expression", void 0);
ExpressionRef = __decorate([
    type_graphql_1.ObjectType(),
    __metadata("design:paramtypes", [LanguageRef_1.default, String])
], ExpressionRef);
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
