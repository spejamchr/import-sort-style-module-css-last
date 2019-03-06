"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(styleApi) {
    const { alias, and, dotSegmentCount, hasNoMember, isAbsoluteModule, isNodeModule, isRelativeModule, isScopedModule, moduleName, naturally, not, } = styleApi;
    const isStyleModule = moduleName((s) => !!s.match('style.module.css'));
    return [
        // import "foo"
        { match: and(hasNoMember, isAbsoluteModule) },
        // import "./foo"
        { match: and(hasNoMember, isRelativeModule) },
        { separator: true },
        // import ... from 'foo';
        {
            match: and(isAbsoluteModule, not(isScopedModule)),
            sort: moduleName(naturally),
            sortNamedMembers: alias(naturally),
        },
        // import ... from "@scope/foo";
        {
            match: isScopedModule,
            sort: moduleName(naturally),
            sortNamedMembers: alias(naturally),
        },
        // import ... from "./foo";
        // import ... from "../foo";
        {
            match: and(isRelativeModule, not(isStyleModule)),
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(naturally),
        },
        // import ... from "./style.module.css";
        {
            match: isStyleModule,
            sort: moduleName(naturally),
            sortNamedMembers: alias(naturally),
        },
        { separator: true },
    ];
}
exports.default = default_1;
