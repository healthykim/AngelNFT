import { ethers } from "hardhat"
import { assert } from "chai"
import { AngelToken, Donate } from "../typechain-types"
import { Signer } from "ethers"

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

describe("Donate", function() {
    let angelTokenContract: AngelToken;
    let donateContract: Donate;
    let accounts: Signer[];
    let destination = ['0x165CD37b4C644C2921454429E7F9358d18A45e14', 'Ukraine Goverment']

    beforeEach(async () => {
        const AngelToken = await ethers.getContractFactory("AngelToken");
        angelTokenContract = await AngelToken.deploy();
        const DonateContract = await ethers.getContractFactory("Donate");
        donateContract = await DonateContract.deploy(angelTokenContract.address);
        accounts = await ethers.getSigners();
    })

    describe("Add Destination", async function() {
        it("Should revert if caller is not the owner", async function() {
            await assertFailwithMessage(donateContract
                                        .connect(accounts[1])
                                        .addDestination(destination[0], destination[1])
                                        , "Ownable: caller is not the owner");
        })
        it("Should put destination info to array", async function() {
            await donateContract.connect(accounts[0]).addDestination(destination[0], destination[1]);
            const destinationInfo = await donateContract.destinations(0);
            assert.equal(destinationInfo[0], destination[0], "Wrong address");
            assert.equal(destinationInfo[1], destination[1], "Wrong name");
        })
    })

    describe("Make donation", async function() {
        it("Should revert if the destination Id is not valid", async function() {
            await assertFailwithMessage(donateContract.connect(accounts[1]).donate(0, false), "Invalid destination Id");
        })
        it("Should transfer money and mint NFT", async function() {
            await donateContract.connect(accounts[0]).addDestination(accounts[1].getAddress(), '');
            const tx = await donateContract.connect(accounts[2]).donate(0, true);

            const recipt = await tx.wait();
            assert(recipt.events?.find((e)=> e.event === 'DONATE'), "No DONATE event");
        })
    })

    describe("Get donation history", async function() {
        it("Should return right donation history", async function() {
            await donateContract.connect(accounts[0]).addDestination(accounts[1].getAddress(), '');
            await donateContract.connect(accounts[2]).donate(0, false);
            await donateContract.connect(accounts[2]).donate(0, true);
            await donateContract.connect(accounts[2]).donate(0, false);
            const result = await donateContract.getDonateHistory(accounts[2].getAddress());
            
            assert.equal(result.length, 3, "Wrong history length");
            assert.equal(result[0][2], await accounts[2].getAddress(), "Wrong donator");
        })
    })
})