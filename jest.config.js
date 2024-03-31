/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	moduleNameMapper: {
		"^.+\\.svg$": "jest-svg-transformer",
		"^.+\\.(css|less|scss)$": "identity-obj-proxy",
	},
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
		"^.+\\.(js|jsx)$": "babel-jest",
	},
	setupFilesAfterEnv: ["./setupTests.ts"],
	moduleDirectories: [
		"node_modules",
		// add the directory with the test-utils.js file, for example:
		//    'utils', // a utility folder
		//    __dirname, // the root directory
	],
};
