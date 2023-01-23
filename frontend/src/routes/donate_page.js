import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { web3, AngelTokenContract, DonateContract } from "../contracts"
import MintModal from "../components/modal/mint_modal";
import LoadingModal from "../components/modal/loading_modal";
import DonateOnlyModal from "../components/modal/donate_only_modal";

function DonatePage() {
  const [account, setAccount] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [selectedDestinationId, setSelectedDestinationId] = useState(null);
  const [tokenId, setTokenId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingText, setShowLoadingText] = useState(false);

  const [showMintModal, setShowMintModal] = useState(false);
  const [showDonateOnlyModal, setShowDonateOnlyModal] = useState(false);

  const [showAlert, setShowAlert] = useState("");
  const [toast, setToast] = useState("");

  const [ETH, setETH] = useState("");

  useEffect(() => {
    if(window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
    
    getAccount();
    getDestinations();
  }, []);

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

  const getDestinations = async () => {
    try {
      let destinations = await DonateContract.methods.getDestinations().call();
      setDestinations(destinations);
    } catch (error) {
      console.error(error);
    }
  }

  const onClickDonate = async (isMint) => {
    if (!account) {
      setShowAlert("Connect Metamask Wallet!");
      return;
    }
    if (selectedDestinationId === null) {
      setShowAlert("Select Destination!");
      return;
    }
    let floatRegex = /^(\d+\.\d+|\d+)$/;
    if(!floatRegex.test(ETH) || parseFloat(ETH) === 0){
      // 혹시나 소수점 자리 제한이 있다면 위에 floatRegex를 적절하게 바꾸면 됩니다....
      // 그리고 다른 Alert를 띄우시면 될 듯.
      // 지금은 1.45 이나 1231과 같은 정규식입니다.
      setShowAlert("Check your input ETH");
      return;
    }
    /// TODO: Contract Donate
    let newTokenId = '0';
    setIsLoading(true);
    try {
      const response = await DonateContract
                              .methods.donate(selectedDestinationId, isMint)
                              .send({ from: account, value: web3.utils.toWei(`${parseFloat(ETH)}`, "ether") })
                              .on('transactionHash', ()=>{setShowLoadingText(true)});
      if(response.status && isMint) {
        const balanceSize = await AngelTokenContract.methods.balanceOf(account).call();
        newTokenId = await AngelTokenContract.methods.tokenOfOwnerByIndex(account, parseInt(balanceSize, 10) - 1).call();
        console.log(newTokenId);
      }
    } catch (error) {
      return;
    }
    setIsLoading(false);
    setShowLoadingText(false);

    if (!isMint) {
      setShowDonateOnlyModal(true);
      return;
    }

    // TODO: isMint랑 성공유무에 따라서 보여주는 Modal 분기
    setTokenId(newTokenId);
    setShowMintModal(true);
    return;
  }

  useLayoutEffect(() => {
    setToast("-top-20");
  }, [showAlert]);

  useEffect(() => {
    setToast("top-12");
    const timer = setTimeout(() => {
      setToast("-top-20");
      setTimeout(() => {
        setShowAlert("");
      }, 600);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showAlert])

  const onETHChange = (e) => {
    let result = e.target.value.replace(/[^0-9.]/g, "");
    setETH(result);
  };

  return (
    <>
      <div className="px-24 xl:px-48">
        <div className="h-16"></div>
        <div className="flex flex-col items-stretch text-left pt-4 gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-3xl font-bold">How To Donate</h3>
            <ol className="flex flex-col gap-4 list-decimal list-outside pl-8 text-lg">
              <li>Connect your Metamask wallet to this website.</li>
              <li>Select one of the donation destinations. (Currently only one destination is available. We are looking for more!)</li>
              <li>Input the amount of money you want to donate. (It should be more than zero)</li>
              <li>If you want to mint the NFT as a donation certification, click "Donate with mint”. (In this case, additional gas fee may be charged). If not, click "Donate only".</li>
              <li>Wait for the donation to complete. (Depending on network condition, it may take up to 15 seconds).</li>
              <li>When the donation is complete, you can check your donation history on MyPage.</li>
            </ol>
          </div>
          <div className="border-b-2"></div>
          <div className="flex flex-col gap-4">
            <h4 className="text-2xl font-bold">Select Destination</h4>
            <form onChange={(e) => { setSelectedDestinationId(e.target.id) }} className="flex flex-col gap-2">
              {
                destinations.map((destination, id) => {
                  return (
                    <div className="flex items-center pl-2" key={id}>
                      <input type="radio" id={id} name="destination" className="appearance-none w-4 h-4 border-2 border-ukblue-darken checked:bg-ukblue" />
                      <label htmlFor={id} className="pl-2 text-lg">{destination.name}</label>
                    </div>
                  );
                })
              }
            </form>
            <div className="flex flex-row items-center">
              <input 
                type="text" 
                value={ETH} 
                onChange={onETHChange}
                className="border-2 rounded-md text-end pr-1"
              />
              <p className="pl-1">ETH</p>
            </div>
            <div className="flex gap-8 justify-start mt-2 mb-16">
              <button onClick={() => { onClickDonate(true) }} className="cursor-pointer bg-gray-300 px-4 py-2 rounded-lg">
                Donate with Mint
              </button>
              <button onClick={() => { onClickDonate(false) }} className="cursor-pointer bg-gray-300 px-4 py-2 rounded-lg">
                Donate Only
              </button>
            </div>
          </div>
        </div>
      </div>
      {
        isLoading &&
        <LoadingModal showLoadingText={showLoadingText}></LoadingModal>
      }

      {
        showAlert !== "" &&
        <div className={`fixed font-medium duration-500 text-center left-0 right-0 ${showAlert && toast}`}>
          <div className="bg-red-300 inline-block py-4 px-24 rounded-2xl">{showAlert}</div>
        </div>
      }

      {
        showMintModal &&
        <MintModal setShowMintModal={setShowMintModal} tokenId={tokenId}></MintModal>
      }

      {
        showDonateOnlyModal &&
        <DonateOnlyModal setShowDonateOnlyModal={setShowDonateOnlyModal}></DonateOnlyModal>
      }
    </>
  );
}

export default DonatePage;