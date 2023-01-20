import React, { useEffect, useState } from "react";
import XCard from "../components/x_card";
import { Link } from "react-router-dom";

function MainPage() {

  const ukWalletAddresses = [
    { 'currency': 'BTC', 'address': '357a3So9CbsNfBBgFYACGvxxS6tMaDoa1P' },
    { 'currency': 'ETH and USDT (ERC-20)', 'address': '0x165CD37b4C644C2921454429E7F9358d18A45e14' },
    { 'currency': 'DOT', 'address': '1x8aa2N2Ar9SQweJv9vsuZn3WYDHu7gMQu1RePjZuBe33Hv' },
  ];
  return (
    <div className="bg-ukblue w-full h-64 ">
      <div className="grid text-center h-full content-center">
        <div>
          <h1 className="text-ukyellow text-4xl font-bold">
            Donate for Ukraine in Cryptocurrency
          </h1>
        </div>
      </div>
      <div className="px-24 xl:px-48">
        <div className="text-center flex-wrap py-16 text-2xl w-10/12 xl:w-8/12 m-auto">
          <p className="inline-block pr-1">Ukraine needs our help.</p>
          <p className="inline-block pr-1">It has been almost a year now since the Russian invasion of Ukraine, which is still prolonging.</p>
          <p className="inline-block pr-1">We would like to introduce few cryptocurrency donors in order to maintain the interest and support for Ukraine.</p>
          <p className="inline-block pr-1">And, to promote these donations, we are providing services such as commemorative NFT issuance (as donation certification) or tracking donation history.</p>        
        </div>

        
        <div className="border-b-2"></div>
        <div className="grid gap-y-10 py-16">
          <div>
            <h3 className="text-3xl font-bold">Donation Methods:</h3>
            <p className="pl-8 pt-4 text-lg">
              1. You can donate cryptocurrency directly to the donation addresses introduced below. (See below) <br />
              2. Alternatively, you can use this website to make donations.<br /><br />
              For a second method, you just need to select one of the addresses on <Link to="/donate" className="text-ukblue text-lg">Donate page</Link> and send the money.<br />
              Check the details below on where to donate.< br/>
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Ukrainian Government Wallet Address</h4>
            <ul className="pl-8 list-disc list-outside leading-8 pt-2 text-lg">
              {ukWalletAddresses.map((ukWalletAddress, i) => {
                return (
                  <li key={i}><span>{ukWalletAddress.currency} - </span><span className="cursor-pointer">{ukWalletAddress.address}</span></li>
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
          <XCard  imgSrc="main_images/3.png">
            The minted NFT completely belongs to a user. <br />
            It can be imported into the Metamask wallet or can be exchanged for another NFT here. <br />
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
          If you want to register your donations on this website or have other questions, please Contact Us.<br />
          <p className="pt-2">
            <p className="font-semibold">Boseol Mun (@healthykim)</p>
            Director, Smart contract and Frontend developer, NFT Image creator <br />
            email: bsbs8645@snu.ac.kr <br />
            <p className="font-semibold">Joongyu Han (@joongyuhan)</p>
            Frontend developer, Designer. <br />
            email:  <br />
            <p className="font-semibold">Special Thanks to</p>
            Ha Tanya (Translation)<br />
          </p>
        </div>
        <div className="h-12">

        </div>
      </div>
    </div>

  );
}

export default MainPage;

