module.exports = {
  clearMocks: true,
  collectCoverage: true,
  testRegex: '.*\\.spec\\.ts$',
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/(usecases|utils)/**/*.(t|j)s'],
  moduleNameMapper: {
    '^entities(.*)$': '<rootDir>/src/entities$1',
    '^repositories(.*)$': '<rootDir>/src/repositories$1',
    '^infrastructure(.*)$': '<rootDir>/src/infrastructure$1',
    '^controllers(.*)$': '<rootDir>/src/controllers$1',
    '^usecases(.*)$': '<rootDir>/src/usecases$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
    '^src(.*)$': '<rootDir>/src$1',
  },
  maxWorkers: 2,
};
