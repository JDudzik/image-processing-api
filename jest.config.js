module.exports = {
  clearMocks: true,
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/(?!@foo)'],
  globals: {
    'ts-jest': {
      diagnostics: true,
      tsconfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '^src(.*)': '<rootDir>/src$1',
    '^((?:controllers|exampleTest|tests|utils|v1)(?:\\/|$).*)$': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@foo)'],
};
