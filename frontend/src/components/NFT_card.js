import React from "react";
import { ipfsImageHash } from "../contracts"
import { AngelTokenContract } from "../contracts";

function NFTCard({tokenId, isExchangeable, metadata, account}) {


  const onClickSetExchange = async (tokenId) => {
    try {
      await AngelTokenContract.methods.setExchangeableToken(tokenId).send({ from: account });
    }
    catch (error) {
      console.log(error)
    }
  }

  const onClickReSetExchange = async (tokenId) => {
    try {
      await AngelTokenContract.methods.resetExchangeableToken(tokenId).send({ from: account });
    }
    catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <img className="w-full rounded-t-2xl" src={`https://gateway.ipfs.io/ipfs/${ipfsImageHash}/images/${tokenId}.png`} />
      {!isExchangeable
        ? <button onClick={() => { onClickSetExchange(tokenId) }} className="bg-gray-300 w-full py-2 rounded-b-2xl">Make Exchangeable</button>
        : <button onClick={() => { onClickReSetExchange(tokenId) }} className="bg-gray-300 w-full py-2 rounded-b-2xl">Make Unexchangeable</button>
      }
    </div>
  )

}

export default NFTCard;