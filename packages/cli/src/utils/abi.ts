import { AbiParameter as AbiParameterSchema } from 'abitype'
import { z } from 'zod'

// From https://docs.soliditylang.org/en/latest/abi-spec.html#types
const SolidityAddress = z.literal('address')
const SolidityBool = z.literal('bool')
const SolidityBytes = z.string().regex(
  // `bytes<M>`: binary type of `M` bytes, `0 < M <= 32`
  /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/,
)
const SolidityFunction = z.literal('function')
const SolidityString = z.literal('string')
const SolidityTuple = z.literal('tuple')
const SolidityInt = z.string().regex(
  // `(u)int<M>`: (un)signed integer type of `M` bits, `0 < M <= 256`, `M % 8 == 0`
  /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/,
)
const SolidityArrayWithoutTuple = z
  .string()
  .regex(
    /^(address|bool|function|string|bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?|u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?)(\[[0-9]{0,}\])+$/,
  )
const SolidityArrayWithTuple = z.string().regex(/^tuple(\[[0-9]{0,}\])+$/)

const AbiParameterSchema: z.ZodType<AbiParameterSchema> = z.lazy(() =>
  z.intersection(
    z.object({
      name: z.string().optional(),
      /** Representation used by Solidity compiler */
      internalType: z.string().optional(),
    }),
    z.union([
      z.object({
        type: z.union([
          SolidityAddress,
          SolidityBool,
          SolidityBytes,
          SolidityFunction,
          SolidityString,
          SolidityInt,
          SolidityArrayWithoutTuple,
        ]),
      }),
      z.object({
        type: z.union([SolidityTuple, SolidityArrayWithTuple]),
        components: z.array(AbiParameterSchema),
      }),
    ]),
  ),
)

const AbiStateMutability = z.union([
  z.literal('pure'),
  z.literal('view'),
  z.literal('nonpayable'),
  z.literal('payable'),
])

const AbiFunctionSchema = z.intersection(
  z.object({
    /**
     * @deprecated use `pure` or `view` from {@link AbiStateMutability} instead
     * https://github.com/ethereum/solidity/issues/992
     */
    constant: z.boolean().optional(),
    /**
     * @deprecated Vyper used to provide gas estimates
     * https://github.com/vyperlang/vyper/issues/2151
     */
    gas: z.number().optional(),
    /**
     * @deprecated use `payable` or `nonpayable` from {@link AbiStateMutability} instead
     * https://github.com/ethereum/solidity/issues/992
     */
    payable: z.boolean().optional(),
    stateMutability: AbiStateMutability,
  }),
  z.discriminatedUnion('type', [
    z.object({
      type: z.literal('function'),
      inputs: z.array(AbiParameterSchema),
      name: z.string(),
      outputs: z.array(AbiParameterSchema),
    }),
    z.object({
      type: z.literal('constructor'),
      inputs: z.array(AbiParameterSchema),
    }),
    z.object({ type: z.literal('fallback'), inputs: z.tuple([]) }),
    z.object({
      type: z.literal('receive'),
      stateMutability: z.literal('payable'),
    }),
  ]),
)

const AbiEventSchema = z.object({
  type: z.literal('event'),
  anonymous: z.boolean().optional(),
  inputs: z.array(
    z.intersection(
      AbiParameterSchema,
      z.object({ indexed: z.boolean().optional() }),
    ),
  ),
  name: z.string(),
})

const AbiErrorSchema = z.object({
  type: z.literal('event'),
  inputs: z.array(AbiParameterSchema),
  name: z.string(),
})

/**
 * Contract [ABI Specification](https://docs.soliditylang.org/en/latest/abi-spec.html#json)
 */
export const AbiSchema = z.array(
  z.union([AbiFunctionSchema, AbiEventSchema, AbiErrorSchema]),
)
