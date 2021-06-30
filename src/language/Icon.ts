import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class Icon {
    @Field()
    code: string
}