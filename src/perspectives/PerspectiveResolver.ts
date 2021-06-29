import { Arg, Field, Mutation, Query, Resolver } from "type-graphql";
import { LinkExpression } from "../links/Links";
import LinkQuery from "./LinkQuery";
import Perspective from "./Perspective";
import { PerspectiveHandle } from "./PerspectiveHandle";

@Resolver()
export default class PerspectiveResolver {
    @Query(returns => [PerspectiveHandle])
    perspectives(): PerspectiveHandle[] {
        return []
    }

    @Query(returns => PerspectiveHandle)
    perspective(@Arg('uuid') uuid: string): PerspectiveHandle|void {
        return null
    }

    @Query(returns => Perspective)
    perspectiveSnapshot(@Arg('uuid') uuid: string): Perspective|void {
        return null
    }

    @Query(returns => [LinkExpression])
    queryLinks(@Arg('uuid') uuid: string, @Arg('query') query: LinkQuery): LinkExpression[] {
        return []
    }
}