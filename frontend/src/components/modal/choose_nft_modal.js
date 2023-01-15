import {useState, useEffect, useRef} from "react";
import {ipfsImageHash, AngelTokenContract} from "../../contracts";

function ChooseNFTModal({ setShowModal, toTokenId, account, setIsLoading }) {
  const [tokenOfOwner, setTokenOfOwner] = useState([]);

  const modalRef = useRef(null);

  const handleClickOutside = async (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  const getAccount = async () => {
    try {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            const tmpArr = await AngelTokenContract.methods.getTokenDataOfOwner(accounts[0]).call();
            setTokenOfOwner(tmpArr);
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const onClickImage = async(fromTokenId) => {
    // TODO: healthyKim!!
    try {
      setIsLoading(true)
      const isDuplicatedRequest = (await AngelTokenContract.methods.exchangeRequested(fromTokenId).call() === toTokenId);
      if(!isDuplicatedRequest) {
        const response = await AngelTokenContract.methods.requestExchange(fromTokenId, toTokenId).send({from: account});
        if(!response.status) {
          alert("Invalid operation");
        }
      }
      else {
        alert("Already requested");
      }
    }
    catch (error) {
        console.error(error);
    }
    setIsLoading(false)
    setShowModal(false)
  }

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full py-8 flex items-center justify-center" onClick={() => { }}>
      <div className="w-8/12 h-4/6 bg-white drop-shadow-2xl rounded-2xl flex flex-col" ref={modalRef}>
        <p className="p-4 text-center text-xl">Choose to exchange</p>
        <div className="flex-1 h-full flex flex-row gap-8 my-6 mx-4 items-center overflow-x-auto">
          {
            tokenOfOwner.map((token, i) => {
              return (
                !token.exchangeable &&
                <img key={i} onClick={()=>{onClickImage(token.tokenId)}} className="h-4/6 rounded-md cursor-pointer" src={`https://gateway.ipfs.io/ipfs/${ipfsImageHash}/images/${token.tokenId}.png`} />
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default ChooseNFTModal;