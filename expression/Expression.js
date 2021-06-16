"use strict";
exports.__esModule = true;
exports.ExpressionProof = exports.isExpression = void 0;
var Agent_1 = require("./Agent");
var Expression = /** @class */ (function () {
    function Expression() {
        this.author = new Agent_1["default"]("anonymous");
        this.timestamp = "never";
        this.data = {};
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
