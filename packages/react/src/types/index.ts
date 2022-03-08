import { QueryFunctionContext } from 'react-query'

export type QueryFunctionArgs<T extends (...args: any) => any> =
  QueryFunctionContext<ReturnType<T>>
