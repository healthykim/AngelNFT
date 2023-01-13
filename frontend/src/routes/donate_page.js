import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { AngelTokenContract, DonateContract, ipfsImageHash } from "../contracts"


function DonatePage() {
  const [account, setAccount] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [selectedDestinationId, setSelectedDestinationId] = useState(null);
  const [donated, setDonated] = useState(false);
  const [tokenId, setTokenId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
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
      setShowAlert(true);
      return;
    }

    /// TODO: Contract Donate
    let newTokenId;
    try {
      const response = await DonateContract.methods.donate(selectedDestinationId, isMint).send({ from: account });
      if(response.status) {
        const balanceSize = await AngelTokenContract.methods.balanceOf(account).call();
        newTokenId = await AngelTokenContract.methods.tokenOfOwnerByIndex(account, parseInt(balanceSize.length, 10) - 1).call();
      }
    } catch (error) {
      console.error(error);
    }
    if (!isMint && newTokenId === '0') {
      return;
    }
    console.log(newTokenId);
    setTokenId(newTokenId);
    setShowModal(true);
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
        setShowAlert(false);
      }, 600);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showAlert])

  return (
    <>
      {showModal && (
        <MintModal setShowModal={setShowModal} tokenId={tokenId}></MintModal>
      )}
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

      {showAlert ? (
        <div className={`fixed font-medium duration-500 text-center left-0 right-0 ${showAlert && toast}`}>
          <div className="bg-red-300 inline-block py-4 px-24 rounded-2xl">Connect Metamask Wallet!</div>
        </div>
      ) : null}
    </>
  );
}

function MintModal({ setShowModal, tokenId }) {
  const modalRef = useRef(null);
  const imgRef = useRef(null);
  const [modalFade, setModalFade] = useState("opacity-0");
  const [heroStyle, setHeroStyle] = useState({});
  const [modalHero, setModalHero] = useState(false);
  let isAnimating = false;

  const handleClickOutside = async (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target) && !isAnimating) {
      isAnimating = true;
      const modalRect = modalRef.current.getBoundingClientRect();
      const imgRect = imgRef.current.getBoundingClientRect();
      const scaleFactor = 40 / imgRect.height;

      let style = {
        transform: `matrix(${scaleFactor}, 0, 0, ${scaleFactor}, 
          ${(-modalRect.x + window.innerWidth - 88) - modalRect.width / 2 + 20}, 
          ${(-modalRect.y + 3 * 4) - modalRect.height / 2 + 20}
          )`,
        opacity: 0.7,
        borderRadius: '999px',
        transition: "transform 1s, opacity 1s, border-radius 1s",
        backgroundColor: 'transparent',
      };
      setHeroStyle(style);
      setModalHero(true);
      setTimeout(() => {
        isAnimating = false;
        setShowModal(false);
      }, 1200);
    }
  };

  useEffect(() => {
    setModalFade("opacity-100")
    isAnimating = true;
    setTimeout(()=>{
      isAnimating = false;
    }, 500);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full py-8 flex items-center justify-center" onClick={() => { }}>
      <div style={heroStyle} ref={modalRef}
        className={`relative flex flex-col text-center items-center rounded-2xl duration-500 ${modalFade} bg-white drop-shadow-2xl`}
      >
        <div className="flex-none modal">
          <div className="flex items-center pt-4 pb-2">
            <h1 className="text-lg flex-none font-medium  text-center">{!modalHero && 'Your mint'}</h1>
          </div>
        </div>
        <div className={`p-2 overflow-clip duration-1000 transition-all ease-out`} style={modalHero ? { borderRadius:imgRef.current.getBoundingClientRect().width / 2, width: `${window.innerHeight * 0.6}px` } : { width: `${window.innerHeight * 0.6}px` }}>
          <img className="h-full object-contain rounded-lg" src={`https://gateway.ipfs.io/ipfs/${ipfsImageHash}/images/${tokenId}.png`} alt={'mint image'} ref={imgRef}></img>
        </div>
      </div>
    </div>
  );
}

export default DonatePage;