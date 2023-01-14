import {useState, useEffect, useRef} from "react";
import {ipfsImageHash, AngelTokenContract} from "../../contracts";

function ChooseNFTModal({ setShowModal, toTokenId }) {
  const [tokenOfOwner, setTokenOfOwner] = useState([]);

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



  const onClickImage = async(fromTokenId, toTokenId) => {
    // TODO: healthyKim!!
    try {
      const isDuplicatedRequest = (await AngelTokenContract.methods.exchangeRequested(fromTokenId).call() == toTokenId);
      if(!isDuplicatedRequest) {
        const response = await AngelTokenContract.methods.requestExchange(fromTokenId, toTokenId);
        if(!response.status) {
          console.log(response);
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
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full py-8 flex items-center justify-center" onClick={() => { }}>
      <div className="w-8/12 h-4/6 bg-white drop-shadow-2xl rounded-2xl flex flex-col" ref={modalRef}>
        <p className="p-4 text-center text-xl">Choose to exchange</p>
        <div className="flex-1 h-full flex flex-row gap-8 my-6 mx-4 items-center overflow-x-auto">
          {
            tokenOfOwner.map((token, i) => {
              return (
                !token.exchangeable &&
                <img onClick={()=>{onClickImage(token.tokenId)}} className="h-4/6 rounded-md cursor-pointer" src={`https://gateway.ipfs.io/ipfs/${ipfsImageHash}/images/${token.tokenId}.png`} />
              );
            })
          }
        </div>
      </div>
    </div>
  );
}