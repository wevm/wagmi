import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const alias = {
  '@wagmi/connectors': path.resolve(
    __dirname,
    './packages/connectors/src/exports',
  ),
  '@wagmi/core': path.resolve(__dirname, './packages/core/src/exports'),
  '@wagmi/test': path.resolve(__dirname, './packages/test/src/exports'),
  '@wagmi/vue': path.resolve(__dirname, './packages/vue/src/exports'),
  wagmi: path.resolve(__dirname, './packages/react/src/exports'),
}

export default defineConfig({
  server: {
    watch: {
      ignored: ['**/templates/**'],
    },
  },
  test: {
    coverage: {
      all: false,
      reporter: process.env.CI ? ['lcov'] : ['text', 'json', 'html'],
      exclude: [
        '**/dist/**',
        '**/*.test.ts',
        '**/*.test-d.ts',
        'packages/cli/**',
        'packages/test/**',
        // ignore third-party connectors
        'packages/connectors/**',
        'packages/core/src/connectors/injected.ts',
      ],
    },
    globalSetup: ['./packages/test/src/globalSetup.ts'],
    projects: [
      {
        test: {
          name: '@wagmi/cli',
          environment: 'node',
          include: ['./packages/cli/src/**/*.test.ts'],
          testTimeout: 10_000,
          setupFiles: ['./packages/cli/test/setup.ts'],
        },
      },
      {
        test: {
          name: '@wagmi/connectors',
          include: ['./packages/connectors/src/**/*.test.ts'],
          environment: 'happy-dom',
        },
        resolve: { alias },
      },
      {
        test: {
          name: '@wagmi/core',
          include: ['./packages/core/src/**/*.test.ts'],
          environment: 'happy-dom',
          testTimeout: 10_000,
          setupFiles: ['./packages/core/test/setup.ts'],
        },
        resolve: { alias },
      },
      {
        test: {
          name: 'create-wagmi',
          include: ['./packages/create-wagmi/src/**/*.test.ts'],
          environment: 'node',
          testTimeout: 10_000,
        },
      },
      {
        plugins: [react()],
        resolve: { alias },
        test: {
          name: 'wagmi',
          browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: 'chromium' }],
            provider: 'playwright',
            screenshotFailures: false,
          },
          include: ['./packages/react/src/**/*.test.ts?(x)'],
          testTimeout: 10_000,
          setupFiles: ['./packages/react/test/setup.ts'],
        },
      },
      {
        test: {
          name: '@wagmi/vue',
          include: ['./packages/vue/src/**/*.test.ts?(x)'],
          environment: 'happy-dom',
          testTimeout: 10_000,
          setupFiles: ['./packages/vue/test/setup.ts'],
        },
        resolve: { alias },
      },
      {
        test: {
          name: 'react-register',
          include: ['./packages/register-tests/react/src/**/*.test.ts'],
        },
        resolve: { alias },
      },
      {
        test: {
          name: '@wagmi/test',
          include: ['./packages/test/src/**/*.test.ts'],
        },
        resolve: { alias },
      },
    ],
    setupFiles: ['./packages/test/src/setup.ts'],
  },
})
