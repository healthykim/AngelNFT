import React, { useEffect } from "react";
import { useState } from 'react';
import { AngelTokenContract } from "../../contracts";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import MyRequest from "./my_request";
import MyHistory from "./my_history";
import MyNFT from "./my_nft";
import LoadingModal from "../../components/modal/loading_modal";

///TODO: 페이지 -> 팝업
function MyPage() {
  const [account, setAccount] = useState();
  const [tokenIds, setTokenIds] = useState([]);
  const [tab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();
  const location = useLocation();

  const tabList = ['/my_page/my_nft', '/my_page/exchange_nft', '/my_page/donate_history'];

  useEffect(() => {
    if (location.pathname === '/my_page') {
      navigate(tabList[0], { replace: true });
    } else {
      setTab(tabList.indexOf(location.pathname));
    }
  }, []);

  const onClickTab = (i) => {
    setTab(i);
    navigate(tabList[i], { replace: true });
  }

  const getAccount = async () => {
    try {
      if (window.ethereum) {
        let accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
        let tmpArr = await AngelTokenContract.methods.getTokenDataOfOwner(accounts[0]).call();
        console.log(tmpArr);
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
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
    getAccount();
  }, [isLoading])

  return (
    <div>
      <div className="h-16"></div>
      <div className="px-16 py-4">
        <div className="flex flex-col items-center gap-1 pb-8">
          <h2 className="text-xl font-semibold">Your Account</h2>
          <p>{account}</p>
        </div>
        <div className="border-b-2 border-gray-400 flex flex-row text-lg">
          <button onClick={() => { onClickTab(0) }} className="flex-1 text-center relative mx-8 overflow-hidden">
            <div className={`absolute w-full h-full -z-20 opacity-50 rounded-t-md transition-transform duration-300 bg-ukyellow ${tab === 0 ? 'translate-y-0' : 'translate-y-10'}`}></div>
            <p className="p-1">NFT Wallet</p>
          </button>
          <button onClick={() => { onClickTab(1) }} className="flex-1 text-center relative mx-8 overflow-hidden">
            <div className={`absolute w-full h-full -z-20 opacity-50 rounded-t-md transition-transform duration-300 bg-ukyellow ${tab === 1 ? 'translate-y-0' : 'translate-y-10'}`}></div>
            <p className="p-1">Exchange Request</p>
          </button>
          <button onClick={() => { onClickTab(2) }} className="flex-1 text-center relative mx-8 overflow-hidden">
            <div className={`absolute w-full h-full -z-20 opacity-50 rounded-t-md transition-transform duration-300 bg-ukyellow ${tab === 2 ? 'translate-y-0' : 'translate-y-10'}`}></div>
            <p className="p-1">Donate History</p>
          </button>
        </div>
        <Routes>
          <Route path="my_nft" element={<MyNFT tokenIds={tokenIds} account={account} setIsLoading={setIsLoading}></MyNFT>}></Route>
          <Route path="exchange_nft" element={<MyRequest tokenIds={tokenIds} account={account} setIsLoading={setIsLoading}></MyRequest>}></Route>
          <Route path="donate_history" element={<MyHistory account={account}></MyHistory>}></Route>
        </Routes>
      </div>
      {isLoading && <LoadingModal></LoadingModal>}
    </div>
  );
}

export default MyPage;