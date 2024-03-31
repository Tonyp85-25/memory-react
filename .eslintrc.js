module.exports = {
	env: {
		browser: true,
		es2021: true,
		"jest/globals": true,
		node: true,
	},
	plugins: ["react", "react-refresh", "react-hooks"],
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
		"prettier",
	],
	overrides: [
		{
			files: ["test/**"],
			plugins: ["jest", "jest-dom"],
			extends: ["plugin:jest/recommended", "plugin:jest-dom/recommended"],
			rules: {
				"jest/prefer-expect-assertions": "off",
			},
		},
	],
	settings: {
		react: {
			version: "detect",
		},
	},
	rules: {
		"react/react-in-jsx-scope": "off",
		"react/jsx-uses-react": "off",
		"@typescript-eslint/no-explicit-any": "warn",
	},

	parser: "@typescript-eslint/parser",
};
