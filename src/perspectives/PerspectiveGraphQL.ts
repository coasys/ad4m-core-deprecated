import { Field, ObjectType } from "type-graphql";
import Agent from "../agent/Agent";
import { LanguageRef } from "../language/LanguageRefGraphQL";
import { ExpressionGeneric } from "../expression/ExpressionGraphQL";
import { LinkExpression } from "../links/LinksGraphQL";

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

@ObjectType()
export class PerspectiveDiff {
    @Field()
    additions: LinkExpression[]
    
    @Field()
    removals: LinkExpression[]
}

@ObjectType()
export class PerspectiveDiffExpression extends ExpressionGeneric<PerspectiveDiff>() {};

@ObjectType()
export class MutatedPerspective {
    @Field()
    base: string
    
    @Field()
    diff: PerspectiveDiff
}

export class MutatedPerspectiveExpression extends ExpressionGeneric<MutatedPerspective>() {};
