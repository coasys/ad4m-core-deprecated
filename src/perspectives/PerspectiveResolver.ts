import { Arg, Field, Mutation, Query, Resolver } from "type-graphql";
import { LinkExpression, LinkExpressionInput } from "../links/Links";
import LinkQuery from "./LinkQuery";
import { NeighbourhoodExpression } from "../neighbourhood/Neighbourhood";
import Perspective from "./Perspective";
import PerspectiveHandle from "./PerspectiveHandle";

@Resolver()
export default class PerspectiveResolver {
    @Query(returns => [PerspectiveHandle])
    perspectives(): PerspectiveHandle[] {
        return []
    }

    @Query(returns => PerspectiveHandle, {nullable: true})
    perspective(@Arg('uuid') uuid: string): PerspectiveHandle|void {
        return null
    }

    @Query(returns => Perspective, {nullable: true})
    perspectiveSnapshot(@Arg('uuid') uuid: string): Perspective|void {
        return null
    }

    @Query(returns => [LinkExpression], {nullable: true})
    perspectiveQueryLinks(@Arg('uuid') uuid: string, @Arg('query') query: LinkQuery): LinkExpression[] {
        return []
    }

    @Mutation(returns => PerspectiveHandle)
    perspectiveAdd(@Arg('name') name: string): PerspectiveHandle {
        return new PerspectiveHandle()
    }

    @Mutation(returns => PerspectiveHandle, {nullable: true})
    perspectiveUpdate(@Arg('uuid') uuid: string, @Arg('name') name: string): PerspectiveHandle {
        return new PerspectiveHandle()
    }

    @Mutation(returns => Boolean)
    perspectiveRemove(@Arg('uuid') uuid: string): boolean {
        return true
    }

    @Mutation(returns => LinkExpression)
    perspectiveAddLink(@Arg('uuid') uuid: string, @Arg('link') link: string): LinkExpression {
        return new LinkExpression()
    }
 
    @Mutation(returns => LinkExpression)
    perspectiveUpdateLink(@Arg('uuid') uuid: string, @Arg('oldLink') oldlink: string, @Arg('newLink') newlink: string): LinkExpression {
        return new LinkExpression()
    }

    @Mutation(returns => Boolean)
    perspectiveRemoveLink(@Arg('uuid') uuid: string, @Arg('link') link: string): Boolean {
        return true
    }
}