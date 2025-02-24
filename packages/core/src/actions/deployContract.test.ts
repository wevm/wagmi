import {
  abi,
  bytecode,
  config,
  testClient,
  transactionHashRegex,
} from '@wagmi/test'
import { parseEther } from 'viem'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { deployContract } from './deployContract.js'
import { disconnect } from './disconnect.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  await expect(
    deployContract(config, {
      abi: abi.bayc,
      bytecode: bytecode.bayc,
      args: ['Bored Ape Wagmi Club', 'BAYC', 69420n, 0n],
    }),
  ).resolves.toMatch(transactionHashRegex)
  await disconnect(config, { connector })
})

test('behavior: no funds', async () => {
  const data = await connect(config, { connector })
  const connectedAddress = data.accounts[0]

  await testClient.mainnet.setBalance({
    address: connectedAddress,
    value: parseEther('0'),
  })

  await expect(
    deployContract(config, {
      chainId: testClient.mainnet.chain.id,
      abi: abi.bayc,
      bytecode: bytecode.bayc,
      args: ['Bored Ape Wagmi Club', 'BAYC', 69420n, 0n],
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [TransactionExecutionError: The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account.

    This error could arise when the account does not have enough funds to:
     - pay for the total gas fee,
     - pay for the value to send.
     
    The cost of the transaction is calculated as \`gas * gas fee + value\`, where:
     - \`gas\` is the amount of gas needed for transaction to execute,
     - \`gas fee\` is the gas fee,
     - \`value\` is the amount of ether to send to the recipient.
     
    Request Arguments:
      chain:  undefined (id: 1)
      from:   0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
      data:   0x608060405260405180602001604052806000815250600b90805190602001906200002b92919062000484565b506000600f60006101000a81548160ff0219169083151502179055503480156200005457600080fd5b50604051620046d0380380620046d0833981810160405260808110156200007a57600080fd5b81019080805160405193929190846401000000008211156200009b57600080fd5b83820191506020820185811115620000b257600080fd5b8251866001820283011164010000000082111715620000d057600080fd5b8083526020830192505050908051906020019080838360005b8381101562000106578082015181840152602081019050620000e9565b50505050905090810190601f168015620001345780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200015857600080fd5b838201915060208201858111156200016f57600080fd5b82518660018202830111640100000000821117156200018d57600080fd5b8083526020830192505050908051906020019080838360005b83811015620001c3578082015181840152602081019050620001a6565b50505050905090810190601f168015620001f15780820380516001836020036101000a031916815260200191505b5060405260200180519060200190929190805190602001909291905050508383620002296301ffc9a760e01b6200037360201b60201c565b81600690805190602001906200024192919062000484565b5080600790805190602001906200025a92919062000484565b50620002736380ac58cd60e01b6200037360201b60201c565b6200028b635b5e139f60e01b6200037360201b60201c565b620002a363780e9d6360e01b6200037360201b60201c565b50506000620002b76200047c60201b60201c565b905080600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35081600e81905550620bdd808101601081905550505050506200052a565b63ffffffff60e01b817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916141562000410576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f4552433136353a20696e76616c696420696e746572666163652069640000000081525060200191505060405180910390fd5b6001600080837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b600033905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620004c757805160ff1916838001178555620004f8565b82800160010185558215620004f8579182015b82811115620004f7578251825591602001919060010190620004da565b5b5090506200050791906200050b565b5090565b5b80821115620005265760008160009055506001016200050c565b5090565b614196806200053a6000396000f3fe60806040526004361061021a5760003560e01c80636c0360eb11610123578063b0f67427116100ab578063e36d64981161006f578063e36d649814610ddf578063e985e9c514610e0a578063e986655014610e91578063eb8d244414610ea8578063f2fde38b14610ed55761021a565b8063b0f6742714610bac578063b88d4fde14610bc3578063bb8a16bd14610cd5578063c87b56dd14610d00578063cb774d4714610db45761021a565b80637d17fcbe116100f25780637d17fcbe14610a395780638da5cb5b14610a5057806395d89b4114610a91578063a22cb46514610b21578063a723533e14610b7e5761021a565b80636c0360eb1461090257806370a0823114610992578063715018a6146109f75780637a3f451e14610a0e5761021a565b80632f745c59116101a65780634f6ccce7116101755780634f6ccce7146106cb57806355f804b31461071a578063571dff3b146107e2578063607e20e31461080d5780636352211e1461089d5761021a565b80632f745c59146105b357806334918dfd146106225780633ccfd60b1461063957806342842e0e146106505761021a565b8063095ea7b3116101ed578063095ea7b3146103bf578063109695231461041a57806318160ddd146104e257806318e20a381461050d57806323b872dd146105385761021a565b8063018a2c371461021f57806301ffc9a71461025a57806306fdde03146102ca578063081812fc1461035a575b600080fd5b34801561022b57600080fd5b506102586004803603602081101561024257600080fd5b8101908080359060200190929190505050610f26565b005b34801561026657600080fd5b506102b26004803603602081101561027d57600080fd5b8101908080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19169060200190929190505050610fdf565b60405180821515815260200191505060405180910390f35b3480156102d657600080fd5b506102df611046565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561031f578082015181840152602081019050610304565b50505050905090810190601f16801561034c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561036657600080fd5b506103936004803603602081101561037d57600080fd5b81019080803590602001909291905050506110e8565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156103cb57600080fd5b50610418600480360360408110156103e257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611183565b005b34801561042657600080fd5b506104e06004803603602081101561043d57600080fd5b810190808035906020019064010000000081111561045a57600080fd5b82018360208201111561046c57600080fd5b8035906020019184600183028401116401000000008311171561048e57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506112c7565b005b3480156104ee57600080fd5b506104f7611390565b6040518082815260200191505060405180910390f35b34801561051957600080fd5b506105226113a1565b6040518082815260200191505060405180910390f35b34801561054457600080fd5b506105b16004803603606081101561055b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506113a7565b005b3480156105bf57600080fd5b5061060c600480360360408110156105d657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061141d565b6040518082815260200191505060405180910390f35b34801561062e57600080fd5b50610637611478565b005b34801561064557600080fd5b5061064e611553565b005b34801561065c57600080fd5b506106c96004803603606081101561067357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611651565b005b3480156106d757600080fd5b50610704600480360360208110156106ee57600080fd5b8101908080359060200190929190505050611671565b6040518082815260200191505060405180910390f35b34801561072657600080fd5b506107e06004803603602081101561073d57600080fd5b810190808035906020019064010000000081111561075a57600080fd5b82018360208201111561076c57600080fd5b8035906020019184600183028401116401000000008311171561078e57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050611694565b005b3480156107ee57600080fd5b506107f761174f565b6040518082815260200191505060405180910390f35b34801561081957600080fd5b50610822611754565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610862578082015181840152602081019050610847565b50505050905090810190601f16801561088f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156108a957600080fd5b506108d6600480360360208110156108c057600080fd5b81019080803590602001909291905050506117f2565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561090e57600080fd5b50610917611829565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561095757808201518184015260208101905061093c565b50505050905090810190601f1680156109845780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561099e57600080fd5b506109e1600480360360208110156109b557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506118cb565b6040518082815260200191505060405180910390f35b348015610a0357600080fd5b50610a0c6119a0565b005b348015610a1a57600080fd5b50610a23611b10565b6040518082815260200191505060405180910390f35b348015610a4557600080fd5b50610a4e611b1c565b005b348015610a5c57600080fd5b50610a65611c4c565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b348015610a9d57600080fd5b50610aa6611c76565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610ae6578082015181840152602081019050610acb565b50505050905090810190601f168015610b135780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b348015610b2d57600080fd5b50610b7c60048036036040811015610b4457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803515159060200190929190505050611d18565b005b610baa60048036036020811015610b9457600080fd5b8101908080359060200190929190505050611ece565b005b348015610bb857600080fd5b50610bc1612127565b005b348015610bcf57600080fd5b50610cd360048036036080811015610be657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190640100000000811115610c4d57600080fd5b820183602082011115610c5f57600080fd5b80359060200191846001830284011164010000000083111715610c8157600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061220b565b005b348015610ce157600080fd5b50610cea612283565b6040518082815260200191505060405180910390f35b348015610d0c57600080fd5b50610d3960048036036020811015610d2357600080fd5b8101908080359060200190929190505050612289565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610d79578082015181840152602081019050610d5e565b50505050905090810190601f168015610da65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b348015610dc057600080fd5b50610dc961255a565b6040518082815260200191505060405180910390f35b348015610deb57600080fd5b50610df4612560565b6040518082815260200191505060405180910390f35b348015610e1657600080fd5b50610e7960048036036040811015610e2d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612566565b60405180821515815260200191505060405180910390f35b348015610e9d57600080fd5b50610ea66125fa565b005b348015610eb457600080fd5b50610ebd612764565b60405180821515815260200191505060405180910390f35b348015610ee157600080fd5b50610f2460048036036020811015610ef857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612777565b005b610f2e61296c565b73ffffffffffffffffffffffffffffffffffffffff16610f4c611c4c565b73ffffffffffffffffffffffffffffffffffffffff1614610fd5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b8060108190555050565b6000806000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900460ff169050919050565b606060068054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156110de5780601f106110b3576101008083540402835291602001916110de565b820191906000526020600020905b8154815290600101906020018083116110c157829003601f168201915b5050505050905090565b60006110f382612974565b611148576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602c81526020018061408b602c913960400191505060405180910390fd5b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600061118e826117f2565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611215576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602181526020018061410f6021913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1661123461296c565b73ffffffffffffffffffffffffffffffffffffffff16148061126357506112628161125d61296c565b612566565b5b6112b8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526038815260200180613f956038913960400191505060405180910390fd5b6112c28383612991565b505050565b6112cf61296c565b73ffffffffffffffffffffffffffffffffffffffff166112ed611c4c565b73ffffffffffffffffffffffffffffffffffffffff1614611376576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b80600b908051906020019061138c929190613de6565b5050565b600061139c6002612a4a565b905090565b60105481565b6113b86113b261296c565b82612a5f565b61140d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260318152602001806141306031913960400191505060405180910390fd5b611418838383612b53565b505050565b600061147082600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020612d9690919063ffffffff16565b905092915050565b61148061296c565b73ffffffffffffffffffffffffffffffffffffffff1661149e611c4c565b73ffffffffffffffffffffffffffffffffffffffff1614611527576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600f60009054906101000a900460ff1615600f60006101000a81548160ff021916908315150217905550565b61155b61296c565b73ffffffffffffffffffffffffffffffffffffffff16611579611c4c565b73ffffffffffffffffffffffffffffffffffffffff1614611602576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b60004790503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561164d573d6000803e3d6000fd5b5050565b61166c8383836040518060200160405280600081525061220b565b505050565b600080611688836002612db090919063ffffffff16565b50905080915050919050565b61169c61296c565b73ffffffffffffffffffffffffffffffffffffffff166116ba611c4c565b73ffffffffffffffffffffffffffffffffffffffff1614611743576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b61174c81612ddc565b50565b601481565b600b8054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156117ea5780601f106117bf576101008083540402835291602001916117ea565b820191906000526020600020905b8154815290600101906020018083116117cd57829003601f168201915b505050505081565b600061182282604051806060016040528060298152602001613ff7602991396002612df69092919063ffffffff16565b9050919050565b606060098054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156118c15780601f10611896576101008083540402835291602001916118c1565b820191906000526020600020905b8154815290600101906020018083116118a457829003601f168201915b5050505050905090565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611952576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602a815260200180613fcd602a913960400191505060405180910390fd5b611999600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020612e15565b9050919050565b6119a861296c565b73ffffffffffffffffffffffffffffffffffffffff166119c6611c4c565b73ffffffffffffffffffffffffffffffffffffffff1614611a4f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a36000600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b67011c37937e08000081565b611b2461296c565b73ffffffffffffffffffffffffffffffffffffffff16611b42611c4c565b73ffffffffffffffffffffffffffffffffffffffff1614611bcb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b6000600d5414611c43576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f5374617274696e6720696e64657820697320616c72656164792073657400000081525060200191505060405180910390fd5b43600c81905550565b6000600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060078054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015611d0e5780601f10611ce357610100808354040283529160200191611d0e565b820191906000526020600020905b815481529060010190602001808311611cf157829003601f168201915b5050505050905090565b611d2061296c565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611dc1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f4552433732313a20617070726f766520746f2063616c6c65720000000000000081525060200191505060405180910390fd5b8060056000611dce61296c565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff16611e7b61296c565b73ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c318360405180821515815260200191505060405180910390a35050565b600f60009054906101000a900460ff16611f50576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f53616c65206d7573742062652061637469766520746f206d696e74204170650081525060200191505060405180910390fd5b6014811115611faa576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526021815260200180613f746021913960400191505060405180910390fd5b600e54611fc782611fb9611390565b612e2a90919063ffffffff16565b111561201e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260288152602001806140426028913960400191505060405180910390fd5b3461203a8267011c37937e080000612eb290919063ffffffff16565b11156120ae576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f45746865722076616c75652073656e74206973206e6f7420636f72726563740081525060200191505060405180910390fd5b60005b818110156120ef5760006120c3611390565b9050600e546120d0611390565b10156120e1576120e03382612f38565b5b5080806001019150506120b1565b506000600c541480156121175750600e54612108611390565b148061211657506010544210155b5b156121245743600c819055505b50565b61212f61296c565b73ffffffffffffffffffffffffffffffffffffffff1661214d611c4c565b73ffffffffffffffffffffffffffffffffffffffff16146121d6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b60006121e0611390565b905060005b601e811015612207576121fa33828401612f38565b80806001019150506121e5565b5050565b61221c61221661296c565b83612a5f565b612271576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260318152602001806141306031913960400191505060405180910390fd5b61227d84848484612f56565b50505050565b600e5481565b606061229482612974565b6122e9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602f8152602001806140e0602f913960400191505060405180910390fd5b6060600860008481526020019081526020016000208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156123925780601f1061236757610100808354040283529160200191612392565b820191906000526020600020905b81548152906001019060200180831161237557829003601f168201915b5050505050905060606123a3611829565b90506000815114156123b9578192505050612555565b60008251111561248a5780826040516020018083805190602001908083835b602083106123fb57805182526020820191506020810190506020830392506123d8565b6001836020036101000a03801982511681845116808217855250505050505090500182805190602001908083835b6020831061244c5780518252602082019150602081019050602083039250612429565b6001836020036101000a0380198251168184511680821785525050505050509050019250505060405160208183030381529060405292505050612555565b8061249485612fc8565b6040516020018083805190602001908083835b602083106124ca57805182526020820191506020810190506020830392506124a7565b6001836020036101000a03801982511681845116808217855250505050505090500182805190602001908083835b6020831061251b57805182526020820191506020810190506020830392506124f8565b6001836020036101000a03801982511681845116808217855250505050505090500192505050604051602081830303815290604052925050505b919050565b600d5481565b600c5481565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6000600d5414612672576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f5374617274696e6720696e64657820697320616c72656164792073657400000081525060200191505060405180910390fd5b6000600c5414156126eb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f5374617274696e6720696e64657820626c6f636b206d7573742062652073657481525060200191505060405180910390fd5b600e54600c544060001c816126fc57fe5b06600d8190555060ff61271a600c544361310f90919063ffffffff16565b111561273a57600e54600143034060001c8161273257fe5b06600d819055505b6000600d5414156127625761275b6001600d54612e2a90919063ffffffff16565b600d819055505b565b600f60009054906101000a900460ff1681565b61277f61296c565b73ffffffffffffffffffffffffffffffffffffffff1661279d611c4c565b73ffffffffffffffffffffffffffffffffffffffff1614612826576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156128ac576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180613ed86026913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600033905090565b600061298a82600261319290919063ffffffff16565b9050919050565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16612a04836117f2565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000612a58826000016131ac565b9050919050565b6000612a6a82612974565b612abf576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602c815260200180613f48602c913960400191505060405180910390fd5b6000612aca836117f2565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480612b3957508373ffffffffffffffffffffffffffffffffffffffff16612b21846110e8565b73ffffffffffffffffffffffffffffffffffffffff16145b80612b4a5750612b498185612566565b5b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff16612b73826117f2565b73ffffffffffffffffffffffffffffffffffffffff1614612bdf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260298152602001806140b76029913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415612c65576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526024815260200180613efe6024913960400191505060405180910390fd5b612c708383836131bd565b612c7b600082612991565b612ccc81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206131c290919063ffffffff16565b50612d1e81600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206131dc90919063ffffffff16565b50612d35818360026131f69092919063ffffffff16565b50808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b6000612da5836000018361322b565b60001c905092915050565b600080600080612dc386600001866132ae565b915091508160001c8160001c9350935050509250929050565b8060099080519060200190612df2929190613de6565b5050565b6000612e09846000018460001b84613347565b60001c90509392505050565b6000612e238260000161343d565b9050919050565b600080828401905083811015612ea8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b8091505092915050565b600080831415612ec55760009050612f32565b6000828402905082848281612ed657fe5b0414612f2d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602181526020018061406a6021913960400191505060405180910390fd5b809150505b92915050565b612f5282826040518060200160405280600081525061344e565b5050565b612f61848484612b53565b612f6d848484846134bf565b612fc2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526032815260200180613ea66032913960400191505060405180910390fd5b50505050565b60606000821415613010576040518060400160405280600181526020017f3000000000000000000000000000000000000000000000000000000000000000815250905061310a565b600082905060005b6000821461303a578080600101915050600a828161303257fe5b049150613018565b60608167ffffffffffffffff8111801561305357600080fd5b506040519080825280601f01601f1916602001820160405280156130865781602001600182028036833780820191505090505b50905060006001830390508593505b6000841461310257600a84816130a757fe5b0660300160f81b828280600190039350815181106130c157fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a84816130fa57fe5b049350613095565b819450505050505b919050565b600082821115613187576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601e8152602001807f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525060200191505060405180910390fd5b818303905092915050565b60006131a4836000018360001b6136d8565b905092915050565b600081600001805490509050919050565b505050565b60006131d4836000018360001b6136fb565b905092915050565b60006131ee836000018360001b6137e3565b905092915050565b6000613222846000018460001b8473ffffffffffffffffffffffffffffffffffffffff1660001b613853565b90509392505050565b60008183600001805490501161328c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180613e846022913960400191505060405180910390fd5b82600001828154811061329b57fe5b9060005260206000200154905092915050565b60008082846000018054905011613310576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806140206022913960400191505060405180910390fd5b600084600001848154811061332157fe5b906000526020600020906002020190508060000154816001015492509250509250929050565b6000808460010160008581526020019081526020016000205490506000811415839061340e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156133d35780820151818401526020810190506133b8565b50505050905090810190601f1680156134005780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5084600001600182038154811061342157fe5b9060005260206000209060020201600101549150509392505050565b600081600001805490509050919050565b613458838361392f565b61346560008484846134bf565b6134ba576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526032815260200180613ea66032913960400191505060405180910390fd5b505050565b60006134e08473ffffffffffffffffffffffffffffffffffffffff16613b23565b6134ed57600190506136d0565b606061365763150b7a0260e01b61350261296c565b888787604051602401808573ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff16815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561358657808201518184015260208101905061356b565b50505050905090810190601f1680156135b35780820380516001836020036101000a031916815260200191505b5095505050505050604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051806060016040528060328152602001613ea6603291398773ffffffffffffffffffffffffffffffffffffffff16613b369092919063ffffffff16565b9050600081806020019051602081101561367057600080fd5b8101908080519060200190929190505050905063150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614925050505b949350505050565b600080836001016000848152602001908152602001600020541415905092915050565b600080836001016000848152602001908152602001600020549050600081146137d7576000600182039050600060018660000180549050039050600086600001828154811061374657fe5b906000526020600020015490508087600001848154811061376357fe5b906000526020600020018190555060018301876001016000838152602001908152602001600020819055508660000180548061379b57fe5b600190038181906000526020600020016000905590558660010160008781526020019081526020016000206000905560019450505050506137dd565b60009150505b92915050565b60006137ef8383613b4e565b61384857826000018290806001815401808255809150506001900390600052602060002001600090919091909150558260000180549050836001016000848152602001908152602001600020819055506001905061384d565b600090505b92915050565b60008084600101600085815260200190815260200160002054905060008114156138fa57846000016040518060400160405280868152602001858152509080600181540180825580915050600190039060005260206000209060020201600090919091909150600082015181600001556020820151816001015550508460000180549050856001016000868152602001908152602001600020819055506001915050613928565b8285600001600183038154811061390d57fe5b90600052602060002090600202016001018190555060009150505b9392505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156139d2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4552433732313a206d696e7420746f20746865207a65726f206164647265737381525060200191505060405180910390fd5b6139db81612974565b15613a4e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000081525060200191505060405180910390fd5b613a5a600083836131bd565b613aab81600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206131dc90919063ffffffff16565b50613ac2818360026131f69092919063ffffffff16565b50808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45050565b600080823b905060008111915050919050565b6060613b458484600085613b71565b90509392505050565b600080836001016000848152602001908152602001600020541415905092915050565b606082471015613bcc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180613f226026913960400191505060405180910390fd5b613bd585613b23565b613c47576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000081525060200191505060405180910390fd5b600060608673ffffffffffffffffffffffffffffffffffffffff1685876040518082805190602001908083835b60208310613c975780518252602082019150602081019050602083039250613c74565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d8060008114613cf9576040519150601f19603f3d011682016040523d82523d6000602084013e613cfe565b606091505b5091509150613d0e828286613d1a565b92505050949350505050565b60608315613d2a57829050613ddf565b600083511115613d3d5782518084602001fd5b816040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015613da4578082015181840152602081019050613d89565b50505050905090810190601f168015613dd15780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b9392505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10613e2757805160ff1916838001178555613e55565b82800160010185558215613e55579182015b82811115613e54578251825591602001919060010190613e39565b5b509050613e629190613e66565b5090565b5b80821115613e7f576000816000905550600101613e67565b509056fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e64734552433732313a207472616e7366657220746f206e6f6e20455243373231526563656976657220696d706c656d656e7465724f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734552433732313a207472616e7366657220746f20746865207a65726f2061646472657373416464726573733a20696e73756666696369656e742062616c616e636520666f722063616c6c4552433732313a206f70657261746f7220717565727920666f72206e6f6e6578697374656e7420746f6b656e43616e206f6e6c79206d696e7420323020746f6b656e7320617420612074696d654552433732313a20617070726f76652063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656420666f7220616c6c4552433732313a2062616c616e636520717565727920666f7220746865207a65726f20616464726573734552433732313a206f776e657220717565727920666f72206e6f6e6578697374656e7420746f6b656e456e756d657261626c654d61703a20696e646578206f7574206f6620626f756e6473507572636861736520776f756c6420657863656564206d617820737570706c79206f662041706573536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f774552433732313a20617070726f76656420717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a207472616e73666572206f6620746f6b656e2074686174206973206e6f74206f776e4552433732314d657461646174613a2055524920717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76616c20746f2063757272656e74206f776e65724552433732313a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564a2646970667358221220b0e64d1fa6c4dbeb9c6f54607d7e1996943fe27624a80652f57b53fda084621b64736f6c63430007000033000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000002710000000000000000000000000000000000000000000000000000000006080e6d70000000000000000000000000000000000000000000000000000000000000011426f7265644170655961636874436c756200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044241594300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000010f2c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000014426f72656420417065205761676d6920436c756200000000000000000000000000000000000000000000000000000000000000000000000000000000000000044241594300000000000000000000000000000000000000000000000000000000

    Details: Insufficient funds for gas * price + value
    Version: viem@2.23.5]
  `)

  await disconnect(config, { connector })
})
