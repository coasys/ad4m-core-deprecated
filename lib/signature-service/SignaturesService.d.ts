import type Expression from "../expression/Expression";
export default interface SignaturesService {
    verify(expr: Expression): boolean;
}
