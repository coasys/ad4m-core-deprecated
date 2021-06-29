import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ExpressionProof {
    @Field()
    signature: string;
    
    @Field()
    key: string;
    
    @Field({nullable: true})
    valid?: boolean;
    
    @Field({nullable: true})
    invalid?: boolean;

    constructor(sig: string, k: string) {
        this.key = k
        this.signature = sig
    }
}

//Note having any as return type here fixes compilation errors but I think we loose the ExpressionClass type in resulting .d.ts gql files
export function ExpressionGeneric<Type>(): any {
    @ObjectType({ isAbstract: true })
    abstract class ExpressionClass {
        @Field()
        author: string;
    
        @Field()
        timestamp: string;
    
        @Field(type => Object)
        data: Type;
    
        @Field()
        proof: ExpressionProof;
    }
    return ExpressionClass;
}

@ObjectType()
export class Expression extends ExpressionGeneric<object>() {};

export function isExpression(e: any): boolean {
    return e && e.author && e.timestamp && e.data
}
