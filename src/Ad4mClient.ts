import { ApolloClient } from '@apollo/client'
import AgentClient from './agent/AgentClient'
import { LanguageClient } from './language/LanguageClient'

export class Ad4mClient {
    #apolloClient: ApolloClient<any>
    #agentClient: AgentClient
    #languageClient: LanguageClient


    constructor(client: ApolloClient<any>) {
        this.#apolloClient = client
        this.#agentClient = new AgentClient(client)
        this.#languageClient = new LanguageClient(client)
    }

    get agent(): AgentClient {
        return this.#agentClient
    }

    get languages(): LanguageClient {
        return this.#languageClient
    }
}