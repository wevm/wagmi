import path from 'node:path'
import { playwright } from '@vitest/browser-playwright'
import reactFallbackThrottlePlugin from 'vite-plugin-react-fallback-throttle'
import { defaultExclude, defineConfig } from 'vitest/config'

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
        'packages/core/src/tempo/**',
        'packages/react/src/tempo/**',
      ],
    },
    globalSetup: process.env.TYPES
      ? ['./packages/test/src/setup.global.types.ts']
      : ['./packages/test/src/setup.global.ts'],
    projects: [
      {
        test: {
          name: 'cli',
          environment: 'node',
          include: ['./packages/cli/src/**/*.test.ts'],
          testTimeout: 10_000,
          setupFiles: ['./packages/cli/test/setup.ts'],
        },
      },
      {
        test: {
          name: 'connectors',
          include: ['./packages/connectors/src/**/*.test.ts'],
          environment: 'happy-dom',
        },
        resolve: { alias },
      },
      {
        test: {
          name: 'core',
          include: [
            ...(process.env.TYPES ? ['**/*.bench-d.ts'] : []),
            './packages/core/src/**/*.test.ts',
          ],
          exclude: [
            './packages/core/src/tempo/**/*.test.ts',
            ...defaultExclude,
          ],
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
        plugins: [reactFallbackThrottlePlugin()],
        resolve: { alias },
        test: {
          name: 'tempo',
          browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: 'chromium' }],
            provider: playwright(),
            screenshotFailures: false,
          },
          include: [
            './packages/core/src/tempo/**/*.test.ts',
            './packages/react/src/tempo/**/*.test.ts',
          ],
          testTimeout: 10_000,
          globalSetup: process.env.TYPES
            ? ['./packages/test/src/setup.global.types.ts']
            : ['./packages/test/src/tempo/setup.global.ts'],
          setupFiles: ['./packages/test/src/tempo/setup.ts'],
        },
      },
      {
        plugins: [reactFallbackThrottlePlugin()],
        resolve: { alias },
        test: {
          name: 'react',
          browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: 'chromium' }],
            provider: playwright(),
            screenshotFailures: false,
          },
          include: ['./packages/react/src/**/*.test.ts?(x)'],
          exclude: [
            './packages/react/src/tempo/**/*.test.ts',
            ...defaultExclude,
          ],
          testTimeout: 10_000,
          setupFiles: ['./packages/react/test/setup.ts'],
        },
      },
      {
        test: {
          name: 'vue',
          include: ['./packages/vue/src/**/*.test.ts?(x)'],
          environment: 'happy-dom',
          testTimeout: 10_000,
          setupFiles: ['./packages/vue/test/setup.ts'],
        },
        resolve: { alias },
      },
      {
        test: {
          name: 'test',
          include: ['./packages/test/src/**/*.test.ts'],
        },
        resolve: { alias },
      },
    ],
    setupFiles: ['./packages/test/src/setup.ts'],
  },
})
