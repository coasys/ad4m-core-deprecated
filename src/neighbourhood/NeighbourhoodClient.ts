import { ApolloClient, ApolloQueryResult, gql } from "@apollo/client"
import { Address } from "../Address"
import { ExpressionRef } from "../expression/ExpressionRef"
import { LanguageRef } from "../language/LanguageRef"
import { Perspective } from "../perspectives/Perspective"
import { PerspectiveHandle } from "../perspectives/PerspectiveHandle"
import unwrapApolloResult from "../unwrapApolloResult"

export default class NeighbourhoodClient {
    #apolloClient: ApolloClient<any>

    constructor(client: ApolloClient<any>) {
        this.#apolloClient = client
    }

    async publishFromPerspective(
        perspectiveUUID: string, 
        linkLanguage: Address,
        meta: Perspective
    ): Promise<ExpressionRef> {
        const { neighbourhoodPublishFromPerspective } = unwrapApolloResult(await this.#apolloClient.mutate({
            mutation: gql`mutation neighbourhoodPublishFromPerspective(
                $linkLanguage: String!,
                $meta: PerspectiveInput!,
                $perspectiveUUID: String!
            ) {
                neighbourhoodPublishFromPerspective(
                    linkLanguage: $linkLanguage,
                    meta: $meta,
                    perspectiveUUID: $perspectiveUUID
                ) {
                    expression
                    language {
                        name
                        address
                    }
                }
            }`,
            variables: { perspectiveUUID, linkLanguage, meta: meta}
        }))

        const r = neighbourhoodPublishFromPerspective

        return new ExpressionRef(new LanguageRef(r.language.address, r.language.name), r.expression)
    }

    async joinFromUrl(url: string): Promise<PerspectiveHandle> {
        const { neighbourhoodJoinFromUrl } = unwrapApolloResult(await this.#apolloClient.mutate({
            mutation: gql`    mutation neighbourhoodJoinFromUrl($url: String!) {
                neighbourhoodJoinFromUrl(url: $url) {
                    uuid
                    name
                    sharedURL
                }
            }`,
            variables: { url }
        }))

        return neighbourhoodJoinFromUrl
    }
}