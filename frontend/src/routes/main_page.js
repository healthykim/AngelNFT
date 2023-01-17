import React, { useEffect, useState } from "react";
import { AngelTokenContract } from "../contracts";
import XCard from "../components/x_card";
import { Link } from "react-router-dom";

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


  const ukWalletAddresses = [
    { 'currency': 'BTC', 'address': '357a3So9CbsNfBBgFYACGvxxS6tMaDoa1P' },
    { 'currency': 'ETH and USDT (ERC-20)', 'address': '0x165CD37b4C644C2921454429E7F9358d18A45e14' },
    { 'currency': 'DOT', 'address': '1x8aa2N2Ar9SQweJv9vsuZn3WYDHu7gMQu1RePjZuBe33Hv' },
  ];

  const [isCopied, setIsCopied] = useState(Array(ukWalletAddresses.length).fill(false));

  const onWalletAddressClick = async (i) => {
    try {
      await navigator.clipboard.writeText(ukWalletAddresses[i].address);
      let tmpArr = Array(ukWalletAddresses.length).fill(false);
      tmpArr[i] = true;
      setIsCopied(tmpArr);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{
    let timer = setTimeout(()=>{
      setIsCopied(Array(ukWalletAddresses.length).fill(false));
    }, 1000);
    return () => clearTimeout(timer);
  }, [isCopied]);

  return (
    <div className="bg-ukblue w-full h-64 ">
      <div className="grid text-center h-full content-center">
        <div>
          <h1 className="text-ukyellow text-4xl font-bold">
            Donate for Ukraine in Cryptocurrency
          </h1>
        </div>
      </div>
      <p className="text-center">nextTokenId: {nextTokenId}</p>
      <div className="px-24 xl:px-48">
        <div className="text-center flex-wrap py-16 text-2xl w-10/12 xl:w-8/12 m-auto">
          <p className="inline-block pr-1">Russia's invasion of Ukraine is protracted.</p>
          <p className="inline-block pr-1">To continue our interest and support in Ukraine,</p>
          <p className="inline-block pr-1">I would like to introduce some cryptocurrency donors.</p>
          <p className="inline-block pr-1">And to promote donations, we would like to provide services such as issuing commemorative NFTs or tracking donation details.</p>
        </div>
        <div className="border-b-2"></div>
        <div className="grid gap-y-10 py-16">
          <div>
            <h3 className="text-3xl font-bold">Ways of Donation</h3>
            <p className="pl-8 pt-4 text-lg">
              You can use this site to send money to donors. <br />
              You can choose one of the addresses on the <Link to="/donate" className="text-ukblue text-lg">Donate page</Link> and send the money. <br />
              Or you can donate cryptocurrency directly to the donation addresses introduced below. <br />
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Ukrainian Government Wallet Address</h4>
            <ul className="pl-8 list-disc list-outside leading-8 pt-2 text-lg">
              {ukWalletAddresses.map((ukWalletAddress, i) => {
                return (
                  <li key={i}>
                    <span>{ukWalletAddress.currency} - </span>
                    <div className="inline-block relative">
                      {
                        isCopied[i] &&
                        <div className={`absolute flex flex-col justify-center -right-20 top-0 h-full px-2 py-1 bg-ukblue bg-opacity-50 rounded-md`}>
                          <p className="text-sm">Copied!</p>
                        </div>
                      }
                      <span onClick={() => { onWalletAddressClick(i) }} className="cursor-pointer">{ukWalletAddress.address}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="border-b-2"></div>
        <div className="flex flex-col gap-8 py-16 text-lg">
          <XCard>
            If you make a donation through this site, you can check your donation history. <br />
            Your donation will be stored forever in the blockchain. <br />
            However, since you cannot identify who the owner of the wallet address is, your identity is not revealed. <br />
          </XCard>
          <XCard imgPosi='right'>
            In addition, we will issue the following commemorative NFTs <br />
            (additional minting costs may be incurred.) <br />
            NFT images do not overlap each other and vary depending on hair appearance, clothing, skin color, etc. <br />
          </XCard>
          <XCard>
            The issued NFT is completely yours. <br />
            You can import it into your wallet or exchange it for an NFT in another image here. <br />
          </XCard>

        </div>
        <div className="flex justify-center pb-16">
          <Link to='/donate'>
            <div className="bg-ukblue py-4 px-12 m-auto rounded-xl text-2xl text-ukyellow font-semibold">
              Donate Now
            </div>
          </Link>
        </div>
        <div className="border-b-2"></div>
        <div className="py-8">
          <h4 className="text-xl font-semibold">Contact Us</h4>
          <p className="pt-2">
            Please contact [Contact Us] if you want to register your donation destination on our website.
          </p>
        </div>
        <div className="h-12">

        </div>
      </div>
    </div>

  );
}

export default MainPage;

