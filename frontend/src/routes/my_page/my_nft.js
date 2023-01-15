import NFTCard from "../../components/NFT_card";

function MyNFT({ tokenIds, account, setIsLoading }) {

  return (
    <div>
      <div className="grid grid-cols-3 gap-x-16 gap-y-12 p-8">
        {tokenIds.length !== 0 &&
          tokenIds.map((v, i) => {
            return (
              <NFTCard key={i} tokenId={v[0]} metadata={v[1]} isExchangeable={v[2]} account={account} setIsLoading={setIsLoading} />
            )
          })
        }
      </div>
    </div>
  );
}

export default MyNFT;