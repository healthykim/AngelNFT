import React, { useState } from "react";
import { ipfsImageHash } from "../contracts"
import { AngelTokenContract } from "../contracts";

function NFTCard({ tokenId, isExchangeable, metadata, account, setIsLoading, setShowLoadingText}) {
  const [exchangeable, setExchangeable] = useState(isExchangeable);

  const onClickSetExchange = async (tokenId) => {
    setIsLoading(true);
    try {
      await AngelTokenContract
            .methods
            .setExchangeableToken(tokenId)
            .send({ from: account })
            .on('transactionHash', ()=>{setShowLoadingText(true)});
      setExchangeable(!exchangeable);
    }
    catch (error) {
      console.log(error)
    }
    setIsLoading(false);
    setShowLoadingText(false);
  }

  const onClickReSetExchange = async (tokenId) => {
    setIsLoading(true);
    try {
      await AngelTokenContract
            .methods
            .resetExchangeableToken(tokenId)
            .send({ from: account })
            .on('transactionHash', ()=>{setShowLoadingText(true)});
      setExchangeable(!exchangeable);
    }
    catch (error) {
      console.log(error)
    }
    setIsLoading(false);
    setShowLoadingText(false);
  }


  return (
    <div className="h-full w-full drop-shadow-2xl border-8 box-border rounded-2xl border-gray-300 overflow-hidden">
      <img className="w-full" src={`https://gateway.pinata.cloud/ipfs/${ipfsImageHash}/images/${tokenId}.png`} alt="" />
      {!exchangeable
        ? <button onClick={() => { onClickSetExchange(tokenId) }} className="bg-gray-300 w-full pt-3 pb-1 px-4">
          <div>Make Exchangeable</div>
        </button>
        : <button onClick={() => { onClickReSetExchange(tokenId) }} className="bg-gray-300 w-full pt-3 pb-1 px-4">
          <div>Make Unexchangeable</div>
        </button>
      }
    </div>
  )

}

export default NFTCard;