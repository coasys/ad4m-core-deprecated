import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export class PerspectiveHandle {
    @Field()
    uuid: String
    @Field()
    name: String

    @Field(type => String, {nullable: true})
    sharedURL: String|void
}