import { Arg, Mutation, Resolver, Query } from "type-graphql";

/**
 * Resolver classes are used here to define the GraphQL schema 
 * (through the type-graphql annotations)
 * and are spawned in the client tests in Ad4mClient.test.ts.
 * For the latter, they return test fixtures.
 */
@Resolver()
export default class RuntimeResolver {
    @Mutation(returns => Boolean)
    runtimeQuit(): Boolean {
        return true
    }

    @Mutation(returns => Boolean)
    runtimeOpenLink(@Arg('url') url: string): Boolean {
        return true
    }

    @Mutation(returns => [String])
    addTrustedAgents(@Arg("agents", type => [String]) agents: string[]): string[] {
        return agents
    }

    @Mutation(returns => [String])
    deleteTrustedAgents(@Arg("agents", type => [String]) agents: string[]): string[] {
        return []
    }

    @Query(returns => [String])
    getTrustedAgents(): string[] {
        return ["agentPubKey"]
    }

    @Query(returns => [String])
    runtimeKnownLinkLanguageTemplates(): string[] {
        return ["Qm12345abcdef"]
    }

    @Mutation(returns => [String])
    runtimeAddKnownLinkLanguageTemplates(@Arg("addresses", type => [String]) addresses: string[]): string[] {
        return addresses
    }

    @Mutation(returns => [String])
    runtimeRemoveKnownLinkLanguageTemplates(@Arg("addresses", type => [String]) addresses: string[]): string[] {
        return []
    }

    @Query(returns => [String])
    runtimeFriends(): string[] {
        return ["did:test:friend"]
    }

    @Mutation(returns => [String])
    runtimeAddFriends(@Arg("dids", type => [String]) dids: string[]): string[] {
        return dids
    }

    @Mutation(returns => [String])
    runtimeRemoveFriends(@Arg("dids", type => [String]) dids: string[]): string[] {
        return []
    }
}