const path = require('path');
const rule = require('../lib/rules/no-large-imports');
const RuleTester = require('eslint').RuleTester;

// Load lib sizes for dynamic assertion
const libSizes = require('../data/large-libs.json');

const tester = new RuleTester({ parserOptions: { ecmaVersion: 2020, sourceType: 'module' } });

tester.run('no-large-imports', rule, {
  valid: [
    "import { useEffect } from 'react';",
    "import merge from 'lodash/merge';",
    "import format from 'date-fns/format';"
  ],

  invalid: Object.keys(libSizes).map((lib) => ({
    code: `import ${lib.replace(/[@/-]/g, '_')} from '${lib}';`,
    errors: [
      {
        message: new RegExp(`${lib} is ~${libSizes[lib]}KB`)
      }
    ]
  }))
});
