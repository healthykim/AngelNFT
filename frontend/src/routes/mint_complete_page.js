import React from "react";
import { Flex, Text, Image } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { ipfsImageHash } from "../contracts"

///TODO: 페이지 -> 팝업
function MintCompletePage() {
    const location = useLocation();
    const tokenId = location.state.tokenId;
    
    return(
        <Flex p={10} direction='column' alignItems={"center"} >
            <Text>
                기부 완료!<br />
                <Image src={`https://gateway.ipfs.io/ipfs/${ipfsImageHash}/images/${tokenId}.PNG`}/>
                NFT Image<br />
                Description<br />
                어쩌구 저쩌구<br />
                지금은 페이지로 구현했지만 팝업으로 변경할 예정<br />
            </Text>
        </Flex>
    );
}

export default MintCompletePage;