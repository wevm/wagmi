export { actions } from './actions'
export { blockExplorer } from './blockExplorer'
export { erc } from './erc'
export { etherscan } from './etherscan'
export { fetch } from './fetch'
export { foundry } from './foundry'
export { hardhat } from './hardhat'
export { react } from './react'
export { sourcify } from './sourcify'

export interface Foundry {
  [key: string]: unknown
}
export interface FoundryResolved<TProject extends string> {
  deployments: unknown extends Foundry['deployments']
    ? string
    : TProject extends keyof Foundry['deployments']
    ? Foundry['deployments'][TProject]
    : string
}

export interface Hardhat {
  [key: string]: unknown
}
export interface HardhatResolved<TProject extends string> {
  deployments: unknown extends Hardhat['deployments']
    ? string
    : TProject extends keyof Hardhat['deployments']
    ? Hardhat['deployments'][TProject]
    : string
}
