import React from "react";
import { ipfsImageHash } from "../contracts"
import { AngelTokenContract } from "../contracts";

function NFTCard({tokenId, isExchangeable, account}) {


    const onClickSetExchange = async (tokenId) => {
        try {
            await AngelTokenContract.methods.setExchangeableToken(tokenId).send({from: account});
        }
        catch(error) {
            console.log(error)
        }
    }

    const onClickReSetExchange = async (tokenId) => {
        try {
            await AngelTokenContract.methods.resetExchangeableToken(tokenId).send({from: account});
        }
        catch(error) {
            console.log(error)
        }
    }

    
    return (
        <>
            <img className="w-2/12" src={`https://gateway.ipfs.io/ipfs/${ipfsImageHash}/images/${tokenId}.PNG`}/>
            {!isExchangeable ? <button onClick={() => {onClickSetExchange(tokenId)}} className="mt-3 bg-gray-300 px-4 py-2 rounded-lg">Make Exchangeable</button>
            : <button onClick={() => {onClickReSetExchange(tokenId)}} className="mt-3 bg-gray-300 px-4 py-2 rounded-lg">Make Unexchangeable</button>}
        </>
    )

}

export default NFTCard;