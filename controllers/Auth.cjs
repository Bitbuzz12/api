const jwt = require('jsonwebtoken');
const User = require("../model/User.cjs");


exports.register = async(req, res) => {
    try {
const newUser = await User.create(req.body);
        const {id, username} = newUser;
        const token = jwt.sign({id, username}, process.env.SECRET);
res.status(201).json({id, username , token});

    }
    catch(err) {
        res.status(500).json(err)

    }
}

exports.login = async(req,res) => {
    try {
const user = await User.findOne({username : req.body.username});
const {id, username } = user;
const token = jwt.sign({id, username}, process.env.SECRET, {expiresIn: '1h'});
res.status(201).json({id, username , token});


    }
    catch(err) {
       res.status(500).json("error : Login failed")
    }
}