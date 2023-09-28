import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  'packages/*',
  'packages/register-tests/*',
  '!packages/create-wagmi',
])
