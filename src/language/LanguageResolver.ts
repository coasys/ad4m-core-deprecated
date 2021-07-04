
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Icon } from "./Icon";
import { LanguageHandle } from "./LanguageHandle";
import { LanguageRef } from "./LanguageRef";

@Resolver()
export default class LanguageResolver {
    @Query(returns => LanguageHandle, {nullable: true})
    language(@Arg('address') address: string): LanguageHandle {
        let language = new LanguageHandle()
        language.address = address
        language.name = 'test-language'
        language.settings = JSON.stringify({testSetting: 'test'})
        language.icon = new Icon('test-code')
        language.settingsIcon = new Icon('test-code')
        language.constructorIcon = new Icon('test-code')
        return language
    }


    @Query(returns => [LanguageHandle])
    languages(@Arg('filter', {nullable: true}) filter: string): LanguageHandle[] {
        let language = new LanguageHandle()
        language.address = 'test-address'
        language.name = 'test-links-language'

        if(!filter || filter === 'linksAdapter')
            return [language]
        else
            return []
    }

    @Mutation(returns => Boolean)
    languageWriteSettings(
        @Arg('languageAddress') languageAddress: string,
        @Arg('settings') settings: string
    ): Boolean {
        return true
    }

    @Mutation()
    languageCloneHolochainTemplate(
        @Arg('languagePath') languagePath: string,
        @Arg('dnaNick') dnaNick: string,
        @Arg('uid') uid: string
    ): LanguageRef {
        return new LanguageRef('test-address', `${dnaNick}-clone`)
    }
}

