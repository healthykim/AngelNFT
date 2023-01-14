import React from "react"
import NFTCard from "../../components/NFT_card";
import RequestQueue from "../../components/request_queue";

function MyRequest( {tokenIds, account} ) {

    return (
        <div className="p-10">
            <div className="h-16"></div>
            <p>
                {tokenIds.length !== 0 && 
                    tokenIds.map((v) => {
                        return (
                            <div>
                                {v[2] &&
                                    <>
                                        Your Exchangeable NFT<br />
                                        <NFTCard tokenId={v[0]} metadata={v[1]} isExchangeable={v[2]} account={account} />
                                        <RequestQueue tokenId={v[0]} account={account}/>
                                    </>}
                            </div>
                        )
                    })
                }
            </p>        
        </div>
    )

}

export default MyRequest;