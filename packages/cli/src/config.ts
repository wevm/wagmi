import type { Abi, Address as AddressType } from 'abitype'
import { Abi as AbiSchema } from 'abitype/zod'
import { getAddress } from 'ethers/lib/utils.js'
import { z } from 'zod'

const Address = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, { message: 'Invalid address' })
  .transform((val) => getAddress(val)) as z.ZodType<AddressType>
const MultiChainAddress = z.record(z.string(), Address)

const SourceFn = z
  .function()
  .args(z.any())
  .returns(
    z.union([
      AbiSchema as z.ZodType<Abi>,
      (AbiSchema as z.ZodType<Abi>).promise(),
    ]),
  )

const ContractBase = z.object({
  /**
   * Address of contract
   *
   * Pass as an object { [chainId]: address } to support multiple chains
   */
  address: z.union([Address, MultiChainAddress]).optional(),
  /**
   * Name of contract
   *
   * Used for names of generated code
   */
  name: z.string(),
  /** Contract ABI source */
  source: AbiSchema,
})

const Watch = z.object({
  /** Optional command to run along with watch process */
  command: z.string().optional(),
  /** Paths to watch for changes. */
  paths: z.string().array(),
  /** Callback that fires when file is added */
  onAdd: z
    .function()
    .args(z.string())
    .returns(
      z.union([
        z.union([ContractBase, z.undefined()]),
        z.union([ContractBase, z.undefined()]).promise(),
      ]),
    )
    .optional(),
  /** Callback that fires when file changes */
  onChange: z
    .function()
    .args(z.string())
    .returns(
      z.union([
        z.union([ContractBase, z.undefined()]),
        z.union([ContractBase, z.undefined()]).promise(),
      ]),
    ),
  /** Callback that fires when file is removed */
  onRemove: z
    .function()
    .args(z.string())
    .returns(z.union([z.string(), z.string().promise()]))
    .optional(),
})
export type Watch = z.infer<typeof Watch>

const ContractConfig = ContractBase.merge(
  z.object({
    /** Contract ABI source */
    source: z.union([SourceFn, AbiSchema]),
  }),
)
export type ContractConfig = z.infer<typeof ContractConfig>

const ContractFn = z.object({
  contracts: z.function().args().returns(ContractBase.array().promise()),
  watch: Watch.optional(),
})
export type ContractFn = z.infer<typeof ContractFn>

export const Config = z.object({
  /** Contracts to manage ABIs for */
  contracts: z.union([ContractConfig, ContractFn]).array(),
  plugins: z.string().array().optional(),
})
export type Config = z.infer<typeof Config>

export function defineConfig(config: Config) {
  return config
}
