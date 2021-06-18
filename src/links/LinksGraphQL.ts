import { Field, ObjectType } from "type-graphql";
import { Agent } from "../agent/AgentGraphQL";

@ObjectType()
export class Link {
    @Field()
    code: string;
}

@ObjectType()
export class LinkQuery {
    @Field()
    code: string;
}


@ObjectType()
export class AddLinkInput {
    @Field()
    perspectiveUUID: string;
    
    @Field()
    link: string;
}

@ObjectType()
export class UpdateLinkInput {
    @Field()
    perspectiveUUID: string;
    
    @Field()
    oldLink: string;
    
    @Field()
    newLink: string;
}

@ObjectType()
export class RemoveLinkInput {
    @Field()
    perspectiveUUID: string;
    
    @Field()
    link: string;
}

@ObjectType()
export class LinkExpression {
    @Field()
    author: Agent;
    
    @Field()
    timestamp: string;
    
    @Field()
    data: Link;
}