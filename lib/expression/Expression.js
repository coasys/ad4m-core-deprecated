"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionProof = exports.isExpression = exports.ExpressionGeneric = void 0;
class ExpressionGeneric {
}
exports.ExpressionGeneric = ExpressionGeneric;
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
