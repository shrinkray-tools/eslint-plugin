module.exports = {
	rules: {
		"no-large-imports": require("./lib/rules/no-large-imports"),
	},
	configs: {
		recommended: {
			rules: {
				"@shrinkray-tools/no-large-imports": "warn",
			},
		},
	},
};
