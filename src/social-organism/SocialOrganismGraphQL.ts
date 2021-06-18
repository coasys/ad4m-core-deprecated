import { Field, ObjectType } from "type-graphql";
import { NeighbourhoodExpression } from "../neighbourhood/NeighbourhoodGraphQL";
import { Perspective } from "../perspectives/PerspectiveGraphQL";

@ObjectType()
export default class SocialOrganism {
    @Field()
    inner: NeighbourhoodExpression

    @Field()
    outer: Perspective
}