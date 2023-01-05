# 👼 Angel NFT Project 👼
**This is a web3 projects for donations and NFT Mining.**

We are creating a website that allows donators to mint NFTs of random angel images and exchange NFTs that have been minted.

## 🌈 Quick Start
In each folder, execute the below command.
```
npm install
```

### 1. Upload NFT Images and Metadata to IPFS
```
cd store_images
//you must store your images in ./images

npx run store_images.mjs './images'
//./metadata is empty now

npx run store_metadata.mjs './images' './metadata'
```
You can get cid by terminal output.
Copy this cid & Paste to the frontend & contract code.

### 2. Compile & Test solidity
```
cd contracts
npx hardhat compile
npx hardhat test
```

### 3. Deploy smart contract to hardhat testnet
```
npx hardhat node
```
Then, open another terminal for the command below.
```
npx hardhat run --network localhost scripts/deploy.ts
```
You can get contract address by terminal output. Copy this and Paste to the frontend/src/contracts/index.js
### 4. Run frontend
```
cd frontend
npm start
```
Make sure your metamask is connected to localhost(Hardhat testnet).
