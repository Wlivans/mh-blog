module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:prettier/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: { jsx: true },
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "react", "prettier"],
	rules: {
		"no-undef": 2,
		"@typescript-eslint/no-unused-vars": [2, { vars: "all", args: "none" }],
		"jsx-a11y/anchor-is-valid": "off",
		"prettier/prettier": ["error", {}, { usePrettierrc: true }],
	},
	prettier: "prettier --write .",
	overrides: [
		{
			files: ["**/*.ts?(x)"],
			rules: {
				// if while function 后面的{必须与if在同一行，java风格。
				"brace-style": [2, "1tbs", { allowSingleLine: true }],
				// Place to specify ESLint rules.
				"@typescript-eslint/no-explicit-any": "off",
				"@typescript-eslint/no-var-requires": "off",
				"@typescript-eslint/no-non-null-assertion": "off",
				"@typescript-eslint/no-this-alias": "off",
				"@typescript-eslint/ban-ts-comment": "off",
				"@typescript-eslint/explicit-module-boundary-types": "off",
				"@typescript-eslint/triple-slash-reference": 0,
				"no-use-before-define": "off",
				"@typescript-eslint/no-use-before-define": "off",
			},
		},
	],
};
