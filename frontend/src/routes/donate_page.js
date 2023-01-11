import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { ipfsImageHash } from "../contracts"


function DonatePage() {
    const [account, setAccount] = useState("");
    const [donated, setDonated] = useState(false);
    const [tokenId, setTokenId] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getAccount();
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

    const onClickDonate = async (isMint) => {
        if (!account) {
            setShowAlert(true);
            return;
        }

        /// TODO: Contract Donate
        let response;
        try {
            // response = DonateContract.methods.donate(destinationId, isMint).send({ from: account });
            response = '0';
        } catch (error) {
            console.error(error);
        }
        if (!isMint && response === '0') {
            return;
        }
        setTokenId(response);
        setShowModal(true);
        return;
    }

    useEffect(() => {
        const timer = setTimeout(() => { setShowAlert(false) }, 2000);
        return () => clearTimeout(timer);
    }, [showAlert])

    return (
        <>
            {showModal && (
                <MintModal setShowModal={setShowModal} tokenId={tokenId}></MintModal>
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

function MintModal({ setShowModal, tokenId }) {
    const modalRef = useRef(null);
    const [modalFade, setModalFade] = useState("opacity-0");
    const [heroStyle, setHeroStyle] = useState({});
    const [modalHero, setModalHero] = useState(false);
    let isHeroAnimating = false;

    const handleClickOutside = async (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target) && !isHeroAnimating) {
            isHeroAnimating = true;
            const modalRect = modalRef.current.getBoundingClientRect();
            let style = {
                transform: `matrix(0.05, 0, 0, 0.05, ${-modalRect.x + window.innerWidth - modalRect.width / 2 + modalRect.width * 0.05 / 2 - 20 * 4}, ${-modalRect.y - modalRect.height / 2 + modalRect.height * 0.05 / 2 + 4 * 4})`,
                opacity: 0.5,
                borderRadius: '999px',
                transition: "transform 1s, opacity 1s, border-radius 1s",
                backgroundColor: 'transparent',
            };
            setHeroStyle(style);
            setModalHero(true);
            setTimeout(() => {
                setShowModal(false);
            }, 1000);
        }
    };

    useEffect(() => {
        setModalFade("opacity-100")
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full py-8 flex items-center justify-center" onClick={() => { }}>
            <div style={heroStyle} ref={modalRef}
                className={`relative flex flex-col w-6/12 h-5/6 text-center items-center rounded-2xl ${modalFade} bg-gray-300`}
            >
                <div className="flex-none modal">
                    <div className="flex items-center py-4">
                        <h1 className="text-lg flex-none font-medium  text-center">{!modalHero && 'Your mint'}</h1>
                    </div>
                </div>
                <div className={`flex-1 pb-4 overflow-clip duration-1000 transition-all ease-out`} style={modalHero ? { borderRadius: modalRef.current.getBoundingClientRect().width / 2 } : {}}>
                    <img className="h-full object-contain" src={`https://gateway.ipfs.io/ipfs/${ipfsImageHash}/images/${tokenId}.PNG`} alt={'mint image'}></img>
                </div>
            </div>
        </div>
    );
}

export default DonatePage;