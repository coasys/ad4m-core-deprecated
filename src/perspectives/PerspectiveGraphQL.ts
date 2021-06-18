import { Field, ObjectType } from "type-graphql";
import { Agent } from "../agent/AgentGraphQL";
import { LanguageRef } from "../language/LanguageRefGraphQL";
import { ExpressionGeneric } from "../expression/ExpressionGraphQL";

@ObjectType()
export class Perspective {
    @Field()
    name: string;
    
    @Field()
    uuid: string;
    
    @Field()
    author: Agent;
    
    @Field()
    timestamp: string;
    
    @Field()
    linksSharingLanguage: string;
}

@ObjectType()
export class MutablePerspective {
    @Field()
    linkLanguage: LanguageRef;
}

@ObjectType()
export class MutablePerspectiveExpression extends ExpressionGeneric<MutablePerspective>() {};