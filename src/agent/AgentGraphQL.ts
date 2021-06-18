import { Field, ObjectType } from "type-graphql";
import Perspective from "../perspectives/Perspective";

@ObjectType()
export class Agent {
    @Field()
    did: string;

    @Field()
    perspective: Perspective
}