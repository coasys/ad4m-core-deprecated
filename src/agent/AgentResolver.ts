import { Arg, Mutation, Query, Resolver, Subscription } from "type-graphql";
import Perspective from "../perspectives/Perspective";
import Agent from "./Agent";
import AgentStatus from "./AgentStatus"

@Resolver()
export default class AgentResolver {
    @Query(returns => Agent)
    agent(): Agent {
        return new Agent("", new Perspective)
    }

    @Query(returns => AgentStatus)
    agentStatus(): AgentStatus {
        return new AgentStatus()
    }

    @Mutation(returns => AgentStatus)
    agentInitialize(
        @Arg('did') did: string,
        @Arg('didDocument') didDocument: string,
        @Arg('keystore') keystore: string,
        @Arg('passphrase') passphrase: string
    ): AgentStatus {
        return new AgentStatus()
    }

    @Mutation(returns => AgentStatus)
    agentLock(
        @Arg('passphrase') passphrase: string
    ): AgentStatus {
        return new AgentStatus()
    }

    @Mutation(returns => AgentStatus)
    agentUnlock(
        @Arg('passphrase') passphrase: string
    ): AgentStatus {
        return new AgentStatus()
    }


    @Query(returns => Agent, {nullable: true})
    agentByDID(@Arg('did') did: string): Agent {
        return new Agent("", new Perspective)
    }

    @Mutation(returns => Agent)
    agentUpdatePublicPerspective(@Arg('perspective') perspective: String): Agent {
        return new Agent("", new Perspective)
    }

    @Mutation(returns => Agent)
    agentUpdateInboxLanguage(@Arg('inboxLanguageAddress') inboxLanguageAddress: string): Agent {
        return new Agent("", new Perspective)
    }

    @Subscription({topics: ""})
    agentUpdated(): Agent {
        return new Agent("", new Perspective)
    }
}