module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  setupFiles: ['./jestSetup.ts'],
  rootDir: './src'
};