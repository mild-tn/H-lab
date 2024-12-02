module.exports = {
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
      babelConfig: true,
      diagnostics: false,
    },
  },
  coveragePathIgnorePatterns: ["/node_modules/", "/server/"],
  coverageReporters: ["json", "lcov", "text", "text-summary"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
    }],
  },
};
