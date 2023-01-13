import NFTCard from "./NFT_card";

function MyNFT({ tokenIds, account }) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-x-16 gap-y-12 p-8">
        {tokenIds.length !== 0 &&
          tokenIds.map((v, i) => {
            return (
              <NFTCard key={i} tokenId={v[0]} metadata={v[1]} isExchangeable={v[2]} account={account} />
            )
          })
        }
      </div>
    </div>
  );
}

export default MyNFT;