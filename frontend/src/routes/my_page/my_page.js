import React, { useEffect } from "react";
import { useState } from 'react';
import { AngelTokenContract } from "../../contracts";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import MyRequest from "./my_request";
import MyHistory from "./my_history";
import MyNFT from "./my_nft";

///TODO: 페이지 -> 팝업
function MyPage() {
    const [account, setAccount] = useState();
    const [tokenIds, setTokenIds] = useState([]);
    const [tab, setTab] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();

    const tabList = ['/my_page/my_nft', '/my_page/exchange_nft', '/my_page/donate_history'];

    useEffect(() => {
        if (location.pathname == '/my_page') {
            navigate(tabList[0], { replace: true });
        }
    }, []);

    const onClickTab = (i) => {
        setTab(i);
        navigate(tabList[i], { replace: true });
    }

    const getAccount = async () => {
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });
                setAccount(accounts[0]);
                const tmpArr = await AngelTokenContract.methods.getTokenDataOfOwner(accounts[0]).call();
                setTokenIds(tmpArr);
            }
            else {
                alert("Install Metamask!");
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        getAccount();
    }, [])

    return (
        <div>
            <div className="h-16"></div>
            <div className="px-16 py-4">
                <div className="flex flex-col items-center gap-1 pb-8">
                    <h2 className="text-xl font-semibold">Your Account</h2>
                    <p>{account}</p>
                </div>
                <div className="border-b-2 border-gray-400 flex flex-row text-lg">
                    <button onClick={() => { onClickTab(0) }} className="flex-1 text-center relative mx-8">
                        <div className={`absolute w-full h-full -z-20 opacity-50 ${tab === 0 ? 'bg-ukyellow' : ''}`}></div>
                        <p className="p-1">my NFT</p>
                    </button>
                    <button onClick={() => { onClickTab(1) }} className="flex-1 text-center relative mx-8">
                        <div className={`absolute w-full h-full -z-20 opacity-50 ${tab === 1 ? 'bg-ukyellow' : ''}`}></div>
                        <p className="p-1">change NFT</p>
                    </button>
                    <button onClick={() => { onClickTab(2) }} className="flex-1 text-center relative mx-8">
                        <div className={`absolute w-full h-full -z-20 opacity-50 ${tab === 2 ? 'bg-ukyellow' : ''}`}></div>
                        <p className="p-1">History</p>
                    </button>
                </div>
                <Routes>
                    <Route path="my_nft" element={<MyNFT tokenIds={tokenIds} account={account}></MyNFT>}></Route>
                    <Route path="exchange_nft" element={<MyRequest tokenIds={tokenIds} account={account}></MyRequest>}></Route>
                    <Route path="donate_history" element={<MyHistory account={account}></MyHistory>}></Route>
                </Routes>
            </div>
        </div>
    );
}

export default MyPage;