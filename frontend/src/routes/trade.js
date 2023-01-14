import { useEffect, useRef, useState } from "react";
import { AngelTokenContract, ipfsImageHash } from "../contracts";


function Trade() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div>
        <div className="h-16"></div>
        <div className="flex flex-col px-16 2xl:px-32 items-center">
          <div className="text-3xl 2xl:text-5xl pb-8 2xl:pb-12 2xl:pt-4">
            Trade
          </div>
          <div className="grid grid-cols-5 gap-x-10 gap-y-8 2xl:gap-x-20 2xl:gap-y-16">
            {
              Array.from({ length: 44 }).fill(0).map((e, i) => {
                return (
                  <img
                    key={i}
                    src="https://gateway.ipfs.io/ipfs/bafybeigk7nzlkdjyv7d4sszx4ibmrn63vyvt7d5kgrlyrk7os7p2x6apti/images/0.PNG"
                    className="rounded-lg 2xl:rounded-2xl cursor-pointer"
                    onClick={() => { setShowModal(true); console.log(showModal); }}
                  ></img>
                );
              })
            }
          </div>
          <div className="h-32">

          </div>
        </div>
      </div>
      {showModal && <ChooseNFTModal setShowModal={setShowModal} />}
    </div>
  );
}

export default Trade;

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
      }
      else {
        alert("Install Metamask!");
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  const getAccountInfo = async () => {
    try {
      const balance = await AngelTokenContract.methods.balanceOf(account).call();
      const tmpArr = [];
      for (var i = 0; i < balance; i++) {
        const id = await AngelTokenContract.methods.tokenOfOwnerByIndex(account, i).call();
        const exchange = await AngelTokenContract.methods.isExchangeable(id).call();
        // 사진이 몇개 없어서 일단은 이렇게 어거지로 여러개 만듬.
        tmpArr.push([id, exchange])
        tmpArr.push([id, exchange])
        tmpArr.push([id, exchange])
        tmpArr.push([id, exchange])
        tmpArr.push([id, exchange])
        tmpArr.push([id, exchange])
        tmpArr.push([id, exchange])
        tmpArr.push([id, exchange])
        tmpArr.push([id, exchange])
      }
      setTokenIds(tmpArr);
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAccount();
  }, [])

  useEffect(() => {
    getAccountInfo();
  }, [account])

  const onImgClick = () => {
    // TODO: healthyKim!!
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full py-8 flex items-center justify-center" onClick={() => { }}>
      <div className="w-8/12 h-4/6 bg-white drop-shadow-2xl rounded-2xl flex flex-col" ref={modalRef}>
        <p className="p-4 text-center text-xl">Choose to exchange</p>
        <div className="flex-1 h-full flex flex-row gap-8 my-6 mx-4 items-center overflow-x-auto">
          {
            tokenIds.map((tokenId, i) => {
              console.log(tokenId);
              return (
                <img onClick={()=>{}} className="h-4/6 rounded-md cursor-pointer" src={`https://gateway.ipfs.io/ipfs/${ipfsImageHash}/images/${tokenId[0]}.PNG`} />
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

