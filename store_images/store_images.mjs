import { NFTStorage } from 'nft.storage'
import { filesFromPath } from 'files-from-path'

const my_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFmQ0FBZDNlZWQ1OTEzN0I4Q2FDNGE5YzU2NDM3QTk4MGZFM2MxN2EiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MjQ5NzE4MzE1MiwibmFtZSI6ImFuZ2VsLW5mdCJ9.zNzLUgqbDl1BX0MsU5v84Hp5EKpzz9cf0lRMJDa9RsY'

async function main() {
  // you'll probably want more sophisticated argument parsing in a real app
  if (process.argv.length !== 3) {
    console.error(`usage: ${process.argv[0]} ${process.argv[1]} <directory-path>`)
  }
  const directoryPath = process.argv[2]
  const files = filesFromPath(directoryPath)

  const storage = new NFTStorage({ token: my_token })

  const cid = await storage.storeDirectory(files)
  console.log({ cid })

  const status = await storage.status(cid)
  console.log(status)
}
main()
