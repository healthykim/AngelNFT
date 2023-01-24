import {useRef, useState, useEffect} from "react";

function DonateOnlyModal({ setShowDonateOnlyModal }) {
  const modalRef = useRef(null);
  const [modalFade, setModalFade] = useState("opacity-0");
  let isAnimating = false;

  const handleClickOutside = async (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target) && !isAnimating) {
      setModalFade("opacity-0");
      setTimeout(() => {
        isAnimating = false;
        setShowDonateOnlyModal(false);
      }, 500);
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
    <div className="fixed z-50 top-0 left-0 w-full h-full py-8 flex items-center justify-center">
      <div className={`relative w-4/12 2xl:h-2/6 bg-white drop-shadow-2xl rounded-2xl border-8 border-white overflow-clip duration-500 ${modalFade}`} ref={modalRef}>
        <img src="https://gateway.pinata.cloud/ipfs/bafybeigk7nzlkdjyv7d4sszx4ibmrn63vyvt7d5kgrlyrk7os7p2x6apti/images/0.PNG" alt=""></img>
        <p className="absolute bottom-4 w-full py-4 text-center font-semibold text-2xl text-gray-50 drop-shadow-xl stroke-black">Thank you for your donation!</p>
      </div>
    </div>
  );
}

export default DonateOnlyModal;