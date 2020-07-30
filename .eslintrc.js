module.exports = {
	env: {
		browser: true,
		es2020: true,
		amd: true,
		node: true,
	},
	extends: ["eslint:recommended", "plugin:react/recommended"],
	parserOptions: {
		ecmaVersion: 11,
		sourceType: "module",
	},
	parser: "babel-eslint",
	rules: {},
};
