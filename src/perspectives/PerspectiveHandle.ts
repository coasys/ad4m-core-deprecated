import { Field, ObjectType } from "type-graphql";

// This type is used in the GraphQL interface to reference a mutable
// prespective that is implemented locally by the Ad4m runtime.
// The UUID is used in mutations to identify the perspective that gets mutated.
@ObjectType()
export class PerspectiveHandle {
    @Field()
    uuid: string
    @Field()
    name: string

    @Field(type => String, {nullable: true})
    sharedUrl?: string

    constructor(uuid?: string, name?: string) {
        this.uuid = uuid
        this.name = name
    }
}
