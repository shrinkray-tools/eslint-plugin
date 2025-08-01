/**
 * @fileoverview Flags imports of known large libraries to avoid bundle bloat.
 */

'use strict';

const path = require('path');
const fs = require('fs');

// Load size thresholds from external JSON
const libSizes = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../../data/large-libs.json'),
    'utf8'
  )
);

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'warn when importing known large libraries',
      category: 'Performance',
      recommended: false
    },
    schema: [] // no options
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        if (libSizes[importPath]) {
          const size = libSizes[importPath];
          context.report({
            node,
            message: `${importPath} is ~${size}KB. Consider a lighter or more scoped alternative.`
          });
        }
      }
    };
  }
};
