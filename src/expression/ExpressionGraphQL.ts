import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ExpressionProof {
    @Field()
    signature: string;
    
    @Field()
    key: string;
    
    @Field({nullable: true})
    valid: boolean;
    
    @Field({nullable: true})
    invalid?: boolean;
}

//Note having any as return type here fixes compilation errors but I think we loose the ExpressionClass type in resulting .d.ts gql files
export function ExpressionGeneric<Type>(): any {
    @ObjectType({ isAbstract: true })
    abstract class ExpressionClass {
        @Field()
        author: string;
    
        @Field()
        timestamp: string;
    
        @Field()
        data: Type;
    
        @Field()
        proof: ExpressionProof;
    }
    return ExpressionClass;
}

@ObjectType()
export default class Expression extends ExpressionGeneric<object>() {};