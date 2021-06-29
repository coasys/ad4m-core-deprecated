import { Field, ObjectType } from "type-graphql";
import { ExpressionGeneric } from "../expression/Expression";
import MutablePerspective from "../perspectives/MutablePerspective";

@ObjectType()
export default class Neighbourhood extends MutablePerspective {
    @Field()
    content: MutablePerspective
    
    @Field()
    meta: MutablePerspective
    
    @Field()
    fixtures: object
}

@ObjectType()
export class NeighbourhoodExpression extends ExpressionGeneric<Neighbourhood>() {};