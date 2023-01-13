import React, { useEffect } from "react";
import { useState } from 'react';
import NFTCard from "../components/NFT_card";
import { AngelTokenContract } from "../contracts";

///TODO: 페이지 -> 팝업
function MyPage() {
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
                <br />
                {tokenIds.length !== 0 && 
                    tokenIds.map((v) => {
                        return (
                            <NFTCard tokenId={v[0]} isExchangeable={v[1]} account={account} />
                        )
                    })
                }
                <br />
                <br />
                Exchange Request <br />
            </p>        
        </div>
    );
}

export default MyPage;