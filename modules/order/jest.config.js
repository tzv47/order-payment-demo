const tsconfig = require("./tsconfig.json");
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig);
const paths = {};
Object.keys(moduleNameMapper).forEach(key => {
  paths[key] = moduleNameMapper[key].replace("<rootDir>", "<rootDir>/..");
});
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  rootDir: "src",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "js", "json"],
  coverageDirectory: "../coverage",
  coveragePathIgnorePatterns: ["index.ts", "enum", "constant"],
  //collectCoverageFrom: ["**/{!(index),}.{ts}"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: paths
};
