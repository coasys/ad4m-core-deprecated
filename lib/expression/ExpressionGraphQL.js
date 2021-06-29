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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionGeneric = exports.ExpressionProof = void 0;
const type_graphql_1 = require("type-graphql");
let ExpressionProof = class ExpressionProof {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ExpressionProof.prototype, "signature", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ExpressionProof.prototype, "key", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Boolean)
], ExpressionProof.prototype, "valid", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Boolean)
], ExpressionProof.prototype, "invalid", void 0);
ExpressionProof = __decorate([
    type_graphql_1.ObjectType()
], ExpressionProof);
exports.ExpressionProof = ExpressionProof;
//Note having any as return type here fixes compilation errors but I think we loose the ExpressionClass type in resulting .d.ts gql files
function ExpressionGeneric() {
    let ExpressionClass = class ExpressionClass {
    };
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], ExpressionClass.prototype, "author", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], ExpressionClass.prototype, "timestamp", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Object)
    ], ExpressionClass.prototype, "data", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", ExpressionProof)
    ], ExpressionClass.prototype, "proof", void 0);
    ExpressionClass = __decorate([
        type_graphql_1.ObjectType({ isAbstract: true })
    ], ExpressionClass);
    return ExpressionClass;
}
exports.ExpressionGeneric = ExpressionGeneric;
let Expression = class Expression extends ExpressionGeneric() {
};
Expression = __decorate([
    type_graphql_1.ObjectType()
], Expression);
exports.default = Expression;
;
