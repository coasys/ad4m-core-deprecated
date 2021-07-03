import { ApolloClient, ApolloQueryResult, gql } from "@apollo/client";
import { Perspective } from "../perspectives/Perspective";
import { Agent } from "./Agent";
import { AgentStatus } from "./AgentStatus"

const AGENT_WITH_ALL_SUBITEMS = `
agent {
    did
    directMessageLanguage { address }
    perspective { 
        links {
            author, timestamp, 
            proof {
                signature, key, valid, invalid
            }
            data {
                source, predicate, target
            }
        }
    }
}
`

export default class AgentClient {
    #apolloClient: ApolloClient<any>
    
    constructor(client: ApolloClient<any>) {
        this.#apolloClient = client
    }

    data(result: ApolloQueryResult<any>) {
        if(result.error) {
            throw result.error
        } else {
            return result.data
        }
    }

    async agent(): Promise<Agent> {
        const { agent } = this.data(await this.#apolloClient.query({ 
            query: gql`query agent {${AGENT_WITH_ALL_SUBITEMS}}` 
        }))

        let agentObject = new Agent(agent.did, agent.prespective)
        agentObject.directMessageLanguage = agent.directMessageLanguage
        return agentObject
    }

    agentStatus(): AgentStatus {
        return new AgentStatus(false, false)
    }

    agentInitialize(
        did: string,
        didDocument: string,
        keystore: string,
        passphrase: string
    ): AgentStatus {
        return new AgentStatus(true, true)
    }

    agentLock(passphrase: string): AgentStatus {
        return new AgentStatus(true, false)
    }

    agentUnlock(
        passphrase: string
    ): AgentStatus {
        return new AgentStatus(true, true)
    }


    agentByDID(did: string): Agent {
        return new Agent("", new Perspective)
    }

    agentUpdatePublicPerspective(perspective: String): Agent {
        return new Agent("", new Perspective)
    }

    agentUpdateInboxLanguage(inboxLanguageAddress: string): Agent {
        return new Agent("", new Perspective)
    }

    agentUpdated(): Agent {
        return new Agent("", new Perspective)
    }
}