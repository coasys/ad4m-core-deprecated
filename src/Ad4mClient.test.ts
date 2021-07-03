import { buildSchema } from "type-graphql"
import { ApolloServer } from 'apollo-server'
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from 'cross-fetch'
import { onError } from '@apollo/link-error'
import AgentResolver from "./agent/AgentResolver"
import { Ad4mClient } from "./Ad4mClient";

jest.setTimeout(15000)

describe('Ad4mClient', () => {
    let ad4mClient
    
    beforeAll(async () => {
        const schema = await buildSchema({
            resolvers: [AgentResolver]
        })
        const server = new ApolloServer({ schema })
        const { url, subscriptionsUrl } = await server.listen()

        console.log("GraphQL server listening at:", url)

        const errorLink = onError(({ graphQLErrors }) => {
            if (graphQLErrors) graphQLErrors.map(({ message }) => console.error(`GraphQL Error: ${message}`))
          })
          

        const apolloClient = new ApolloClient({
            link: ApolloLink.from([errorLink, new HttpLink({ uri: url, fetch})]),
            cache: new InMemoryCache(),
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'network-only',
                    nextFetchPolicy: 'network-only'
                },
            },
        });

        console.log("GraphQL client connected")

        ad4mClient = new Ad4mClient(apolloClient)
    })

    describe('.agent', () => {
        it('agent() works', async () => {
            const agent = await ad4mClient.agent.agent()
            expect(agent.did).toBe('did:ad4m:test')
        })
    })



})