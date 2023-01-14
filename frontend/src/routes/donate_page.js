import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AngelTokenContract, DonateContract } from "../contracts"
import MintModal from "../components/modal/mint_modal";
import LoadingModal from "../components/modal/loading_modal";
import DonateOnlyModal from "../components/modal/donate_only_modal";

function DonatePage() {
  const [account, setAccount] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [selectedDestinationId, setSelectedDestinationId] = useState(null);
  const [tokenId, setTokenId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showMintModal, setShowMintModal] = useState(false);
  const [showDonateOnlyModal, setShowDonateOnlyModal] = useState(false);

  const [showAlert, setShowAlert] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
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

    /// TODO: Contract Donate
    let newTokenId;
    setIsLoading(true);
    try {
      const response = await DonateContract.methods.donate(selectedDestinationId, isMint).send({ from: account });
      if (response.status) {
        const balanceSize = await AngelTokenContract.methods.balanceOf(account).call();
        newTokenId = await AngelTokenContract.methods.tokenOfOwnerByIndex(account, parseInt(balanceSize.length, 10) - 1).call();
      }
    } catch (error) {
      setIsLoading(false);
      return;
    }
    setIsLoading(false);

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

  return (
    <>
      <div className="px-24 xl:px-48">
        <div className="h-16"></div>
        <div className="flex flex-col items-stretch text-left pt-4 gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-3xl font-bold">How to connect wallet</h3>
            <ol className="flex flex-col gap-4 list-decimal list-outside pl-8 text-lg">
              <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto provident repudiandae saepe aut velit dolore cum reiciendis dolorem, dolorum fugiat eum, explicabo, beatae possimus consequatur obcaecati perspiciatis deleniti suscipit fugit.</li>
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi commodi dolor possimus aliquam dignissimos corporis repudiandae aut, ab ducimus autem deleniti dolorem sapiente iusto asperiores veniam eligendi dolore nobis omnis.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus dicta omnis, mollitia minus, aliquam explicabo saepe veritatis eum eveniet voluptate nesciunt architecto repellendus laborum facilis magnam ducimus ullam animi excepturi?</li>
              <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa earum molestias accusantium error voluptas illum ipsam vel, perspiciatis rem magnam, omnis asperiores enim repudiandae doloribus velit rerum, aperiam nulla maxime consequatur officiis. Aliquid iste repellat distinctio odit. Quibusdam sint, et id minus beatae quia, similique, exercitationem voluptatibus alias officiis suscipit?</li>
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
            <div className="flex gap-8 justify-start mt-4 mb-16">
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
        <LoadingModal></LoadingModal>
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