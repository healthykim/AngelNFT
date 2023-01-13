import React, { useEffect } from "react";
import { useState } from 'react';
import NFTCard from "../components/NFT_card";
import RequestQueue from "../components/request_queue";
import { AngelTokenContract } from "../contracts";

function MyRequests() {
    const [account, setAccount] = useState();
    const [tokenIds, setTokenIds] = useState([]);
    
    const getAccount = async () => {
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });
                setAccount(accounts[0]);
            }
            else {
                alert("Install Metamask!");
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const getAccountInfo = async () => {
        try {    
            const balance = await AngelTokenContract.methods.balanceOf(account).call();
            const tmpArr = [];
            for(var i=0; i<balance; i++) {
                const id = await AngelTokenContract.methods.tokenOfOwnerByIndex(account, i).call();
                const exchange = await AngelTokenContract.methods.isExchangeable(id).call();
                tmpArr.push([id, exchange])
            }
            setTokenIds(tmpArr);
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(()=> {
        getAccount();
    }, [])

    useEffect(()=> {
        getAccountInfo();
    }, [account])

    return (
        <div className="p-10">
            <div className="h-16"></div>
            <p>
                your account : {account} <br />
                {tokenIds.length !== 0 && 
                    tokenIds.map((v) => {
                        return (
                            <div className="flexflex-row">
                                {v[1] &&
                                    <>
                                        Your Exchangeable NFT <br />
                                        <NFTCard tokenId={v[0]} metadata={v[1]} isExchangeable={v[2]} account={account} />
                                    </>}
                                <RequestQueue tokenId={v[0]} account={account}/>
                            </div>
                        )
                    })
                }
            </p>        
        </div>
    )

}

export default MyRequests;