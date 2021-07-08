import { Field, ObjectType, InputType } from "type-graphql";

// This type is used in the GraphQL interface to reference a mutable
// prespective that is implemented locally by the Ad4m runtime.
// The UUID is used in mutations to identify the perspective that gets mutated.
@ObjectType()
export class PerspectiveHandle {
    @Field()
    uuid: String
    @Field()
    name: String

    @Field(type => String, {nullable: true})
    sharedUrl: String|void

    constructor(uuid?: String, name?: String) {
        this.uuid = uuid
        this.name = name
    }
}
