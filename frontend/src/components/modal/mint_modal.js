import {useRef, useState, useEffect} from "react";
import {ipfsImageHash} from "../../contracts";

function MintModal({ setShowMintModal, tokenId }) {
    const modalRef = useRef(null);
    const imgRef = useRef(null);
    const [modalFade, setModalFade] = useState("opacity-0");
    const [modalHero, setModalHero] = useState({});
    const [imgHero, setImgHero] = useState({ width: `${window.innerHeight * 0.6}px` });
    const [textHero, setTextHero] = useState(false);
    let isAnimating = false;
  
    const handleClickOutside = async (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && !isAnimating) {
        isAnimating = true;
        const modalRect = modalRef.current.getBoundingClientRect();
        const imgRect = imgRef.current.getBoundingClientRect();
        const scaleFactor = 40 / imgRect.height;
  
        let modalStyle = {
          transform: `matrix(${scaleFactor}, 0, 0, ${scaleFactor}, 
            ${(-modalRect.x + window.innerWidth - 88) - modalRect.width / 2 + 20}, 
            ${(-modalRect.y + 3 * 4) - modalRect.height / 2 + 20}
            )`,
          opacity: 0.7,
          transition: "transform 1s, opacity 1s",
          backgroundColor: 'transparent',
        };
        let imgStyle = {
          borderRadius: (imgRect.height / 2),
          width: `${window.innerHeight * 0.6}px`
        };
        setModalHero(modalStyle);
        setImgHero(imgStyle);
        setTextHero(true);
        setTimeout(() => {
          isAnimating = false;
          setShowMintModal(false);
        }, 1100);
      }
    };
  
    useEffect(() => {
      setModalFade("opacity-100")
      isAnimating = true;
      setTimeout(() => {
        isAnimating = false;
      }, 500);
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    return (
      <div className="fixed top-0 left-0 w-full h-full py-8 flex items-center justify-center" onClick={() => { }}>
        <div style={modalHero} ref={modalRef}
          className={`relative flex flex-col text-center items-center rounded-2xl duration-500 ${modalFade} bg-white drop-shadow-2xl`}
        >
          <div className="flex-none modal">
            <div className="flex items-center pt-4 pb-2">
              <h1 className="text-lg flex-none font-medium  text-center">{!textHero && 'Your mint'}</h1>
            </div>
          </div>
          <div className={`p-2 overflow-clip`} >
            <img className="h-full w-full object-contain rounded-lg duration-1000 transition-all ease-out" style={imgHero} src={`https://gateway.ipfs.io/ipfs/${ipfsImageHash}/images/${tokenId}.png`} alt={'mint image'} ref={imgRef}></img>
          </div>
        </div>
      </div>
    );
  }

  export default MintModal;