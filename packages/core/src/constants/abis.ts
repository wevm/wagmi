// https://ethereum.org/en/developers/docs/standards/tokens/erc-20
export const erc20ABI = [
  'event Approval(address indexed _owner, address indexed _spender, uint256 _value)',
  'event Transfer(address indexed _from, address indexed _to, uint256 _value)',
  'function allowance(address _owner, address _spender) public view returns (uint256 remaining)',
  'function approve(address _spender, uint256 _value) public returns (bool success)',
  'function balanceOf(address _owner) public view returns (uint256 balance)',
  'function decimals() public view returns (uint8)',
  'function name() public view returns (string)',
  'function symbol() public view returns (string)',
  'function totalSupply() public view returns (uint256)',
  'function transfer(address _to, uint256 _value) public returns (bool success)',
  'function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)',
]

// https://ethereum.org/en/developers/docs/standards/tokens/erc-721
export const erc721ABI = [
  'event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId)',
  'event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved)',
  'event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId)',
  'function approve(address _approved, uint256 _tokenId) external payable',
  'function balanceOf(address _owner) external view returns (uint256)',
  'function getApproved(uint256 _tokenId) external view returns (address)',
  'function isApprovedForAll(address _owner, address _operator) external view returns (bool)',
  'function name() view returns (string memory)',
  'function ownerOf(uint256 _tokenId) external view returns (address)',
  'function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable',
  'function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable',
  'function setApprovalForAll(address _operator, bool _approved) external',
  'function symbol() view returns (string memory)',
  'function tokenByIndex(uint256 _index) view returns (uint256)',
  'function tokenOfOwnerByIndex(address _owner, uint256 _index) view returns (uint256 tokenId)',
  'function tokenURI(uint256 _tokenId) view returns (string memory)',
  'function totalSupply() view returns (uint256)',
  'function transferFrom(address _from, address _to, uint256 _tokenId) external payable',
]
