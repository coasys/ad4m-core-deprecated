import { Arg, Mutation, Resolver } from "type-graphql";
import { ExpressionRef } from "../expression/ExpressionRef";
import { LanguageRef } from "../language/LanguageRef";
import { NeighbourhoodExpression } from "../neighbourhood/Neighbourhood";
import { PerspectiveHandle } from "../perspectives/PerspectiveHandle";


@Resolver()
export default class NeighbourhoodResolver {
    @Mutation(returns => ExpressionRef)
    neighbourhoodPublishFromPerspective(
        @Arg('perspectiveUUID') perspectiveUUID: string, 
        @Arg('linkLanguage') linkLanguage: string,
        @Arg('meta') meta: string
    ): ExpressionRef {
        return new ExpressionRef(new LanguageRef(), "")
    }

    @Mutation(returns => PerspectiveHandle)
    neighbourhoodJoinFromUrl(@Arg('url') url: string): PerspectiveHandle {
        return new PerspectiveHandle
    }
}