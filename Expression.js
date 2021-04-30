"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionProof = exports.isExpression = void 0;
const Agent_1 = __importDefault(require("./Agent"));
class Expression {
    constructor() {
        this.author = new Agent_1.default("anonymous");
        this.timestamp = "never";
        this.data = {};
    }
}
exports.default = Expression;
function isExpression(e) {
    return e && e.author && e.timestamp && e.data;
}
exports.isExpression = isExpression;
class ExpressionProof {
    constructor(sig, k) {
        this.key = k;
        this.signature = sig;
    }
}
exports.ExpressionProof = ExpressionProof;
