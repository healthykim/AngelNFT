import React, { useState } from "react";
import { ipfsImageHash } from "../contracts"
import { AngelTokenContract } from "../contracts";

function NFTCard({ tokenId, isExchangeable, metadata, account, textPosi = "top" }) {
  const [exchangeable, setExchangeable] = useState(isExchangeable);

  const onClickSetExchange = async (tokenId) => {
    try {
      await AngelTokenContract.methods.setExchangeableToken(tokenId).send({ from: account });
      setExchangeable(true);
    }
    catch (error) {
      console.log(error)
    }
  }

  const onClickReSetExchange = async (tokenId) => {
    try {
      await AngelTokenContract.methods.resetExchangeableToken(tokenId).send({ from: account });
      setExchangeable(false);
    }
    catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <img className="w-full rounded-t-2xl" src={`https://gateway.ipfs.io/ipfs/${ipfsImageHash}/images/${tokenId}.png`} />
      {!exchangeable
        ? <button onClick={() => { onClickSetExchange(tokenId) }} className="bg-gray-300 w-full py-2 rounded-b-2xl px-4">Make Exchangeable</button>
        : <button onClick={() => { onClickReSetExchange(tokenId) }} className="bg-gray-300 w-full py-2 rounded-b-2xl px-4">Make Unexchangeable</button>
      }
    </div>
  )

}

export default NFTCard;