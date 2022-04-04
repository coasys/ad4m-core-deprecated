import { Field, ObjectType, InputType } from "type-graphql";
import { ExpressionGeneric } from "../expression/Expression";
import { LinkExpression, LinkExpressionInput } from "../links/Links";

@ObjectType()
export class PerspectiveDiff {
    @Field(type => [LinkExpression])
    additions: LinkExpression[]
    
    @Field(type => [LinkExpression])
    removals: LinkExpression[]
}

@ObjectType()
export class PerspectiveDiffExpression extends ExpressionGeneric(PerspectiveDiff) {};
