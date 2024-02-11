const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
 title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,

    },
   category: {
        type: String,
        required: true,

    },
    views: {
        type: Number,
        default: 0
    },
    author : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
    pathname: {
type: String,


    },
    comments : 
         [{
            type: mongoose.Schema.Types.ObjectId ,
            ref: "Comments"
        }],
    
created : {
    type: Date,
default: Date.now
}

    
},
{timestamps: true},
)

module.exports = mongoose.model("Videos", VideoSchema)