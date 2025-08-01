#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const getSize = require('package-size'); // default export

const dynamicPackages = ['moment', 'lodash', 'three'];
const hardcoded = {
  '@mui/material': 612,
  '@aws-sdk/client-s3': 408,
  'firebase': 648,
  'react-datepicker': 327
};

async function run() {
  const results = {...hardcoded};

  for (const pkg of dynamicPackages) {
    try {
      const res = await getSize(pkg);
      const sizeKb = Math.round(res.size / 1024);
      results[pkg] = sizeKb;
      console.log(`✅ ${pkg}: ${sizeKb}KB`);
    } catch (e) {
      console.warn(`⚠️ Failed to get size for ${pkg}: ${e.message}`);
    }
  }

  const outputPath = path.resolve(__dirname, '../data/large-libs.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

  console.log('\n✅ Saved to data/large-libs.json');
}

run();
