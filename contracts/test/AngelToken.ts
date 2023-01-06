import { ethers } from "hardhat";
import { expect, assert } from "chai";
import { AngelToken, MockedAngelToken } from "../typechain-types";
import { Signer } from "ethers";

async function assertFailwithMessage(promise: Promise<any>, expectedMessage: String) {
    try {
        await promise;
        assert.fail("This function should fail, but got success")
    } catch(error) {
        if(error instanceof Error) {
            const isReverted = error.message.search('revert') >= 0 && error.message.search(`${expectedMessage}`) >= 0;
            assert(isReverted, `Unexpected error: ${error}`);
        }
    }
}

describe("AngelToken", function() { 
    let angelToken: AngelToken;
    let mockedAngelToken: MockedAngelToken;
    let accounts: Signer[]; // [0] is owner
    let baseUri = "https://gateway.ipfs.io/ipfs/bafybeib3epzqp3u5p36riiqibf7oprpwmw7psdmbedi3imy3tnwj3y3hne/images/";

    beforeEach(async () => {
        const AngelToken = await ethers.getContractFactory("AngelToken");
        angelToken = await AngelToken.deploy();
        const MockedAngelToken = await ethers.getContractFactory("MockedAngelToken");
        mockedAngelToken = await MockedAngelToken.deploy();
        accounts = await ethers.getSigners();
    })

    describe("Set Base URI", function() {
        it("Should fail if caller is not owner", async function() {
            await assertFailwithMessage(angelToken.connect(accounts[1]).setUriBase(baseUri), 
            "Ownable: caller is not the owner");
        })
        it("Should success if caller is owner", async function() {
            assert(
                await angelToken
                        .connect(accounts[0])
                        .setUriBase(baseUri), "This function should success");
        })
    })

    describe("Mint", function() {
        beforeEach(async () => {
            await angelToken
            .connect(accounts[0])
            .setUriBase(baseUri);
        })
    
        it("Should mint NFT with right token data", async function() {
            const mintTransaction = await angelToken.connect(accounts[1]).mint(accounts[1].getAddress());
            const tokenId = mintTransaction.value;
            const tokenIdByOwner = await angelToken.tokenOfOwnerByIndex(await accounts[1].getAddress(), 0);
            const tokenUri = await angelToken.tokenURI(tokenId);

            assert.equal(tokenId.toString(), tokenIdByOwner.toString(), "Incorrect tokenId");
            assert(tokenUri.search(`${baseUri}${tokenId}`)>=0, "Incorrect tokenURI");

            const reciept = await mintTransaction.wait();
            assert.exists(reciept.events?.find((e)=> e.event === 'MINT'), "Event not generated");
        })

        it("Should revert with the right error if there is no token left", async function() {
            await mockedAngelToken.connect(accounts[0]).mockTotalTokens(1);
            await mockedAngelToken.connect(accounts[1]).mint(accounts[1].getAddress());
            await assertFailwithMessage(mockedAngelToken.connect(accounts[1]).mint(accounts[1].getAddress()), "Ran out of token")
        }) 

    })

    describe("Exchange", function() {
        let toTokenId: any;
        let fromTokenId: any;

        beforeEach(async () => {
            await angelToken.connect(accounts[1]).mint(accounts[1].getAddress());
            await angelToken.connect(accounts[2]).mint(accounts[2].getAddress());
            fromTokenId = await angelToken.tokenOfOwnerByIndex(await accounts[1].getAddress(), 0);
            toTokenId = await angelToken.tokenOfOwnerByIndex(await accounts[2].getAddress(), 0);
            await angelToken.connect(accounts[2]).setExchangeableToken(toTokenId);
        })

        describe("Set exchangeable", function() {
            it("should revert with the right error if token is already exchangable", async function() {
                await assertFailwithMessage(angelToken.connect(accounts[2]).setExchangeableToken(toTokenId), "Already exchangeable.");                
            })
            it("should set right exchangeable state", async function() {
                assert(await angelToken.isExchangeable(toTokenId));             
            })
        })

        describe("Request", function () {
            it("Should revert with the right error if token does not exist", async function() {
                await assertFailwithMessage(angelToken.connect(accounts[3]).requestExchange(3, toTokenId), "Token Id is not valid.");
                await assertFailwithMessage(angelToken.connect(accounts[1]).requestExchange(fromTokenId, 3), "Token Id is not valid.");
                await assertFailwithMessage(angelToken.connect(accounts[1]).requestExchange(3, 4), "Token Id is not valid.");
            })
    
            it("Should revert with the right error if caller is not the owner of 'from' token", async function() {
                await assertFailwithMessage(angelToken.connect(accounts[1]).requestExchange(toTokenId, fromTokenId), "Only token owner can request exchange.");
            })
            
            it("Should revert with the right error if caller already have 'to' token", async function() { 
                await angelToken.connect(accounts[1]).mint(accounts[1].getAddress());
                const fromTokenId2 = await angelToken.tokenOfOwnerByIndex(await accounts[1].getAddress(), 1);
                await assertFailwithMessage(angelToken.connect(accounts[1]).requestExchange(fromTokenId, fromTokenId2), "Sender already has requested token.");
            })

            it("Should revert if caller already called this function", async function() {
                await angelToken.connect(accounts[1]).requestExchange(fromTokenId, toTokenId);
                await assertFailwithMessage(angelToken.connect(accounts[1]).requestExchange(fromTokenId, toTokenId), "Cannot request exchange to the same token twice.");
            })

            it("Should put the offer to the 'exchangeRequested'(mapping type)", async function() {
                const tx = await angelToken.connect(accounts[1]).requestExchange(fromTokenId, toTokenId);
                
                const requestTokenId = await angelToken.exchangeRequested(fromTokenId);
                assert.equal(requestTokenId, toTokenId, "Wrong mapping");

                const reciept = await tx.wait();
                assert.exists(reciept.events?.find((e)=> e.event === 'REQUEST'), "Wrong event")
            })
        })
        describe("Approve & Exchange", function () {
            beforeEach(async () => {
                await angelToken.connect(accounts[1]).requestExchange(fromTokenId, toTokenId);
            })
            it("Should revert with the right error if any of the tokens do not exist", async function() {
                await assertFailwithMessage(angelToken.connect(accounts[3]).approveExchange(3, toTokenId), "Token Id is not valid.");
                await assertFailwithMessage(angelToken.connect(accounts[1]).approveExchange(fromTokenId, 3), "Token Id is not valid.");
                await assertFailwithMessage(angelToken.connect(accounts[1]).approveExchange(3, 4), "Token Id is not valid.");
            })
    
            it("Should revert with the right error if caller is not the owner of 'to' token", async function() {
                await assertFailwithMessage(angelToken.connect(accounts[1]).approveExchange(fromTokenId, toTokenId), "Only token owner can approve exchange.");
            })
    
            it("Should revert if caller is not approved to access 'from' token", async function() {
                await angelToken.connect(accounts[1]).approve(await accounts[3].getAddress(), fromTokenId);
                await assertFailwithMessage(angelToken.connect(accounts[2]).approveExchange(fromTokenId, toTokenId), "Approval rejected by requesting side.");
            })

            it("Sholud exchange 'to' token and 'from' token", async function() {
                const tx = await angelToken.connect(accounts[2]).approveExchange(fromTokenId, toTokenId);

                assert.equal(await angelToken.ownerOf(fromTokenId), await accounts[2].getAddress())
                assert.equal(await angelToken.ownerOf(toTokenId), await accounts[1].getAddress())

                const reciept = await tx.wait();
                assert(reciept.events?.find((e)=> e.event === "EXCHANGE"))

                assert(await angelToken.isExchangeable(toTokenId) == false);
                assert(await angelToken.isExchangeable(fromTokenId) == false);
            })
        })
    })
})
