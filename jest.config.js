module.exports = {
  clearMocks: true,
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  setupFiles: ['./test/setup.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '^vue$': 'vue/dist/vue.js'
  },
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testMatch: [
    '**/test/**/*.spec.ts'
  ],
  collectCoverageFrom: [
    "**/src/**/*.ts",
    "!**/node_modules/**"
  ]
}
