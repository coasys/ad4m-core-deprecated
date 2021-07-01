import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Icon {
    @Field()
    code: string
}