import React, { useEffect, useState } from "react";
import XCard from "../components/x_card";
import { Link } from "react-router-dom";

function MainPage() {

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

  useEffect(() => {
    let timer = setTimeout(() => {
      setIsCopied(Array(ukWalletAddresses.length).fill(false));
    }, 1000);
    return () => clearTimeout(timer);
  }, [isCopied]);

  return (
    <div className="bg-ukblue w-full h-64 border-b-2 border-ukblue-darken drop-shadow-xl">
      <div className="grid text-center h-full content-center">
        <div>
          <h1 className="text-ukyellow text-4xl font-bold">
            Donate for Ukraine in Cryptocurrency
          </h1>
        </div>
      </div>
      <div className="px-24 xl:px-48">
        <div className="text-center flex-wrap py-16 text-2xl w-10/12 xl:w-8/12 m-auto">
          <p className="inline-block">Ukraine needs our help.</p>
          <p className="inline-block">It has been almost a year now since the Russian invasion of Ukraine, which is still prolonging.</p>
          <p className="inline-block">We would like to introduce few cryptocurrency donors in order to maintain the interest and support for Ukraine.</p>
          <p className="inline-block">And, to promote these donations, we are providing services such as commemorative NFT issuance (as donation certification) or tracking donation history.</p>
        </div>
        <div className="border-b-2"></div>
        <div className="grid gap-y-10 py-16">
          <div>
            <h3 className="text-3xl font-bold">Donation Methods:</h3>
            <p className="pl-8 pt-4 text-lg">
              1. You can donate cryptocurrency directly to the donation addresses introduced below. (See below) <br />
              2. Alternatively, you can use this website to make donations.<br /><br />
              For a second method, you just need to select one of the addresses on <Link to="/donate" className="text-ukblue text-lg">Donate page</Link> and send the money.<br />
              Check the details below on where to donate.< br />
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
            (At the moment, we are looking for more wallet addresses for donations)<br />
          </div>
        </div>
        <div className="border-b-2"></div>
        <div className="flex flex-col gap-8 py-16 text-lg">
          <XCard imgSrc="main_images/1.png">
            By donating money through this website, you can keep track of your donation history. <br />
            Your donation details are stored forever in the blockchain. <br />
            However, since it  cannot be verified who the owner of the wallet address is, your identity is not revealed. <br />
          </XCard>
          <XCard imgPosi='right' imgSrc="main_images/2.png">
            Also, the following commemorative NFT(s) will be issued as certification(s) of donation. <br />
            (Additioinal gas fee may be charged when minting the NFT. You can donate without minting.) <br />
            NFT images are unique and do not repeat each other. <br />
            They will vary depending on hairstyle, clothes, skin color, etc. <br />
          </XCard>
          <XCard imgSrc="main_images/3.png">
            The minted NFT completely belongs to a user. <br />
            It can be imported into the Metamask wallet or can be exchanged for another NFT here. <br />
          </XCard>
        </div>
        <div className="flex justify-center pb-16 pt-8 w-7/12 mx-auto">
          <Link to='/donate' className="text-center text-ukblue bg-white py-3 w-full  rounded-2xl text-2xl font-semibold drop-shadow-md border-2">
            Donate Now
          </Link>
        </div>
        <div className="border-b-2"></div>
        <div className="py-8">
          <h4 className="text-xl font-semibold">Contact Us</h4>
          If you want to register your donations on this website or have other questions, please Contact Us.<br />
          <ul className="flex flex-col py-2 gap-1">
            <li>
              <p className="font-semibold">Boseol Mun (@healthykim)</p>
              <p>Director, Smart contract and Frontend developer, NFT Image creator.</p>
              <p>email: bsbs8645@snu.ac.kr</p>
            </li>
            <li>
              <p className="font-semibold">Joongyoo Han (@hanjoongyoo)</p>
              <p>Frontend developer, Designer. </p>
              <p>email: hanjoongyoo@snu.ac.kr </p>
            </li>
            <li>
              <p className="font-semibold">Special Thanks to</p>
              <p>Ha Tanya (Translation)</p>
            </li>
          </ul>
        </div>
        <div className="h-12">
        </div>
      </div>
    </div>

  );
}

export default MainPage;

