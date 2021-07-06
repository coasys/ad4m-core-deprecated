import { Arg, Mutation, Query, Resolver, Subscription } from "type-graphql";
import { LanguageRef } from "../language/LanguageRef";
import { PerspectiveInput } from "../perspectives/Perspective";
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
    agentGenerate(
        @Arg('passphrase') passphrase: string
    ): AgentStatus {
        return new AgentStatus({did: TEST_AGENT_DID, didDocument: "did document", isInitialized: true, isUnlocked: true})
    }

    @Mutation(returns => AgentStatus)
    agentImport(
        @Arg('did') did: string,
        @Arg('didDocument') didDocument: string,
        @Arg('keystore') keystore: string,
        @Arg('passphrase') passphrase: string
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
    agentUpdatePublicPerspective(@Arg('perspective') perspective: PerspectiveInput): Agent {
        const agent = new Agent(TEST_AGENT_DID, perspective)
        return agent
    }

    @Mutation(returns => Agent)
    agentUpdateDirectMessageLanguage(@Arg('directMessageLanguage') directMessageLanguage: string): Agent {
        const agent = new Agent(TEST_AGENT_DID)
        agent.directMessageLanguage = directMessageLanguage;
        return agent
    }

    @Subscription({topics: "", nullable: true})
    agentUpdated(): Agent {
        return new Agent(TEST_AGENT_DID)
    }
}