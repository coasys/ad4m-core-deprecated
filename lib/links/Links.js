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
exports.hashLinkExpression = exports.isLink = exports.linkEqual = exports.LinkQuery = exports.LinkExpression = void 0;
const type_graphql_1 = require("type-graphql");
const Expression_1 = require("../expression/Expression");
let Link = class Link {
    constructor(obj) {
        this.source = obj.source ? obj.source : '';
        this.target = obj.target ? obj.target : '';
        this.predicate = obj.predicate ? obj.predicate : '';
    }
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Link.prototype, "source", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Link.prototype, "target", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Link.prototype, "predicate", void 0);
Link = __decorate([
    type_graphql_1.ObjectType(),
    __metadata("design:paramtypes", [Object])
], Link);
exports.default = Link;
let LinkExpression = class LinkExpression extends Expression_1.ExpressionGeneric(Link) {
};
LinkExpression = __decorate([
    type_graphql_1.ObjectType()
], LinkExpression);
exports.LinkExpression = LinkExpression;
;
let LinkQuery = class LinkQuery {
    constructor(obj) {
        if (obj) {
            // @ts-ignore
            this.source = obj.source;
            // @ts-ignore
            this.predicate = obj.predicate;
            // @ts-ignore
            this.target = obj.target;
            // @ts-ignore
            if (obj.fromDate) {
                // @ts-ignore
                this.fromDate = obj.fromDate;
            }
            ;
            // @ts-ignore
            if (obj.untilDate) {
                // @ts-ignore
                this.untilDate = obj.untilDate;
            }
        }
    }
    isMatch(l) {
        if (this.source)
            if (this.source !== l.source)
                return false;
        if (this.predicate)
            if (this.predicate !== l.predicate)
                return false;
        if (this.target)
            if (this.target !== l.target)
                return false;
        return true;
    }
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], LinkQuery.prototype, "source", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], LinkQuery.prototype, "target", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], LinkQuery.prototype, "predicate", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], LinkQuery.prototype, "fromDate", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], LinkQuery.prototype, "untilDate", void 0);
LinkQuery = __decorate([
    type_graphql_1.ObjectType(),
    __metadata("design:paramtypes", [Object])
], LinkQuery);
exports.LinkQuery = LinkQuery;
function linkEqual(l1, l2) {
    return l1.author == l2.author &&
        l1.timestamp == l2.timestamp &&
        // @ts-ignore
        l1.data.source == l2.data.source &&
        // @ts-ignore
        l1.data.predicate == l2.data.predicate &&
        // @ts-ignore
        l1.data.target == l2.data.target;
}
exports.linkEqual = linkEqual;
function isLink(l) {
    return l && l.source && l.target;
}
exports.isLink = isLink;
function hashLinkExpression(link) {
    const mash = JSON.stringify(link.data, Object.keys(link.data).sort()) +
        JSON.stringify(link.author) + link.timestamp;
    let hash = 0, i, chr;
    for (i = 0; i < mash.length; i++) {
        chr = mash.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
exports.hashLinkExpression = hashLinkExpression;
