import { ApolloClient, gql } from "@apollo/client"
import unwrapApolloResult from "../unwrapApolloResult"
import { LanguageHandle } from "./LanguageHandle"
import { LanguageRef } from "./LanguageRef"

const LANGUAGE_COMPLETE = `
    name
    address
    settings
    icon { code }
    constructorIcon { code }
    settingsIcon { code }
`

export class LanguageClient {
    #apolloClient: ApolloClient<any>

    constructor(apolloClient: ApolloClient<any>) {
        this.#apolloClient = apolloClient
    }

    async byAddress(address: string): Promise<LanguageHandle> {
        const { language } = unwrapApolloResult(await this.#apolloClient.query({
            query: gql`query byAddress($address: String!) {
                language(address: $address) {
                    ${LANGUAGE_COMPLETE}
                }
            }`,
            variables: { address }
        }))
        return language
    }

    async byFilter(filter: string): Promise<LanguageHandle[]> {
        const { languages } = unwrapApolloResult(await this.#apolloClient.query({
            query: gql`query byFilter($filter: String!) {
                languages(filter: $filter) {
                    ${LANGUAGE_COMPLETE}
                }
            }`,
            variables: { filter }
        }))
        return languages
    }

    async all(): Promise<LanguageHandle[]> {
        return this.byFilter('')
    }

    async writeSettings(
        languageAddress: string,
        settings: string
    ): Promise<Boolean> {
        const { languageWriteSettings } = unwrapApolloResult(await this.#apolloClient.mutate({
            mutation: gql`mutation writeSettings($languageAddress: String!, $settings: String!) {
                languageWriteSettings(languageAddress: $languageAddress, settings: $settings)
            }`,
            variables: { languageAddress, settings }
        }))
        return languageWriteSettings
    }

    async applyTemplateAndPublish(
        sourceLanguageHash: string,
        templateData: string
    ): Promise<LanguageRef> {
        const { languageApplyTemplateAndPublish } = unwrapApolloResult(await this.#apolloClient.mutate({
            mutation: gql`mutation languageApplyTemplateAndPublish(
                $sourceLanguageHash: String!,
                $templateData: String!,
            ) {
                languageApplyTemplateAndPublish(sourceLanguageHash: $sourceLanguageHash, templateData: $templateData) {
                    name, address
                }
            }`,
            variables: { sourceLanguageHash, templateData }
        }))

        return languageApplyTemplateAndPublish
    }
}