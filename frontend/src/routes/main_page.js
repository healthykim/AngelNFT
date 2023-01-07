import React, { useEffect, useState } from "react";
import { AngelTokenContract } from "../contracts";
import {Flex, Text, Link, Button} from '@chakra-ui/react'

function MainPage() {
    const [nextTokenId, setNextTokenId] = useState(-1);

    const getTokenId = async () => {
        try {
            const id = await AngelTokenContract.methods.totalSupply().call();
            setNextTokenId(id);
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getTokenId();
    }, [])

    return(
        <Flex p={10} direction='column' alignItems={"center"} >
            <Text>
                하이 나는 천사<br />
                기부를 하면 천사 NFT를 받을 수 있어.<br />
                1. 지갑연결<br />
                2. Donate<br />
                3. 이름을 짓고 민팅!<br />
                NFT이미지는 랜덤이야.<br />
                UI가 구리다. 이건 준규의 도움이 필요해<br />
                아무튼 아래 버튼을 눌러서 시작!<br />
            </Text>
            <h1 className="text-3xl font-bold underline">hi</h1>
            <Link href="/donate">
                <Button mt={10}>Start: {nextTokenId}</Button>
            </Link>
        </Flex>
    );
}

export default MainPage;

