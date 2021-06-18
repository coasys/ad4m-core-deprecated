import { Field, ObjectType } from "type-graphql";
import { Agent } from "../agent/AgentGraphQL";

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

@ObjectType()
export class Expression {
    @Field()
    author: Agent;

    @Field()
    timestamp: string;

    @Field()
    data: object;

    @Field()
    proof: ExpressionProof;
}