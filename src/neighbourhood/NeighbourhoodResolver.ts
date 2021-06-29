import { Arg, Field, Mutation, Query, Resolver } from "type-graphql";
import { NeighbourhoodExpression } from "../neighbourhood/Neighbourhood";
import PerspectiveHandle from "../perspectives/PerspectiveHandle";


@Resolver()
export default class NeighbourhoodResolver {
    @Mutation(returns => Boolean)
    neighbourhoodPublishFromPerspective(
        @Arg('perspectiveUUID') perspectiveUUID: string, 
        @Arg('linkLanguage') linkLanguage: string,
        @Arg('meta') meta: string
    ): NeighbourhoodExpression {
        return new NeighbourhoodExpression()
    }

    @Mutation(returns => PerspectiveHandle)
    neighbourhoodJoinFromUrl(@Arg('url') url: string): PerspectiveHandle {
        return new PerspectiveHandle
    }
}