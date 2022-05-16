import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AuthStatus {
    @Field()
    isPermitted: boolean

    @Field({nullable: true})
    rand?: string

    constructor(isPermitted: boolean, rand?: string) {
        this.isPermitted = isPermitted
        this.rand = rand
    }
}
