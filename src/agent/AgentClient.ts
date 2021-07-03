import { ApolloClient, gql } from "@apollo/client";
import { Perspective } from "../perspectives/Perspective";
import { Agent } from "./Agent";
import { AgentStatus } from "./AgentStatus"

export default class AgentClient {
    #apolloClient: ApolloClient<any>
    
    constructor(client: ApolloClient<any>) {
        this.#apolloClient = client
    }

    async agent(): Promise<Agent> {
        const result = await this.#apolloClient.query({
            query: gql`
                query agent {
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
                }
            `
        })

        if(result.error) {
            throw result.error
        } else {
            let agent = new Agent(result.data.agent.did, result.data.agent.prespective)
            agent.directMessageLanguage = result.data.agent.directMessageLanguage
            return agent
        }
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