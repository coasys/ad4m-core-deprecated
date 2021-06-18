import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Agent {
    @Field()
    did: string;

    @Field({nullable: true})
    name: string;

    @Field({nullable: true})
    email: string;
}