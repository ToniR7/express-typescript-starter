import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => ({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: [],
    coverage: {
      enabled: false,
      reporter: ['text', 'lcov', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['src/app.ts', 'src/utils/keyVault.ts', 'src/utils/testUtils/**', 'src/models/**', 'src/openapi/**', 'src/typings/**', 'src/**/index.ts'],
    },
    env: loadEnv(mode, __dirname, ''),
    bail: 1,
    testTimeout: 15000,
  },
  resolve: {
    tsconfigPaths: true,
  },
}))
