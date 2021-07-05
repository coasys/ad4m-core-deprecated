import { ApolloClient, gql } from "@apollo/client";
import { Perspective } from "../perspectives/Perspective";
import unwrapApolloResult from "../unwrapApolloResult";
import { Agent } from "./Agent";
import { AgentStatus } from "./AgentStatus"

const AGENT_SUBITEMS = `
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
`

const AGENT_STATUS_FIELDS =`
    isInitialized
    isUnlocked
    did
    didDocument
`
export interface InitializeArgs {
    did: string,
    didDocument: string,
    keystore: string,
    passphrase: string
}

export type AgentUpdatedCallback = (agent: Agent) => void
export default class AgentClient {
    #apolloClient: ApolloClient<any>
    #updatedCallbacks: AgentUpdatedCallback[]
    
    constructor(client: ApolloClient<any>) {
        this.#apolloClient = client
        this.#updatedCallbacks = []

        this.#apolloClient.subscribe({
            query: gql` subscription {
                agentUpdated { ${AGENT_SUBITEMS} }
            }   
        `}).subscribe({
            next: result => {
                console.log("SUBSCRIPTION:", result)
                const agent = result.data.agentUpdated
                this.#updatedCallbacks.forEach(cb => {
                    cb(agent)
                })
            },
            error: (e) => console.error(e)
        })
    }


    async me(): Promise<Agent> {
        const { agent } = unwrapApolloResult(await this.#apolloClient.query({ 
            query: gql`query agent { agent { ${AGENT_SUBITEMS} } }` 
        }))

        let agentObject = new Agent(agent.did, agent.prespective)
        agentObject.directMessageLanguage = agent.directMessageLanguage
        return agentObject
    }

    async status(): Promise<AgentStatus> {
        const { agentStatus } = unwrapApolloResult(await this.#apolloClient.query({ 
            query: gql`query agentStatus {
                agentStatus {
                    ${AGENT_STATUS_FIELDS}
                }
            }` 
        }))
        return new AgentStatus(agentStatus)
    }

    async initialize(args: InitializeArgs): Promise<AgentStatus> {
        const { did, didDocument, keystore, passphrase } = args
        const { agentInitialize } = unwrapApolloResult(await this.#apolloClient.mutate({ 
            mutation: gql`mutation agentInitialize(
                $did: String!,
                $didDocument: String!,
                $keystore: String!,
                $passphrase: String!
            ) {
                agentInitialize(did: $did, didDocument: $didDocument, keystore: $keystore, passphrase: $passphrase) {
                    ${AGENT_STATUS_FIELDS}
                }
            }`,
            variables: { did, didDocument, keystore, passphrase} 
        }))
        return new AgentStatus(agentInitialize)
    }

    async lock(passphrase: string): Promise<AgentStatus> {
        const { agentLock } = unwrapApolloResult(await this.#apolloClient.mutate({ 
            mutation: gql`mutation agentLock($passphrase: String!) {
                agentLock(passphrase: $passphrase) {
                    ${AGENT_STATUS_FIELDS}
                }
            }`,
            variables: { passphrase }
        }))
        return new AgentStatus(agentLock)
    }

    async unlock(passphrase: string): Promise<AgentStatus> {
        const { agentUnlock } = unwrapApolloResult(await this.#apolloClient.mutate({ 
            mutation: gql`mutation agentUnlock($passphrase: String!) {
                agentUnlock(passphrase: $passphrase) {
                    ${AGENT_STATUS_FIELDS}
                }
            }`,
            variables: { passphrase }
        }))
        return new AgentStatus(agentUnlock)
    }


    async byDID(did: string): Promise<Agent> {
        const { agentByDID } = unwrapApolloResult(await this.#apolloClient.query({ 
            query: gql`query agentByDID($did: String!) {
                agentByDID(did: $did) {
                    ${AGENT_SUBITEMS}
                }
            }`,
            variables: { did } 
        }))
        return agentByDID as Agent
    }

    async updatePublicPerspective(perspective: Perspective): Promise<Agent> {
        const { agentUpdatePublicPerspective } = unwrapApolloResult(await this.#apolloClient.mutate({ 
            mutation: gql`mutation agentUpdatePublicPerspective($perspective: String!) {
                agentUpdatePublicPerspective(perspective: $perspective) {
                    ${AGENT_SUBITEMS}
                }
            }`,
            variables: { perspective: JSON.stringify(perspective) }
        }))
        const a = agentUpdatePublicPerspective
        const agent = new Agent(a.did, a.perspective)
        agent.directMessageLanguage = a.directMessageLanguage
        return agent
    }

    async updateInboxLanguage(inboxLanguageAddress: string): Promise<Agent> {
        const { agentUpdateInboxLanguage } = unwrapApolloResult(await this.#apolloClient.mutate({ 
            mutation: gql`mutation agentUpdateInboxLanguage($inboxLanguageAddress: String!) {
                agentUpdateInboxLanguage(inboxLanguageAddress: $inboxLanguageAddress) {
                    ${AGENT_SUBITEMS}
                }
            }`,
            variables: { inboxLanguageAddress }
        }))
        const a = agentUpdateInboxLanguage
        const agent = new Agent(a.did, a.perspective)
        agent.directMessageLanguage = a.directMessageLanguage
        return agent
    }

    addUpdatedListener(listener) {
        this.#updatedCallbacks.push(listener)
    }
}