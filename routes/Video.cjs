const Videos =  require("../model/Videos.cjs");
const express = require("express")
const app = express();
const router= express.Router();
const cors = require("cors")
const User =  require("../model/User.cjs")
const HashUpload = require('./ipfs.cjs')
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const axios = require("axios");



const storage = new multer.memoryStorage();
const upload = multer({
  storage,
});

app.use(cors())

cloudinary.config({
    cloud_name: "dfogbt3dr",
    api_key: "136692657446344",
    api_secret: "A35tUO0PONjShDAlVPD_xE5yX70",
  });
async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res;
  }
  
router.post("/VidUpload", upload.single("movies"), async(req, res) => {

    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        res.json(cldRes);
      } catch (error) {
        console.log(error);
        res.send({
          message: error.message,
        });
      }
/*
                    
        
        } */
  
})


router.post("/upload",  async(req, res) => {
    console.log(req)
    const id = req.body.id;
    console.log(id)
try {
    const user = await User.findById(id);
    if (!user) {
    res.status(400).json("not available")
    }
    else {
     const newVid = new Videos({
    
    title: req.body.title,
    description : req.body.description,
    author : user,
    category: req.body.category, 
    
    })
    const vid = await newVid.save();
    await user.created?.push(vid._id);
    const user1 = await user.save();
    res.status(200).json("Video Successfully uploaded" ) ;
    }
} catch(err) {
    res.status(500).json(err)
}

})

module.exports = router;



