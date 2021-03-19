module.exports = {
  testEnvironment: 'node',
  roots: [''],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/cmdbridge-module/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'ts.secret'],
}
