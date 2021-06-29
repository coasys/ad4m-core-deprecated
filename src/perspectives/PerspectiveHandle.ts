import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export default class PerspectiveHandle {
    @Field()
    uuid: String
    @Field()
    name: String

    @Field(type => String, {nullable: true})
    sharedURL: String|void
}