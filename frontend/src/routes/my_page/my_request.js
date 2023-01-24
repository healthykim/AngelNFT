import React from "react"
import NFTCard from "../../components/NFT_card";
import RequestQueue from "../../components/request_queue";
import { Link } from "react-router-dom";

function MyRequest({ tokenIds, account, setIsLoading, onClickTab0, setShowLoadingText }) {

  if (tokenIds.length === 0) {
    return (
      <div className="flex flex-col items-center px-12 py-6">
        <p className="text-2xl mb-2">There is no exchangeable NFT!</p>
        <p className="text-md">Please click <span onClick={onClickTab0} className="text-xl cursor-pointer">NFT Wallet</span> to make your NFT exchangeable.</p>
      </div>
    );
  }

  return (
    <div className="px-8 py-6">
      <p className="text-2xl mb-6 ml-4">Your Exchangeable NFT</p>
      <div className="flex flex-col gap-y-12">
        {
          tokenIds.map((tokenId, i) => {
            if (tokenId[2]) {
              return (
                <div className="flex flex-row h-[296px]" key={i}>
                  <div className="h-full flex-none w-64">
                    <NFTCard tokenId={tokenId[0]} metadata={tokenId[1]} isExchangeable={tokenId[2]} account={account} textPosi='bottom' setIsLoading={setIsLoading} setShowLoadingText={setShowLoadingText} />
                  </div>
                  <div className="h-full flex-1">
                    <RequestQueue tokenId={tokenId[0]} account={account} setIsLoading={setIsLoading} setShowLoadingText={setShowLoadingText} />
                  </div>
                </div>
              );
            }
          })
        }
      </div>
    </div >
  )

}

export default MyRequest;