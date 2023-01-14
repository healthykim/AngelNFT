import {useState, useEffect, useRef} from "react";
import {ipfsImageHash, AngelTokenContract} from "../../contracts";

function ChooseNFTModal({ setShowModal }) {
    const [account, setAccount] = useState();
    const [tokenIds, setTokenIds] = useState([]);
  
    const modalRef = useRef(null);
  
    const handleClickOutside = async (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
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
    }, []);
  
    const onImgClick = () => {
      // TODO: healthyKim!!
    }
  
    return (
      <div className="fixed top-0 left-0 w-full h-full py-8 flex items-center justify-center" onClick={() => { }}>
        <div className="w-8/12 h-3/6 2xl:h-2/6 bg-white drop-shadow-2xl rounded-2xl flex flex-col" ref={modalRef}>
          <p className="p-8 text-center text-2xl">Choose to exchange</p>
          <div className="flex-1 h-full flex flex-row gap-8 pb-8 mx-8 items-end overflow-x-auto">
            {
              tokenIds.map((tokenId, i) => {
                console.log(tokenId);
                return (
                  <img key={i} onClick={() => { }} className="h-full rounded-md cursor-pointer" src={`https://gateway.ipfs.io/ipfs/${ipfsImageHash}/images/${tokenId[0]}.png`} />
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }

  export default ChooseNFTModal;