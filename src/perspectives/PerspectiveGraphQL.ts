import { Field, ObjectType } from "type-graphql";
import { Agent } from "../agent/AgentGraphQL";

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