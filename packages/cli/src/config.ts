import { Address } from 'abitype'
import type { Abi } from 'abitype'
import { Abi as AbiSchema } from 'abitype/zod'
import { getAddress } from 'ethers/lib/utils.js'
import { z } from 'zod'

const Address = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, { message: 'Invalid address' })
  .transform((val) => getAddress(val)) as z.ZodType<Address>

const SourceFn = z
  .function()
  .args(
    z.object({
      address: z.union([Address, z.record(z.string(), Address)]).optional(),
    }),
  )
  .returns(z.promise(AbiSchema as z.ZodType<Abi>))
export type SourceFn = z.infer<typeof SourceFn>

const Contract = z.object({
  /**
   * Address of contract
   *
   * Pass as an object { [chainId]: address } to support multiple chains
   */
  address: z.union([Address, z.record(z.string(), Address)]).optional(),
  /**
   * Name of contract
   *
   * Used for names of generated code
   */
  name: z.string(),
  /** Contract ABI source */
  source: z.union([SourceFn, AbiSchema]),
})

const ContractsFn = z.function().args().returns(z.promise(Contract.array()))
export type ContractsFn = z.infer<typeof ContractsFn>

export const Config = z.object({
  /** Contracts to manage ABIs for */
  contracts: z.union([Contract, ContractsFn]).array(),
  plugins: z.string().array().optional(),
})
export type Config = z.infer<typeof Config>

export function defineConfig(config: Config) {
  return config
}
