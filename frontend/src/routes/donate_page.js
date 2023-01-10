import React, { useEffect, useRef } from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DonateContract } from '../contracts/index';
import { ipfsImageHash } from "../contracts"


function DonatePage() {
    const [account, setAccount] = useState("");
    const [donated, setDonated] = useState(false);
    const [tokenId, setTokenId] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null);

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

    const onClickDonateOnly = async () => {
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

    const destinationId = 0;

    const onClickDonate = async (isMint) => {
        if (!account) {
            setShowAlert(true);
            return;
        }

        /// TODO: Contract Donate
        let response;
        try {
            // response = DonateContract.methods.donate(destinationId, isMint).send({ from: account });
            response = 'angelKim';
        } catch (error) {
            console.error(error);
        }
        if (!isMint && response == 0) {
            return;
        }
        setTokenId(response);
        setShowModal(true);
        return;
    }

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setShowModal(false);
        }
    };

    useEffect(() => {
        getAccount();
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    useEffect(() => {
        const timer = setTimeout(() => { setShowAlert(false) }, 2000);
        return () => clearTimeout(timer);
    }, [showAlert])

    return (
        <>
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full py-8 flex items-center justify-center" onClick={() => { }}>
                    <div className="relative flex flex-col w-6/12 h-5/6 bg-gray-300 text-center items-center rounded-2xl" ref={modalRef}>
                        <div className="flex-none">
                            <div className="flex items-center py-4">
                                <h1 className="text-lg flex-none font-medium  text-center">My mint</h1>
                            </div>
                        </div>
                        <div className="flex-1 pb-4 overflow-clip">
                            <img className="h-full object-contain" src={`https://gateway.ipfs.io/ipfs/${ipfsImageHash}/images/${tokenId}.PNG`}></img>
                        </div>
                    </div>
                </div>
            )}
            <div className="h-16"></div>
            <div className="flex-col items-center text-center p-10">
                <p>
                    대충 지갑 연결하고 서명하는것 설명<br />
                </p>
                {/*TODO: 페이지 이동 -> 팝업*/}
                <div className="flex gap-10 justify-center">
                    <button onClick={() => { onClickDonate(true) }} className="mt-10 cursor-pointer bg-gray-300 px-4 py-2 rounded-lg">
                        Donate with Mint
                    </button>
                    <button onClick={() => { onClickDonate(false) }} className="mt-10 cursor-pointer bg-gray-300 px-4 py-2 rounded-lg">
                        Donate Only
                    </button>
                </div>
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