import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AgentStatus {
    @Field()
    isInitialized: Boolean

    @Field()
    isUnlocked: Boolean

    @Field({nullable: true})
    did: String

    @Field({nullable: true})
    didDocument: String
    
    @Field({nullable: true})
    error: String

    constructor(isInitialized: Boolean, isUnlocked: Boolean) {
        this.isInitialized = isInitialized
        this.isUnlocked = isUnlocked
    }
}