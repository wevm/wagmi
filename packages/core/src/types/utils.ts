import {
  Abi,
  AbiFunction,
  AbiParameter,
  AbiParameterToPrimitiveType,
  AbiParametersToPrimitiveTypes,
  ExtractAbiFunction,
} from 'abitype'

export type IsNever<T> = [T] extends [never] ? true : false
export type NotEqual<T, U> = [T] extends [U] ? false : true
export type Or<T, U> = T extends true ? true : U extends true ? true : false

export type GetArgs<
  TAbi extends Abi | readonly unknown[],
  TFunction extends AbiFunction & { type: 'function' },
> = TFunction['inputs'] extends infer TInputs extends readonly any[]
  ? Or<IsNever<TInputs>, NotEqual<TAbi, Abi>> extends true
    ? {
        /**
         * Arguments to pass contract method
         *
         * Use a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) on {@link contractInterface} for type inference.
         */
        args?: readonly any[]
      }
    : TInputs['length'] extends 0
    ? { args?: never }
    : {
        /** Arguments to pass contract method */
        args: AbiParametersToPrimitiveTypes<TInputs>
      }
  : never

export type GetResult<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = TAbi extends Abi
  ? ExtractAbiFunction<
      TAbi,
      TFunctionName
    >['outputs'] extends infer TOutputs extends readonly AbiParameter[]
    ? TOutputs['length'] extends infer TLength
      ? TLength extends 0
        ? void
        : TLength extends 1
        ? AbiParameterToPrimitiveType<TOutputs[0]>
        : // eslint-disable-next-line @typescript-eslint/no-unused-vars
        TOutputs extends readonly [...infer _]
        ? {
            [Component in TOutputs[number] as Component['name'] extends ''
              ? never
              : Component['name']]: AbiParameterToPrimitiveType<Component>
          } & AbiParametersToPrimitiveTypes<TOutputs>
        : any
      : never
    : never
  : any
