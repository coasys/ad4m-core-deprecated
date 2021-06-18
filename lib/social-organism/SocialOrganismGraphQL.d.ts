import { NeighbourhoodExpression } from "../neighbourhood/NeighbourhoodGraphQL";
import { Perspective } from "../perspectives/PerspectiveGraphQL";
export default class SocialOrganism {
    inner: NeighbourhoodExpression;
    outer: Perspective;
}
