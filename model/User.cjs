const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
username: {
    type: String,
    
},
emailAddress: {
    type: String,
    
},
password: {
    type: String,
    
},
created : {
    type: Array
}
})

module.exports = mongoose.model("User", UserSchema)