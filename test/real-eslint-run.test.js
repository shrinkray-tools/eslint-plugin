const { ESLint } = require("eslint");

(async () => {
	const eslint = new ESLint({
		useEslintrc: false,
		baseConfig: {
			parserOptions: { ecmaVersion: 2020, sourceType: "module" },
			plugins: ["@shrinkray-tools"],
			rules: {
				"@shrinkray-tools/no-large-imports": "warn",
			},
		},
		overrideConfigFile: null,
		overrideConfig: {},
		resolvePluginsRelativeTo: __dirname,
		plugins: {
			"@shrinkray-tools": require("../index.js"),
		},
	});

	const results = await eslint.lintFiles(["test/fixtures/large-import.js"]);

	for (const result of results) {
		console.log(`\n${result.filePath}`);
		result.messages.forEach((msg) => {
			console.log(`  [${msg.ruleId}] ${msg.message} (line ${msg.line})`);
		});
	}

	const errorCount = results.reduce(
		(sum, r) => sum + r.warningCount + r.errorCount,
		0,
	);
	if (errorCount === 0) {
		console.error("❌ No warnings or errors found (expected some)");
		process.exit(1);
	} else {
		console.log(`\n✅ Found ${errorCount} warning(s)/error(s) as expected.`);
	}
})();
