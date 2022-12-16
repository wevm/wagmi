import type { Address as AddressType } from 'abitype'
import { Abi as AbiSchema } from 'abitype/zod'
import { getAddress } from 'ethers/lib/utils.js'
import { z } from 'zod'

const Address = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, { message: 'Invalid address' })
  .transform((val) => getAddress(val)) as z.ZodType<AddressType>
const MultiChainAddress = z.record(z.number(), Address)
const Contract = z.object({
  abi: AbiSchema,
  address: z.union([Address, MultiChainAddress]).optional(),
  name: z.string(),
})
type ZodContract = z.infer<typeof Contract>
export type Contract<
  TChainId extends number = number,
  RequiredChainId extends number | undefined = undefined,
> = {
  /** Contract ABI */
  abi: ZodContract['abi']
  /**
   * Contract address or addresses.
   *
   * Accepts an object `{ [chainId]: address }` to support multiple chains.
   *
   * @example
   * '0x314159265dd8dbb310642f98f50c066173c1259b'
   *
   * @example
   * {
   *   1: '0x314159265dd8dbb310642f98f50c066173c1259b',
   *   5: '0x112234455c3a32fd11230c42e7bccd4a84e02010',
   * }
   */
  address?:
    | AddressType
    | (RequiredChainId extends number
        ? Record<RequiredChainId, AddressType> &
            Partial<Record<TChainId, AddressType>>
        : Record<TChainId, AddressType>)
  /**
   * Name of contract
   *
   * Used for names of generated code
   */
  name: ZodContract['name']
}

const AbiFn = z
  .function()
  .args(z.any())
  .returns(z.union([AbiSchema, AbiSchema.promise()]))
const ContractSource = Contract.merge(
  z.object({ abi: z.union([AbiFn, AbiSchema]) }),
)
export type ContractSource = Omit<z.infer<typeof ContractSource>, 'address'> &
  Pick<Contract, 'address'>

const Watch = z.object({
  /** Command to run along with watch process */
  command: z
    .function()
    .args()
    .returns(z.union([z.void(), z.void().promise()]))
    .optional(),
  /** Paths to watch for changes. */
  paths: z.string().array(),
  /** Callback that fires when file is added */
  onAdd: z
    .function()
    .args(z.string())
    .returns(
      z.union([
        z.union([Contract, z.undefined()]),
        z.union([Contract, z.undefined()]).promise(),
      ]),
    )
    .optional(),
  /** Callback that fires when file changes */
  onChange: z
    .function()
    .args(z.string())
    .returns(
      z.union([
        z.union([Contract, z.undefined()]),
        z.union([Contract, z.undefined()]).promise(),
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
const ContractsSource = z.object({
  name: z.string(),
  contracts: z.function().args().returns(Contract.array().promise()),
  watch: Watch.optional(),
})
export type ContractsSource = z.infer<typeof ContractsSource>

export const Config = z.object({
  contracts: z.union([ContractSource, ContractsSource]).array(),
  out: z.string(),
  plugins: z.string().array().optional(),
})
// TODO: Figure out way for JSDoc to show up without needing to recreate type
export type Config = z.infer<typeof Config>

/**
 * Creates `@wagmi/cli` config object.
 */
export function defineConfig(config: Config) {
  return config
}

export const defaultConfig: Config = {
  out: 'src/generated/wagmi.ts',
  contracts: [],
  plugins: [],
}
