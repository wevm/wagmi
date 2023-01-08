import type { SignMessageArgs, SignMessageResult } from '@wagmi/core'
import { signMessage as _signMessage } from '@wagmi/core'
import { createSignal } from 'solid-js'

export const useSignMessage = () => {
  const [result, setResult] = createSignal<SignMessageResult>()

  const signMessage = async (args: SignMessageArgs) => {
    const result = await _signMessage(args)
    setResult(result)
  }

  return { sign: signMessage, result }
}
