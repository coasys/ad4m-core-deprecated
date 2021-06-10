"use strict";
exports.__esModule = true;
exports.ExpressionProof = exports.isExpression = void 0;
var Expression = /** @class */ (function () {
    function Expression() {
    }
    return Expression;
}());
exports["default"] = Expression;
function isExpression(e) {
    return e && e.author && e.timestamp && e.data;
}
exports.isExpression = isExpression;
var ExpressionProof = /** @class */ (function () {
    function ExpressionProof(sig, k) {
        this.key = k;
        this.signature = sig;
    }
    return ExpressionProof;
}());
exports.ExpressionProof = ExpressionProof;
