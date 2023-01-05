import React, { useEffect } from "react";
import {Flex, Text, Button, Alert, AlertIcon} from '@chakra-ui/react'
import { useState } from 'react';
import { Link } from 'react-router-dom';


function DonatePage() {
    const [account, setAccount] = useState("");
    const [donated, setDonated] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    
    const getAccount = async () => {
        try{
            if(window.ethereum) {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            setAccount(accounts[0]);
            }
            else {
            alert("Install Metamask!");
            }
        }
        catch (error){
            console.error(error);
        }
    }

    const onClickMint = async () => {
        try {
            if (!account) {
                ///TODO: 팝업 형식 맞추기
                setShowAlert(true);
                return;
            }
            //contract 호출
            setDonated(true);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {getAccount();}, [])
    useEffect(() => {
        const timer = setTimeout(()=>{ setShowAlert(false) }, 1000);
        return () => clearTimeout(timer);
    }, [showAlert])

    return(
        <>
            <Flex p={10} direction='column' alignItems={"center"} >
                <Text>
                    대충 지갑 연결하고 서명하는것 설명<br />
                </Text>
                {/*TODO: 페이지 이동 -> 팝업*/}
                <Button mt={10} onClick={onClickMint}>Donate</Button>
                {
                    donated ?
                    <Link to="/show_NFT" state={{ tokenId: "angelKim" }}>
                        <Button mt={10}>See my NFT</Button>
                    </Link> : null
                }
            </Flex>

            {showAlert ? (  
                <Alert status='error'>
                    <AlertIcon />
                    Connect Metamask Wallet!
                </Alert>
            ) : null}
        </>
    );
}

export default DonatePage;