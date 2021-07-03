import { Arg, Mutation, Query, Resolver, Subscription } from "type-graphql";
import { LanguageRef } from "../language/LanguageRef";
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
        return new AgentStatus({did: TEST_AGENT_DID})
    }

    @Mutation(returns => AgentStatus)
    agentInitialize(
        @Arg('did', {nullable: true}) did: string,
        @Arg('didDocument', {nullable: true}) didDocument: string,
        @Arg('keystore', {nullable: true}) keystore: string,
        @Arg('passphrase', {nullable: true}) passphrase: string
    ): AgentStatus {
        return new AgentStatus({did, didDocument, isInitialized: true, isUnlocked: true})
    }

    @Mutation(returns => AgentStatus)
    agentLock(
        @Arg('passphrase') passphrase: string
    ): AgentStatus {
        return new AgentStatus({isInitialized: true, did: TEST_AGENT_DID})
    }

    @Mutation(returns => AgentStatus)
    agentUnlock(
        @Arg('passphrase') passphrase: string
    ): AgentStatus {
        return new AgentStatus({isInitialized: true, isUnlocked: true, did: TEST_AGENT_DID})
    }


    @Query(returns => Agent, {nullable: true})
    agentByDID(@Arg('did') did: string): Agent {
        return new Agent(did)
    }

    @Mutation(returns => Agent)
    agentUpdatePublicPerspective(@Arg('perspective') perspective: string): Agent {
        const perspectiveObject = JSON.parse(perspective) as Perspective
        const agent = new Agent(TEST_AGENT_DID, perspectiveObject)
        return agent
    }

    @Mutation(returns => Agent)
    agentUpdateInboxLanguage(@Arg('inboxLanguageAddress') inboxLanguageAddress: string): Agent {
        const agent =  new Agent(TEST_AGENT_DID)
        agent.directMessageLanguage = { address: inboxLanguageAddress, name: '' } as LanguageRef
        return agent
    }

    @Subscription({topics: ""})
    agentUpdated(): Agent {
        return new Agent(TEST_AGENT_DID)
    }
}