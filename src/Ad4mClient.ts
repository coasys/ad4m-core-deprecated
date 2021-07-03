import { ApolloClient } from '@apollo/client'
import AgentClient from './agent/AgentClient'

export class Ad4mClient {
    #apolloClient: ApolloClient<any>
    #agentClient: AgentClient


    constructor(client: ApolloClient<any>) {
        this.#apolloClient = client
        this.#agentClient = new AgentClient(client)
    }

    get agent(): AgentClient {
        return this.#agentClient
    }


}