import { NFTStorage } from 'nft.storage'
import { filesFromPath } from 'files-from-path'
import fs from "fs";


const my_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFmQ0FBZDNlZWQ1OTEzN0I4Q2FDNGE5YzU2NDM3QTk4MGZFM2MxN2EiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MjQ5NzE4MzE1MiwibmFtZSI6ImFuZ2VsLW5mdCJ9.zNzLUgqbDl1BX0MsU5v84Hp5EKpzz9cf0lRMJDa9RsY'

async function main() {
  // you'll probably want more sophisticated argument parsing in a real app
  if (process.argv.length !== 4) {
    console.error(`usage: ${process.argv[0]} ${process.argv[1]} <image-directory-path> <metadata-directory-path>`)
  }
  const imageDir = process.argv[2]
  const metadataDir = process.argv[3]

  //1. Write json metadata to local file storage(at ./metadata)
  fs.readdir(imageDir, function(error, files){
    files.forEach( function(file) {
        const fileName = file.toString().split(".")[0]; //remove filename extension
        const fileFullName = file.toString()
        const metadata = {
            "name": `Angel ${fileName}`,
            "description": "Angel NFT",
            "image": `https://gateway.ipfs.io/ipfs/bafybeib3epzqp3u5p36riiqibf7oprpwmw7psdmbedi3imy3tnwj3y3hne/images/${fileFullName}`
        }
        fs.writeFile(`${metadataDir}/${fileName}.json`, JSON.stringify(metadata), function(error){if(error){console.log(error)}});
    })
  });

  //2. Upload metadata folder to ipfs

  const storage = new NFTStorage({ token: my_token })

  const files = filesFromPath(metadataDir)
  const cid = await storage.storeDirectory(files)
  console.log({ cid })

  const status = await storage.status(cid)
  console.log(status)
}
main()
