import { IStyleAPI, IStyleItem } from 'import-sort-style';

export default function(styleApi: IStyleAPI): IStyleItem[] {
  const {
    alias,
    and,
    dotSegmentCount,
    hasNoMember,
    isAbsoluteModule,
    isNodeModule,
    isRelativeModule,
    isScopedModule,
    moduleName,
    naturally,
    not,
  } = styleApi;

  const isStyleModule = moduleName((s: string) => !!s.match('style.module.css'));

  return [
    // import "foo"
    { match: and(hasNoMember, isAbsoluteModule) },
    { separator: true },

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
    { separator: true },

    // import ... from "./foo";
    // import ... from "../foo";
    {
      match: and(isRelativeModule, not(isStyleModule)),
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(naturally),
    },
    { separator: true },

    // import ... from "./style.module.css";
    {
      match: isStyleModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(naturally),
    },
    { separator: true },
  ];
}
