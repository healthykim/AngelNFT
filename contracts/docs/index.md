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

### exchangeRequestedAmount

```solidity
mapping(uint16 => uint256) exchangeRequestedAmount
```

### MINT

```solidity
event MINT(address owner, uint256 tokenId)
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
  bool exchangeable;
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
function mint(address sender) external returns (uint16 tokenId)
```

_Mint NFT and Return minted token Id.

Usage 
- AngelTokenContract.methods.mint(`account`).send({ from: `account` })_

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

### getExchangeableTokenData

```solidity
function getExchangeableTokenData() external view returns (struct AngelToken.TokenData[])
```

_Return list of exchangable tokens data

Usage 
- AngelTokenContract.methods.getExchangeableTokenData(`tokenId`).call()_

### getTokenDataOfOwner

```solidity
function getTokenDataOfOwner(address owner) external view returns (struct AngelToken.TokenData[])
```

_Return list of TokenData owned by `owner`

Usage 
- AngelTokenContract.methods.getTokenDataOfOwner(`tokenId`).call()_

### getRequestOfTokenId

```solidity
function getRequestOfTokenId(uint16 tokenId) external view returns (struct AngelToken.TokenData[])
```

### tokenURI

```solidity
function tokenURI(uint256 tokenId) public view returns (string)
```

_See {IERC721Metadata-tokenURI}._

## Donate

Use this contract for donating/managing donation info.

### angelToken

```solidity
contract AngelToken angelToken
```

### DestinationInfo

```solidity
struct DestinationInfo {
  address walletAddress;
  string name;
}
```

### DonateInfo

```solidity
struct DonateInfo {
  string destinationName;
  uint56 timeStamp;
  address donator;
  uint256 amount;
}
```

### destinations

```solidity
struct Donate.DestinationInfo[] destinations
```

Usage
- DonateContract.methods.destinations(`destinationId`).call()

### numOfDonate

```solidity
mapping(address => uint256) numOfDonate
```

### donateInfoList

```solidity
struct Donate.DonateInfo[] donateInfoList
```

Usage
- DonateContract.methods.donateInfoList(`donateId`).call()

### DONATE

```solidity
event DONATE(address from, address to, uint256 amount)
```

### constructor

```solidity
constructor(address angelTokenAddress) public
```

### addDestination

```solidity
function addDestination(address _destination, string name) public
```

_Add destination to destination list.

Usage
- DonateContract.methods.addDestination(`_destination`, `name`).send()

Requirements
- `caller` should be owner(deployer) of `Donate` contract._

### donate

```solidity
function donate(uint256 destinationId, bool isMint) public payable returns (uint16 tokenId)
```

_Donate money to `destinationId` and return NFT tokenId.

Usage
- DonateContract.methods.donate(`destinationId`, `isMint`).send({ from: `account` })

Requirements
- `destinationId` must exist in destinations.
- Return value should be ignored in the case of `isMint` == false._

### getDonateHistory

```solidity
function getDonateHistory(address donator) external view returns (struct Donate.DonateInfo[])
```

_Return donate history by `donator`.

Usage
- DonateContract.methods.getDonateHistory(`donator`).call()_

### getDestinations

```solidity
function getDestinations() external view returns (struct Donate.DestinationInfo[])
```

_Return `destinations` array.

Usage
- DonateContract.methods.getDestinations().call()_

