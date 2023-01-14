import { useState, useEffect } from "react";
import ChooseNFTModal from "../components/modal/choose_nft_modal";
import { AngelTokenContract } from "../contracts";

function Trade() {
  const [account, setAccount] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedTokenId, setSelectedTokenId] = useState();
  const [exchangeableTokens, setExchangeableTokens] = useState([]);

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

  const getExchangeableTokenId = async() => {
    try {
      const tokens = await AngelTokenContract.methods.getExchangeableTokenData().call();
      setExchangeableTokens(tokens);
    }
    catch (error) {
      console.log(error);
    }
  }

  const onClickImage = (tokenId) => {
    try {
      //const isOwnerToken = await AngelTokenContract.methods.ownerOf(tokenId) == account;
    }
    catch (error) {
      console.log(error);
    }
    setShowModal(true);
    setSelectedTokenId(tokenId);

  }

  useEffect(()=>{    
    getAccount();
    getExchangeableTokenId();
  }, [])

  return (
    <div>
      <div>
        <div className="h-16"></div>
        <div className="flex flex-col px-16 2xl:px-32 items-center">
          <div className="text-3xl 2xl:text-5xl pb-8 2xl:pb-12 2xl:pt-4">
            Trade
          </div>
          <div className="grid grid-cols-5 gap-x-10 gap-y-8 2xl:gap-x-20 2xl:gap-y-16 w-full">
            {
              exchangeableTokens.map((token, i)=> {
                return (
                  <img
                  key={i}
                  src={`https://gateway.ipfs.io/ipfs/${ipfsImageHash}/images/${token.tokenId}.png`}
                  className="rounded-lg 2xl:rounded-2xl cursor-pointer w-full"
                  onClick={() => { setShowModal(true); setSelectedTokenId(token.tokenId); console.log(showModal); }}>
                  </img>
                )
              })
            }
          </div>
          <div className="h-32">

          </div>
        </div>
      </div>
      {showModal && <ChooseNFTModal setShowModal={setShowModal} toTokenId={selectedTokenId} />}
    </div>
  );
}

export default Trade;

