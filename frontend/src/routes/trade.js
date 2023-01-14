import { useState } from "react";
import ChooseNFTModal from "../components/modal/choose_nft_modal";

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

