import { SharingType } from "./SharedPerspective";
import { LanguageRef } from "../language/LanguageRefGraphQL";
export declare class SharedPerspective {
    name: string;
    description: string;
    type: SharingType;
    linkLanguages: LanguageRef[];
    allowedExpressionLanguages: string[];
    requiredExpressionLanguages: string[];
}
