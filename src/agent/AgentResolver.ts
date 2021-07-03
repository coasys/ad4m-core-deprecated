import { Arg, Mutation, Query, Resolver, Subscription } from "type-graphql";
import { Perspective } from "../perspectives/Perspective";
import { Agent } from "./Agent";
import { AgentStatus } from "./AgentStatus"

const TEST_AGENT_DID = "did:ad4m:test"

@Resolver()
export default class AgentResolver {
    @Query(returns => Agent)
    agent(): Agent {
        return new Agent(TEST_AGENT_DID)
    }

    @Query(returns => AgentStatus)
    agentStatus(): AgentStatus {
        return new AgentStatus(false, false)
    }

    @Mutation(returns => AgentStatus)
    agentInitialize(
        @Arg('did', {nullable: true}) did: string,
        @Arg('didDocument', {nullable: true}) didDocument: string,
        @Arg('keystore', {nullable: true}) keystore: string,
        @Arg('passphrase', {nullable: true}) passphrase: string
    ): AgentStatus {
        return new AgentStatus(false, false)
    }

    @Mutation(returns => AgentStatus)
    agentLock(
        @Arg('passphrase') passphrase: string
    ): AgentStatus {
        return new AgentStatus(false, false)
    }

    @Mutation(returns => AgentStatus)
    agentUnlock(
        @Arg('passphrase') passphrase: string
    ): AgentStatus {
        return new AgentStatus(true, true)
    }


    @Query(returns => Agent, {nullable: true})
    agentByDID(@Arg('did') did: string): Agent {
        return new Agent(did)
    }

    @Mutation(returns => Agent)
    agentUpdatePublicPerspective(@Arg('perspective') perspective: String): Agent {
        return new Agent(TEST_AGENT_DID)
    }

    @Mutation(returns => Agent)
    agentUpdateInboxLanguage(@Arg('inboxLanguageAddress') inboxLanguageAddress: string): Agent {
        return new Agent(TEST_AGENT_DID)
    }

    @Subscription({topics: ""})
    agentUpdated(): Agent {
        return new Agent(TEST_AGENT_DID)
    }
}