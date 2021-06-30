import { ClassType, Field, ObjectType } from "type-graphql";

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
export function ExpressionGeneric<DataType>(DataTypeClass: ClassType<DataType>): any {
    @ObjectType()
    abstract class ExpressionClass {
        @Field()
        author: string;
    
        @Field()
        timestamp: string;
    
        @Field(type => DataTypeClass)
        data: DataType;
    
        @Field()
        proof: ExpressionProof;
    }
    return ExpressionClass;
}

@ObjectType()
export class Expression extends ExpressionGeneric(Object) {};

@ObjectType()
export class ExpressionStringified extends ExpressionGeneric(String) {};

export function isExpression(e: any): boolean {
    return e && e.author && e.timestamp && e.data
}
