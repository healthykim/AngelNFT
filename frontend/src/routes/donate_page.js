import React, { useEffect } from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';


function DonatePage() {
    const [account, setAccount] = useState("");
    const [donated, setDonated] = useState(false)
    const [showAlert, setShowAlert] = useState(false)

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

    useEffect(() => { getAccount(); }, [])
    useEffect(() => {
        const timer = setTimeout(() => { setShowAlert(false) }, 2000);
        return () => clearTimeout(timer);
    }, [showAlert])

    return (
        <>
            <div className="h-16"></div>
            <div className="flex-col items-center text-center p-10">
                <p>
                    대충 지갑 연결하고 서명하는것 설명<br />
                </p>
                {/*TODO: 페이지 이동 -> 팝업*/}
                <button onClick={onClickMint} className="mt-10 cursor-pointer bg-gray-300 px-4 py-2 rounded-lg">
                    Donate
                </button>
                <br />
                {
                    donated &&
                    <Link to="/show_NFT" state={{ tokenId: "angelKim" }}>
                        <button className="mt-10 cursor-pointer bg-gray-300 px-4 py-2 rounded-lg">See my NFT</button>
                    </Link>
                }
            </div>
            {showAlert ? (
                <div className="bg-red-300 p-4 font-medium">
                    Connect Metamask Wallet!
                </div>
            ) : null}
        </>
    );
}

export default DonatePage;