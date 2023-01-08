import React from "react";
import { useLocation } from "react-router-dom";
import { ipfsImageHash } from "../contracts"

///TODO: 페이지 -> 팝업
function MintCompletePage() {
    const location = useLocation();
    const tokenId = location.state.tokenId;

    return (
        <div className="p-10 flex-col items-center text-center">
            <div className="h-16"></div>
            <p>기부 완료!<br /></p>
            <img className="w-9/12 m-auto" src={`https://gateway.ipfs.io/ipfs/${ipfsImageHash}/images/${tokenId}.PNG`}></img>
            <p>
                NFT Image<br />
                Description<br />
                어쩌구 저쩌구<br />
                지금은 페이지로 구현했지만 팝업으로 변경할 예정<br />
            </p>
        </div>
    );
}

export default MintCompletePage;