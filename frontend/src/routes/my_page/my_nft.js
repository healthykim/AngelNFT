import NFTCard from "../../components/NFT_card";
import {Link} from "react-router-dom";
import { useState } from "react";

function MyNFT({ tokenIds, account, setIsLoading, setShowLoadingText }) {

  if(tokenIds.length === 0){
    return (
      <div>
        <div className="py-8 flex flex-col items-center gap-6">
        <p className="text-center text-3xl">You haven't donated yet!</p>
        <Link to='/donate'>
          <div className="bg-ukblue py-2 px-12 m-auto rounded-xl text-2xl text-ukyellow font-semibold inline-block">
            Donate Now
          </div>
        </Link>
      </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-x-16 gap-y-12 p-8">
        {tokenIds.length !== 0 &&
          tokenIds.map((v, i) => {
            return (
              <NFTCard key={i} tokenId={v[0]} metadata={v[1]} isExchangeable={v[2]} account={account} setIsLoading={setIsLoading} setShowLoadingText={setShowLoadingText} />
            )
          })
        }
      </div>
    </div>
  );
}

export default MyNFT;