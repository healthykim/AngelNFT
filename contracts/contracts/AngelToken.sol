// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title NFT minting & managing contract(ERC721 compliant)
/// @author AngelKim
/// @notice Use this contract for minting/managing NFT.
contract AngelToken is ERC721Enumerable, Ownable {
    
    constructor() ERC721("InternetAngel", "IA") {}
    uint16 constant totalTokens = 600;
    string metadataBaseUri = "https://gateway.ipfs.io/ipfs/bafybeiczuoy2mwlkyk67ru4jmm2hike4vevvl3k56isdzhkwyhweglygpi/metadata/";

    /** 
     * Usage
     * - AngelTokenContract.methods.exchangeRequested(`tokenId`).call()
     */
    mapping(uint16=>uint16) public exchangeRequested; //from TokenId -> to TokenId
    /** 
     * Usage
     * - AngelTokenContract.methods.exchangeable(`tokenId`).call()
     */
    mapping(uint16=>bool) public exchangeable; //TokenId -> bool(true: exchangeable, false: not)
    uint16 exchangeableTokenAmount = 0;
    mapping(uint16=>uint256) public exchangeRequestedAmount; //from TokenId -> to TokenId

    event MINT(address owner, uint256 tokenId);
    event REQUEST(address toOwner, address fromOwner, uint16 toTokenId, uint16 fromTokenId);
    event EXCHANGE(address toOwner, address fromOwner, uint16 toTokenId, uint16 fromTokenId);

    struct TokenData {
        uint16 tokenId;
        string uri;
        bool exchangeable;
    }

    /** 
     * @dev Set base uri of ipfs database as `_metadataBaseUri`
     *
     * Usage
     * - AngelTokenContract.methods.setUriBase('YOUR_BASE_URI').send()
     *
     * Requirements
     * - Caller should be owner(deployer) of this contract
     *
     * @param _metadataBaseUri path where the NFT images/metadatas are located
     */
    function setUriBase(string calldata _metadataBaseUri) external onlyOwner {
        metadataBaseUri = _metadataBaseUri;
    }

    ///TODO : make this random
    function getNextTokenId() internal view returns(uint16) {
        return uint16(totalSupply()+1);
    }


    /** 
     * @dev Mint NFT and Return minted token Id.
     *
     * Usage 
     * - AngelTokenContract.methods.mint(`account`).send({ from: `account` })
     */
    function mint(address sender) external returns(uint16 tokenId) {
        require(totalSupply()<totalTokens, "Ran out of token");
        tokenId = getNextTokenId();
        //string memory metadataUri = string(abi.encodePacked(metadataBaseUri, Strings.toString(tokenId), ".json"));
        _safeMint(sender, tokenId);
        //_setTokenURI(tokenId, metadataUri);
        emit MINT(sender, tokenId);
    }


    /**
     * @dev Set NFT with given `tokenId` as exchangeable.
     * 
     * Usage
     * - AngelTokenContract.methods.setExchangeableToken(`tokenId`).send({ from: `account` })
     *
     * Requirements
     * - `tokenId` must exist.
     * - Caller should be owner of NFT with given `tokenId`.
     * - Cannot call this function with already exchangeable `tokenId`.
     * 
     */
    function setExchangeableToken(uint16 tokenId) external {
        require(_exists(tokenId), "Token Id is not valid.");
        require(ownerOf(tokenId)==msg.sender, "Only owner of the token can exchange the token.");
        require(exchangeable[tokenId]==false, "Already exchangeable.");
        exchangeable[tokenId]=true;
        exchangeableTokenAmount++; //TODO: Counter?
    }

    /**
     * @dev Set NFT with given `tokenId` as non-exchangeable.
     * 
     * Usage
     * - AngelTokenContract.methods.resetExchangeableToken(`tokenId`).send({ from: `account` })
     *
     * Requirements
     * - `tokenId` must exist.
     * - Caller should be owner of NFT with given `tokenId`.
     * - Cannot call this function with already exchangeable `tokenId`.
     * 
     */
    function resetExchangeableToken(uint16 tokenId) public {
        require(_exists(tokenId), "Token Id is not valid.");
        require(ownerOf(tokenId)==msg.sender, "Only owner of the token can exchange the token.");
        ///이 부분은 내부 호출해도 내부 호출 함수의 sender가 tokenID owner이면 상관없는 건지?
        require(exchangeable[tokenId]==true, "Already not exchangeable.");
        exchangeable[tokenId]=false;
        exchangeRequestedAmount[tokenId]=0;
        exchangeableTokenAmount--; //TODO: Counter?
    }

    /**
     * @dev Return `true` if NFT with given `tokenId` is exchangeable.
     * 
     * Usage 
     * - AngelTokenContract.methods.isExchangeable(`tokenId`).call()
     */
    function isExchangeable(uint tokenId) external view returns(bool) {
        for(uint16 i = 1; i<=totalSupply(); i++) {
            if(exchangeable[i] && i == tokenId) return true;
        }
        return false;
    }

    /**
     * @dev Put `from` tokenId in the exchange request queue of `to` tokenId.
     * 
     * Usage 
     * - AngelTokenContract.methods.requestExchange(`from`, `to`).send({ from: `account` })
     *
     * Requirements
     * - Both of `from` tokenId and `to` tokenId must exist.
     * - Caller should be owner of NFT with given `from` tokenId.
     * - Caller should not be owner of NFT with given `to` tokenId.
     * - Cannot call this function with already requested `from` tokenId and `to` tokenId.
     * - `to` tokenId must be exchangeable.
     */
    function requestExchange(uint16 from, uint16 to) public {
        require(_exists(to)&&_exists(from), "Token Id is not valid.");

        address fromOwner = ownerOf(from); 
        address toOwner = ownerOf(to);
        require(fromOwner == msg.sender, "Only token owner can request exchange.");
        require(toOwner != msg.sender, "Sender already has requested token.");
        require(exchangeRequested[from]!=to, "Cannot request exchange to the same token twice.");
        require(exchangeable[to], "To token is Not Exchangeable.");
        require(!exchangeable[from], "From token is Exchangeable.");

        exchangeRequested[from] = to;
        exchangeRequestedAmount[to] += 1;
        approve(toOwner, from);
        emit REQUEST(toOwner, fromOwner, to, from);
    }

    /**
     * @dev Approve and execute exchange of `from` tokendId and `to` tokenId.
     * 
     * Usage 
     * - AngelTokenContract.methods.approveExchange(`from`, `to`).send({ from: `account` })
     *
     * Requirements
     * - Both of `from` tokenId and `to` tokenId must exist.
     * - Caller should be owner of NFT with given `to` tokenId.
     * - `from` tokenId should have requested an exchange with `to` tokenId.
     * - `to` tokenId must be exchangeable.
     */
    function approveExchange(uint16 from, uint16 to) public {
        require(_exists(to)&&_exists(from), "Token Id is not valid.");

        address fromOwner = ownerOf(from); 
        address toOwner = ownerOf(to);
        require(toOwner==msg.sender, "Only token owner can approve exchange.");
        require(exchangeRequested[from]==to, "Cannot approve token which did'nt request exchange.");
        require(_isApprovedOrOwner(toOwner, from), "Approval rejected by requesting side.");
        require(exchangeable[to], "To token is Not Exchangeable.");

        resetExchangeableToken(to);

        approve(fromOwner, to);
        safeTransferFrom(fromOwner, toOwner, from);
        safeTransferFrom(toOwner, fromOwner, to);

        emit EXCHANGE(toOwner, fromOwner, to, from);
    }
    
    /**
     * @dev Return list of exchangable tokens data
     * 
     * Usage 
     * - AngelTokenContract.methods.getExchangeableTokenData(`tokenId`).call()
     */
    function getExchangeableTokenData() external view returns(TokenData[] memory) {
        TokenData[] memory data = new TokenData[](exchangeableTokenAmount);

        uint16 counter = 0;
        for(uint16 i = 1; i<=totalSupply(); i++) {
            if(exchangeable[i]) {
                data[counter].tokenId = i;
                data[counter].uri = tokenURI(i);
                counter++;
            }
            if(counter > exchangeableTokenAmount) break;
        }
        return data;
    }

    /**
     * @dev Return list of TokenData owned by `owner`
     * 
     * Usage 
     * - AngelTokenContract.methods.getTokenDataOfOwner(`tokenId`).call()
     */
    function getTokenDataOfOwner(address owner) external view returns(TokenData[] memory){
        TokenData[] memory data = new TokenData[](balanceOf(owner));

        for(uint i=0; i<balanceOf(owner); i++) {
            data[i].tokenId = uint16(tokenOfOwnerByIndex(owner, i));
            data[i].uri = tokenURI(data[i].tokenId);
            data[i].exchangeable = exchangeable[data[i].tokenId];
        }

        return data;
    }

    function getRequestOfTokenId(uint16 tokenId) external view returns(TokenData[] memory) {
        TokenData[] memory data = new TokenData[](exchangeRequestedAmount[tokenId]);

        uint16 counter = 0;
        for(uint16 i=1; i<=totalSupply(); i++) {
            if(exchangeRequested[i] == tokenId) {
                data[counter].tokenId = i;
                data[counter].uri = tokenURI(data[counter].tokenId);
                data[counter].exchangeable = exchangeable[data[counter].tokenId];
                counter ++;
            }
            if(counter > exchangeRequestedAmount[tokenId]) break;
        }

        return data;
    }

    //----------------------------------Overide functions----------------------------------//
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseURI = metadataBaseUri;
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(metadataBaseUri, Strings.toString(tokenId), ".json")) : "";
    }
    //-------------------------------------------------------------------------------------//
}