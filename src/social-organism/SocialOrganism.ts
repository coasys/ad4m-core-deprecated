import { Field, ObjectType } from "type-graphql";
import { NeighbourhoodExpression } from "../neighbourhood/Neighbourhood";
import Perspective from "../perspectives/Perspective";

@ObjectType()
export default class SocialOrganism {
    @Field()
    inner: NeighbourhoodExpression
    
    @Field()
    outer: Perspective
}
