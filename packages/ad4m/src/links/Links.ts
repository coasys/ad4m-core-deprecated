import { Field, InputType, ObjectType } from "type-graphql";
import { ExpressionGeneric, ExpressionGenericInput } from '../expression/Expression';

@ObjectType()
export class Link {
    @Field()
    source: string;
    
    @Field()
    target: string;
    
    @Field({nullable: true})
    predicate?: string;

    constructor(obj) {
        this.source = obj.source ? obj.source : ''
        this.target = obj.target ? obj.target : ''
        this.predicate = obj.predicate ? obj.predicate : ''
    }
}

@InputType()
export class LinkInput {
    @Field()
    source: string;
    
    @Field()
    target: string;
    
    @Field({nullable: true})
    predicate?: string;
}

@ObjectType()
export class LinkExpression extends ExpressionGeneric(Link) {};

@InputType()
export class LinkExpressionInput extends ExpressionGenericInput(LinkInput) {};

export function linkEqual(l1: LinkExpression, l2: LinkExpression): boolean {
    return l1.author == l2.author &&
        l1.timestamp == l2.timestamp &&
        l1.data.source == l2.data.source &&
        l1.data.predicate == l2.data.predicate &&
        l1.data.target == l2.data.target
}

export function isLink(l: any): boolean {
    return l && l.source && l.target
}

export function hashLinkExpression(link: LinkExpression): number {
    const mash = JSON.stringify(link.data, Object.keys(link.data).sort()) +
                JSON.stringify(link.author) + link.timestamp
    let hash = 0, i, chr;
    for (i = 0; i < mash.length; i++) {
        chr   = mash.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}