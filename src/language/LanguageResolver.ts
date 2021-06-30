
import { Arg, Field, Mutation, Query, Resolver } from "type-graphql";
import Language from "./Language";
import LanguageHandle from "./LanguageHandle";

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
}

