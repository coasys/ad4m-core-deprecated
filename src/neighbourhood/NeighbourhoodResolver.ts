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
        return new ExpressionRef(new LanguageRef("test-neighbourhood-language-address", "neighbourhoods"), "test-address")
    }

    @Mutation(returns => PerspectiveHandle)
    neighbourhoodJoinFromUrl(@Arg('url') url: string): PerspectiveHandle {
        const perspective = new PerspectiveHandle
        perspective.name = "test-perspective"
        perspective.sharedURL = url
        perspective.uuid = "234234234"
        return perspective
    }
}