import fs from "fs";

async function main() {
    // you'll probably want more sophisticated argument parsing in a real app
    if (process.argv.length !== 4) {
      console.error(`usage: ${process.argv[0]} ${process.argv[1]} <image-directory-path> <filename-start-number>`)
    }
    const imageDir = process.argv[2]
    var counter = process.argv[3]

    fs.readdir(imageDir, function(error, files){
      files.forEach( function(file) {
        if(file.includes(".png")) {
            console.log(file)
            fs.rename(`${imageDir}/${file}`, `${imageDir}/renamed/${counter}.png`, (error) => {
                if(error)
                    console.log(error)
            })
            counter++;
        }
      })
    });

    fs.readdir(`${imageDir}/renamed`, function(error, files){
        files.forEach(function(file) {
            fs.rename(`${imageDir}/renamed/${file}`, `${imageDir}/${file}`, (error) => {
                if(error)
                    console.log(error);
            })
        })
    })


}
main()
