import { Field, ObjectType, InputType } from "type-graphql";
import { ExpressionGeneric } from "../expression/Expression";
import ExpressionRef from "../expression/ExpressionRef";
import { LinkExpression, LinkExpressionInput } from "../links/Links";

// A Perspective represents subjective meaning, encoded through
// associations between expressions, a.k.a. Links, that is a graph
// over the objective Expressions of any subset of Languages.
@ObjectType()
export default class Perspective {
    @Field(type => [LinkExpression])
    links: LinkExpression[]
}

@InputType()
export class PerspectiveInput {
    @Field(type => [LinkExpressionInput])
    links: LinkExpressionInput[]
}

@ObjectType()
export class PerspectiveExpression extends ExpressionGeneric(Perspective) {};
