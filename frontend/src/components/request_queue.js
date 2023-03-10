import React, { useState } from "react";
import Web3 from "web3";
import { ipfsImageHash } from "../contracts";
import { AngelTokenContract } from "../contracts";

function RequestQueue({ tokenId, account, setIsLoading, setShowLoadingText }) {
  const [requestIds, setRequestIds] = useState([]);

  const getRequests = async () => {
    try {
      const tmpArr = await AngelTokenContract.methods.getRequestOfTokenId(tokenId).call();
      setRequestIds(tmpArr);
    }
    catch (error) {
      console.log(error);
    }
  }

  const onClickExchange = async (fromTokenId) => {
    setIsLoading(true);
    try {
      const response = await AngelTokenContract
                              .methods
                              .approveExchange(fromTokenId, tokenId)
                              .send({ from: account })
                              .on('transactionHash', ()=>{setShowLoadingText(true)});
      console.log(response);
    }
    catch (error) {
      console.log(error);
    }

    getRequests();
    setIsLoading(false);
    setShowLoadingText(false);
  }

  useState(() => {
    getRequests();
  }, [])

  return (
    <div className="h-full flex flex-col justify-end ml-8">
      <div className="text-lg mb-2">
        {requestIds.length !== 0 ? "Exchange Requests" : "There is no exchange requests yet."}
      </div>
      {
        requestIds.length !== 0
          ? <div className="h-3/6 w-full flex flex-row items-end gap-8 mb-12">
            {requestIds.map((requestId, i) => {
              return (
                <img
                  key={i}
                  className="h-5/6 rounded-md hover:h-full transition-all duration-300 cursor-pointer"
                  onClick={() => { onClickExchange(requestId[0]) }}
                  src={`https://gateway.pinata.cloud/ipfs/${ipfsImageHash}/images/${requestId[0]}.png`}
                  alt=""
                />
              )
            })}
          </div>
          : <div className="h-12"></div>
      }
    </div>
  );
}

export default RequestQueue;