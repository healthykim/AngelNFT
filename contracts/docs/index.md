# Solidity API

## AngelToken

Use this contract for minting/managing NFT.

### constructor

```solidity
constructor() public
```

### totalTokens

```solidity
uint16 totalTokens
```

### metadataBaseUri

```solidity
string metadataBaseUri
```

### exchangeRequested

```solidity
mapping(uint16 => uint16) exchangeRequested
```

Usage
- AngelTokenContract.methods.exchangeRequested(`tokenId`).call()

### exchangeable

```solidity
mapping(uint16 => bool) exchangeable
```

Usage
- AngelTokenContract.methods.exchangeable(`tokenId`).call()

### exchangeableTokenAmount

```solidity
uint16 exchangeableTokenAmount
```

### MINT

```solidity
event MINT(address owner, uint256 tokenId, string uri)
```

### REQUEST

```solidity
event REQUEST(address toOwner, address fromOwner, uint16 toTokenId, uint16 fromTokenId)
```

### EXCHANGE

```solidity
event EXCHANGE(address toOwner, address fromOwner, uint16 toTokenId, uint16 fromTokenId)
```

### TokenData

```solidity
struct TokenData {
  uint16 tokenId;
  string uri;
}
```

### setUriBase

```solidity
function setUriBase(string _metadataBaseUri) external
```

_Set base uri of ipfs database as `_metadataBaseUri`

Usage
- AngelTokenContract.methods.setUriBase('YOUR_BASE_URI').send()

Requirements
- Caller should be owner(deployer) of this contract_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _metadataBaseUri | string | path where the NFT images/metadatas are located |

### getNextTokenId

```solidity
function getNextTokenId() internal view returns (uint16)
```

TODO : make this random

### mint

```solidity
function mint() public returns (uint16 tokenId)
```

_Mint NFT and Return minted token Id.

Usage 
- AngelTokenContract.methods.mint().send({ from: `account` })_

### setExchangeableToken

```solidity
function setExchangeableToken(uint16 tokenId) external
```

_Set NFT with given `tokenId` as exchangeable.

Usage
- AngelTokenContract.methods.setExchangeableToken(`tokenId`).send({ from: `account` })

Requirements
- `tokenId` must exist.
- Caller should be owner of NFT with given `tokenId`.
- Cannot call this function with already exchangeable `tokenId`._

### resetExchangeableToken

```solidity
function resetExchangeableToken(uint16 tokenId) public
```

_Set NFT with given `tokenId` as non-exchangeable.

Usage
- AngelTokenContract.methods.resetExchangeableToken(`tokenId`).send({ from: `account` })

Requirements
- `tokenId` must exist.
- Caller should be owner of NFT with given `tokenId`.
- Cannot call this function with already exchangeable `tokenId`._

### isExchangeable

```solidity
function isExchangeable(uint256 tokenId) external view returns (bool)
```

_Return `true` if NFT with given `tokenId` is exchangeable.

Usage 
- AngelTokenContract.methods.isExchangeable(`tokenId`).call()_

### getExchangeableTokenData

```solidity
function getExchangeableTokenData() external view returns (struct AngelToken.TokenData[])
```

_Return list of exchangable tokens data

Usage 
- AngelTokenContract.methods.getExchangeableTokenData(`tokenId`).call()_

### requestExchange

```solidity
function requestExchange(uint16 from, uint16 to) public
```

_Put `from` tokenId in the exchange request queue of `to` tokenId.

Usage 
- AngelTokenContract.methods.requestExchange(`from`, `to`).send({ from: `account` })

Requirements
- Both of `from` tokenId and `to` tokenId must exist.
- Caller should be owner of NFT with given `from` tokenId.
- Caller should not be owner of NFT with given `to` tokenId.
- Cannot call this function with already requested `from` tokenId and `to` tokenId.
- `to` tokenId must be exchangeable._

### approveExchange

```solidity
function approveExchange(uint16 from, uint16 to) public
```

_Approve and execute exchange of `from` tokendId and `to` tokenId.

Usage 
- AngelTokenContract.methods.approveExchange(`from`, `to`).send({ from: `account` })

Requirements
- Both of `from` tokenId and `to` tokenId must exist.
- Caller should be owner of NFT with given `to` tokenId.
- `from` tokenId should have requested an exchange with `to` tokenId.
- `to` tokenId must be exchangeable._

### getTokenDataOfOwner

```solidity
function getTokenDataOfOwner(address owner) external view returns (struct AngelToken.TokenData[])
```

_Return list of TokenData owned by `owner`

Usage 
- AngelTokenContract.methods.getTokenDataOfOwner(`tokenId`).call()_

### _beforeTokenTransfer

```solidity
function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal
```

_See {@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol}_

### _burn

```solidity
function _burn(uint256 tokenId) internal
```

_See {@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol}_

### tokenURI

```solidity
function tokenURI(uint256 tokenId) public view returns (string)
```

_See {@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol}_

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view returns (bool)
```

_See {@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol}_

## MockedAngelToken

DO NOT use this contract in frontend! Use this only for testing.

### mockTotalTokens

```solidity
function mockTotalTokens(uint16 mockedTokenAmount) public
```

## Lock

### unlockTime

```solidity
uint256 unlockTime
```

### owner

```solidity
address payable owner
```

### Withdrawal

```solidity
event Withdrawal(uint256 amount, uint256 when)
```

### constructor

```solidity
constructor(uint256 _unlockTime) public payable
```

### withdraw

```solidity
function withdraw() public
```

