import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class AgentStatus {
    @Field()
    isInitialized: Boolean

    @Field()
    isUnlocked: Boolean

    @Field()
    did: String

    @Field()
    didDocument: String
    
    @Field()
    error: String
}