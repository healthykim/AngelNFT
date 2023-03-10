import React, { useEffect } from "react";
import { useState } from 'react';
import { AngelTokenContract, DonateContract, web3 } from "../../contracts";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import MyRequest from "./my_request";
import MyHistory from "./my_history";
import MyNFT from "./my_nft";
import LoadingModal from "../../components/modal/loading_modal";

///TODO: 페이지 -> 팝업
function MyPage() {
  const [account, setAccount] = useState('Loading...');
  const [tokenIds, setTokenIds] = useState([]);
  const [donateHistories, setDoateHistories] = useState([]);
  const [tab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingText, setShowLoadingText] = useState(false);


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
    setIsLoading(true);
    try {
      if (window.ethereum) {
        //get account
        let accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);

        //get token Id
        let tmpIds = await AngelTokenContract.methods.getTokenDataOfOwner(accounts[0]).call();
        setTokenIds(tmpIds);

        //get history
        let histories = await DonateContract.methods.getDonateHistory(accounts[0]).call();
        let tmpHistories = histories.map((history) => {
          let time = new Date(history.timeStamp * 1000);
          let dateString = time.toISOString().slice(0, 10);
          let formattedDate = dateString.replace(/-/g, ".");
          return ({ timeStamp: formattedDate, amount: web3.utils.fromWei(history.amount, "ether") + " ETH", destinationId: history.destinationName });
        });
        tmpHistories.reverse();
        setDoateHistories(tmpHistories);
      }
      else {
        alert("Install Metamask!");
      }
    }
    catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
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
          <button onClick={() => { onClickTab(0) }} className="flex-1 text-center relative mx-8 overflow-hidden">
            <div className={`absolute top-0 w-full h-full opacity-50 rounded-t-md transition-transform duration-300 bg-ukyellow ${tab === 0 ? 'translate-y-0' : 'translate-y-9'}`}></div>
            <p className="absolute top-0 left-0 text-center w-full py-2">NFT Wallet</p>
            <p className="py-2 invisible">NFT Wallet</p>
          </button>
          <button onClick={() => { onClickTab(1) }} className="flex-1 text-center relative mx-8 overflow-hidden">
          <div className={`absolute top-0 w-full h-full opacity-50 rounded-t-md transition-transform duration-300 bg-ukyellow ${tab === 1 ? 'translate-y-0' : 'translate-y-9'}`}></div>
            <p className="absolute top-0 left-0 text-center w-full py-2">Exchange Request</p>
            <p className="py-2 invisible">Exchange Request</p>
          </button>
          <button onClick={() => { onClickTab(2) }} className="flex-1 text-center relative mx-8 overflow-hidden">
          <div className={`absolute top-0 w-full h-full opacity-50 rounded-t-md transition-transform duration-300 bg-ukyellow ${tab === 2 ? 'translate-y-0' : 'translate-y-9'}`}></div>
            <p className="absolute top-0 left-0 text-center w-full py-2">Donate History</p>
            <p className="py-2 invisible">Donate History</p>
          </button>
        </div>
        { !isLoading &&
          <Routes>
            <Route path="my_nft" element={<MyNFT tokenIds={tokenIds} account={account} setIsLoading={setIsLoading} setShowLoadingText={setShowLoadingText}></MyNFT>}></Route>
            <Route path="exchange_nft" element={<MyRequest tokenIds={tokenIds} account={account} setIsLoading={setIsLoading} setShowLoadingText={setShowLoadingText} onClickTab0={()=>{onClickTab(0)}}></MyRequest>}></Route>
            <Route path="donate_history" element={<MyHistory donateHistories={donateHistories}></MyHistory>}></Route>
          </Routes>
        }
      </div>
      {isLoading && <LoadingModal showLoadingText={showLoadingText}></LoadingModal>}
    </div>
  );
}

export default MyPage;