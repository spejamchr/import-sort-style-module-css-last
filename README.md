# import-sort-style-module-css-last

A style for [import-sort](https://github.com/renke/import-sort) that is focused
on modules, and always imports css styles last.

```typescript
// Absolute modules with side effects (not sorted because order may matter)
import 'a';
import 'c';
import 'b';

// Relative modules with side effects (not sorted because order may matter)
import './a';
import './c';
import './b';

// Third-party modules sorted by name
import aa from 'aa';
import bb from 'bb';
import cc from 'cc';

// First-party modules sorted by "relative depth" and then by name
import aaa from '../../aaa';
import bbb from '../../bbb';
import aaaa from '../aaaa';
import bbbb from '../bbbb';
import aaaaa from './aaaaa';
import bbbbb from './bbbbb';

// css styles
import * as style from '../../style.module.css';
```
