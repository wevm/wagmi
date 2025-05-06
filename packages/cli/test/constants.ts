import { parseAbi } from 'viem'

export const wagmiAbi = parseAbi([
  'constructor()',
  'event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)',
  'event ApprovalForAll(address indexed owner, address indexed operator, bool approved)',
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
  'function approve(address to, uint256 tokenId)',
  'function balanceOf(address owner) view returns (uint256)',
  'function getApproved(uint256 tokenId) view returns (address)',
  'function isApprovedForAll(address owner, address operator) view returns (bool)',
  'function mint()',
  'function name() view returns (string)',
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function safeTransferFrom(address from, address to, uint256 tokenId)',
  'function safeTransferFrom(address from, address to, uint256 tokenId, bytes _data)',
  'function setApprovalForAll(address operator, bool approved)',
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
  'function symbol() view returns (string)',
  'function tokenURI(uint256 tokenId) pure returns (string)',
  'function totalSupply() view returns (uint256)',
  'function transferFrom(address from, address to, uint256 tokenId)',
])

export const depositAbi = parseAbi([
  'constructor()',
  'event DepositEvent(bytes pubkey, bytes withdrawal_credentials, bytes amount, bytes signature, bytes index)',
  'function deposit(bytes pubkey, bytes withdrawal_credentials, bytes signature, bytes32 deposit_data_root) payable',
  'function get_deposit_count() view returns (bytes)',
  'function get_deposit_root() view returns (bytes32)',
  'function supportsInterface(bytes4 interfaceId) pure returns (bool)',
])
