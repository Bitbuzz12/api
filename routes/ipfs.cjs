const pinataSDk = require('@pinata/sdk');
const pinata = new pinataSDk("439a7451bf1ad8379a74", "d83fd4c2e24ddbbdd8dbda91f11a7ff67f3f30b6fef5ade1b44fd666106b4376" )
const axios = require("axios");

const fs = require("fs");


const sendFIleToIPFS = async(e) => {
     if(fileImg) {
         try {
             const formData = new FormData();
             formData.append("file", fileImg);
             const resFile = await axios({
                 method: "post",
                 url : "api.pinnata.cloud/pinning/pinFileToIPFS",
                 data : formData,
                 headers : {
                     'pinata_api_key': "439a7451bf1ad8379a74",
                     "'pinata_secret_api_key": "d83fd4c2e24ddbbdd8dbda91f11a7ff67f3f30b6fef5ade1b44fd666106b4376",
                     "Content-Type": "multipart/form-data"

                 }
             });
             console.log(resFile)
             const imgHash = `ipfs://${resFile?.data?.IpfsHash}`;
             console.log(imgHash)
         }
         catch(err) {
             console.log(err)
         }
     }
}
module.exports =  function(file) {
    const readableStreamForFile = fs.createReadStream(file);




    const options = {
        pinataMetadata: {
            name: "blue",
            keyvalues: {
                key_1: 'value_1',
                key_2: 'value_2'
            }
        }, 
        pinataOptions: {
            cidVersion: 1
        }
    };
    
    
    pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err)
    })
    
    
    
}


