import React from "react"
import NFTCard from "../../components/NFT_card";
import RequestQueue from "../../components/request_queue";

function MyRequest({ tokenIds, account }) {
  return (
    <div className="px-8 py-6">
      <p className="text-2xl mb-6 ml-4">Your Exchangeable NFT</p>
      <div className="flex flex-col gap-y-12">
        {tokenIds.length !== 0 ?
          tokenIds.map((tokenId, i) => {
            if(tokenId[2]){
              return (
                <div className="flex flex-row" key={i}>
                    <div>
                      <NFTCard tokenId={tokenId[0]} metadata={tokenId[1]} isExchangeable={tokenId[2]} account={account} textPosi='bottom'/>
                    </div>
                    <RequestQueue tokenId={tokenId[0]} account={account} />
                  </div>
              );
            }
          }) : null
        }
      </div>
    </div >
  )

}

export default MyRequest;