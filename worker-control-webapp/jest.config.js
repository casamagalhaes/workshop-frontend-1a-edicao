module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
  setupFiles: ['<rootDir>/tests/unit/setup'],
  setupFilesAfterEnv: ['<rootDir>/tests/unit/custom-matchers.js'],
  testMatch: ['**/(*.)test.js'],
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!**/node_modules/**',
    '!src/main.js',
    '!src/api.js',
    '!src/router/index.js',
    '!src/store/index.js',
    '!src/plugins/Service.js',
  ],
}
