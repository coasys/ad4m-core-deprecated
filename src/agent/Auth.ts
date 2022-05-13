import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AuthStatus {
    @Field()
    isPermitted: boolean

    @Field({nullable: true})
    rand?: number

    constructor(isPermitted: boolean, rand?: number) {
        this.isPermitted = isPermitted
        this.rand = rand
    }
}
