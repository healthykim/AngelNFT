import React, { useState } from "react";
import Web3 from "web3";
import { ipfsImageHash } from "../contracts";
import { AngelTokenContract } from "../contracts";

function RequestQueue({tokenId, account}) {
    const [requestIds, setRequestIds] = useState([]);

    const getRequests = async() => {
        try {
            const tmpArr = await AngelTokenContract.methods.getRequestOfTokenId(tokenId).call();
            setRequestIds(tmpArr);
        }
        catch (error) {
            console.log(error);
        }
    }

    const onClickExchange = async(fromTokenId) => {
        try {
            await AngelTokenContract.methods.approveExchange(fromTokenId, tokenId).send({from: account});
        }
        catch (error) {
            console.log(error);
        }

        getRequests();
    }

    useState(()=> {
        getRequests();
    }, [])

    return (
        <>
            Exchange Requests <br/>
            {requestIds.length !== 0 ?
                <>
                    <div className="flex flex-row">
                        {requestIds.map((v) => {
                            return (
                                <img className="w-1/12 p-2" onClick={()=> {onClickExchange(v[0])}} src={`https://gateway.ipfs.io/ipfs/${ipfsImageHash}/images/${v[0]}.png`}/>
                            )
                        })}
                    </div>
                </>
            : <>Empty</>}
        </>
    );
}

export default RequestQueue;