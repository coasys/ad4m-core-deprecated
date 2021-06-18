import { Field, ObjectType } from "type-graphql";
import { ExpressionGeneric } from "../expression/ExpressionGraphQL";
import { MutablePerspective } from "../perspectives/PerspectiveGraphQL";

@ObjectType()
export default class Neighbourhood {
    @Field()
    content: MutablePerspective
    
    @Field()
    meta: MutablePerspective
    
    @Field()
    fixtures: object
}

@ObjectType()
export class NeighbourhoodExpression extends ExpressionGeneric<Neighbourhood>() {};