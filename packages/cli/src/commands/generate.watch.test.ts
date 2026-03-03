import { readFile } from 'node:fs/promises'
import dedent from 'dedent'
import { resolve } from 'pathe'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'

import { createFixture } from '../../test/utils.js'

type EventHandler = (...args: any[]) => unknown

type MockWatcher = {
  close: ReturnType<typeof vi.fn>
  emit: (event: string, ...args: any[]) => Promise<void>
  on: (event: string, handler: EventHandler) => MockWatcher
}

const mocks = vi.hoisted(() => {
  const mockWatchers: MockWatcher[] = []
  const watchMock = vi.fn(() => {
    const handlers = new Map<string, EventHandler>()
    const watcher: MockWatcher = {
      close: vi.fn(async () => {}),
      async emit(event: string, ...args: any[]) {
        await handlers.get(event)?.(...args)
      },
      on(event: string, handler: EventHandler) {
        handlers.set(event, handler)
        return watcher
      },
    }
    mockWatchers.push(watcher)
    return watcher
  })

  return { mockWatchers, watchMock }
})

vi.mock('chokidar', () => ({
  watch: mocks.watchMock,
}))

import { generate } from './generate.js'

beforeEach(() => {
  mocks.mockWatchers.length = 0
  mocks.watchMock.mockClear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

function getPluginWatcher() {
  const index = mocks.watchMock.mock.calls.findIndex((call) => {
    const args = call as unknown[]
    const paths = args[0] as string[] | string | undefined
    return Array.isArray(paths) && paths.includes('contracts/*.json')
  })
  if (index === -1) throw new Error('Expected plugin watcher to be registered.')
  return mocks.mockWatchers[index]
}

test('watch: add falls back to onChange when onAdd is omitted', async () => {
  const { dir } = await createFixture({
    files: {
      'wagmi.config.js': dedent`
        export default {
          out: 'generated.js',
          plugins: [{
            name: 'Test',
            watch: {
              paths: ['contracts/*.json'],
              async onChange(path) {
                return {
                  abi: [],
                  name: path.includes('bar') ? 'Bar' : 'Foo',
                }
              },
            },
          }],
        }
      `,
    },
  })
  vi.spyOn(process, 'cwd').mockImplementation(() => dir)

  await generate({ watch: true })

  expect(mocks.mockWatchers).toHaveLength(2)
  await getPluginWatcher()?.emit('all', 'add', 'contracts/bar.json')
  await new Promise((resolve) => setTimeout(resolve, 250))

  await expect(readFile(resolve(dir, 'generated.js'), 'utf8')).resolves.toContain(
    'export const barAbi = []',
  )
})

test('watch: unlink supports removing multiple contracts', async () => {
  const { dir } = await createFixture({
    files: {
      'wagmi.config.js': dedent`
        export default {
          out: 'generated.js',
          contracts: [
            { abi: [], name: 'Foo' },
            { abi: [], name: 'Bar' },
          ],
          plugins: [{
            name: 'Test',
            watch: {
              paths: ['contracts/*.json'],
              async onChange() {
                return undefined
              },
              async onRemove() {
                return ['Foo', 'Bar']
              },
            },
          }],
        }
      `,
    },
  })
  vi.spyOn(process, 'cwd').mockImplementation(() => dir)

  await generate({ watch: true })

  await getPluginWatcher()?.emit('all', 'unlink', 'contracts/bar.json')
  await new Promise((resolve) => setTimeout(resolve, 250))

  const output = await readFile(resolve(dir, 'generated.js'), 'utf8')
  expect(output).not.toContain('export const fooAbi = []')
  expect(output).not.toContain('export const barAbi = []')
})
