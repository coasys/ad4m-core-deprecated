import { Field, ObjectType, InputType } from "type-graphql";
import { ExpressionGeneric } from "../expression/Expression";
import ExpressionRef from "../expression/ExpressionRef";
import { LinkExpression } from "../links/Links";

// A Perspective represents subjective meaning, encoded through
// associations between expressions, a.k.a. Links, that is a graph
// over the objective Expressions of any subset of Languages.
@ObjectType()
@InputType()
export default class Perspective {
    @Field(type => [LinkExpression])
    links: LinkExpression[]
}

@ObjectType()
export class PerspectiveExpression extends ExpressionGeneric(Perspective) {};

@ObjectType()
export class PerspectiveDiff {
    @Field(type => [LinkExpression])
    additions: LinkExpression[]
    
    @Field(type => [LinkExpression])
    removals: LinkExpression[]
}

@ObjectType()
export class PerspectiveDiffExpression extends ExpressionGeneric(PerspectiveDiff) {};

@ObjectType()
export class MutatedPerspective {
    @Field()
    base: ExpressionRef

    @Field()
    diff: PerspectiveDiff
}

@ObjectType()
export class MutatedPerspectiveExpression extends ExpressionGeneric(MutatedPerspective) {};