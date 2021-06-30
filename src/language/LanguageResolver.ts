
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import LanguageHandle from "./LanguageHandle";
import LanguageRef from "./LanguageRef";

@Resolver()
export default class LanguageResolver {
    @Query(returns => LanguageHandle, {nullable: true})
    language(@Arg('address') address: string): LanguageHandle {
        return new LanguageHandle()
    }

    @Query(returns => [LanguageHandle])
    languages(@Arg('filter') filter: string): LanguageHandle[] {
        return []
    }

    @Mutation(returns => Boolean)
    languageWriteSettings(
        @Arg('languageAddres') languageAddress: string,
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
        return new LanguageRef()
    }
}

