export interface Foundry {
  [key: string]: unknown
}
export interface FoundryResolved<TProject extends string> {
  deployments: unknown extends Foundry['deployments']
    ? string
    : Foundry['deployments'][TProject]
}

export interface Hardhat {
  [key: string]: unknown
}
export interface HardhatResolved<TProject extends string> {
  deployments: unknown extends Hardhat['deployments']
    ? string
    : Hardhat['deployments'][TProject]
}
