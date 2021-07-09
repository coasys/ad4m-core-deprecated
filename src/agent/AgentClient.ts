import { ApolloClient, gql } from "@apollo/client";
import { PerspectiveInput } from "../perspectives/Perspective";
import unwrapApolloResult from "../unwrapApolloResult";
import { Agent } from "./Agent";
import { AgentStatus } from "./AgentStatus"

const AGENT_SUBITEMS = `
    did
    directMessageLanguage
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

export type AgentUpdatedCallback = (agent: Agent) => null
/**
 * Provides access to all functions regarding the local agent,
 * such as generating, locking, unlocking, importing the DID keystore,
 * as well as updating the publicly shared Agent expression.
 */
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
                const agent = result.data.agentUpdated
                this.#updatedCallbacks.forEach(cb => {
                    cb(agent)
                })
            },
            error: (e) => console.error(e)
        })
    }


    /**
     * Returns the Agent expression of the local agent as it is shared
     * publicly via the AgentLanguage.
     * 
     * I.e. this is the users profile.
     */
    async me(): Promise<Agent> {
        const { agent } = unwrapApolloResult(await this.#apolloClient.query({ 
            query: gql`query agent { agent { ${AGENT_SUBITEMS} } }` 
        }))
        let agentObject = new Agent(agent.did, agent.perspective)
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

    async generate(passphrase: string): Promise<AgentStatus> {
        const { agentGenerate } = unwrapApolloResult(await this.#apolloClient.mutate({ 
            mutation: gql`mutation agentGenerate(
                $passphrase: String!
            ) {
                agentGenerate(passphrase: $passphrase) {
                    ${AGENT_STATUS_FIELDS}
                }
            }`,
            variables: { passphrase} 
        }))
        return new AgentStatus(agentGenerate)
    }

    async import(args: InitializeArgs): Promise<AgentStatus> {
        let { did, didDocument, keystore, passphrase } = args
        const { agentImport } = unwrapApolloResult(await this.#apolloClient.mutate({ 
            mutation: gql`mutation agentImport(
                $did: String!,
                $didDocument: String!,
                $keystore: String!,
                $passphrase: String!
            ) {
                agentImport(did: $did, didDocument: $didDocument, keystore: $keystore, passphrase: $passphrase) {
                    ${AGENT_STATUS_FIELDS}
                }
            }`,
            variables: { did, didDocument, keystore, passphrase} 
        }))
        return new AgentStatus(agentImport)
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

    async updatePublicPerspective(perspective: PerspectiveInput): Promise<Agent> {
        const { agentUpdatePublicPerspective } = unwrapApolloResult(await this.#apolloClient.mutate({ 
            mutation: gql`mutation agentUpdatePublicPerspective($perspective: PerspectiveInput!) {
                agentUpdatePublicPerspective(perspective: $perspective) {
                    ${AGENT_SUBITEMS}
                }
            }`,
            variables: { perspective: perspective }
        }))
        const a = agentUpdatePublicPerspective
        const agent = new Agent(a.did, a.perspective)
        agent.directMessageLanguage = a.directMessageLanguage
        return agent
    }

    async updateDirectMessageLanguage(directMessageLanguage: string): Promise<Agent> {
        const { agentUpdateDirectMessageLanguage } = unwrapApolloResult(await this.#apolloClient.mutate({ 
            mutation: gql`mutation agentUpdateDirectMessageLanguage($directMessageLanguage: String!) {
                agentUpdateDirectMessageLanguage(directMessageLanguage: $directMessageLanguage) {
                    ${AGENT_SUBITEMS}
                }
            }`,
            variables: { directMessageLanguage }
        }))
        const a = agentUpdateDirectMessageLanguage
        const agent = new Agent(a.did, a.perspective)
        agent.directMessageLanguage = a.directMessageLanguage
        return agent
    }

    addUpdatedListener(listener) {
        this.#updatedCallbacks.push(listener)
    }
}