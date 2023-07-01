const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc REGISTER User
// @routes POST /api/user/register
// @access public
const registerUSer = asyncHandler( async (req,res) => {
    
    const { username, email, password } = req.body
    if (!email || !username || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    
    const alreadyRegistered = await User.findOne({email});
    if (alreadyRegistered) {
        res.status(400);
        throw new Error("email address already registered!")
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    console.log(user);
    if (user) {
        res.status(201).json({ _id:user.id, email:user.email });
    }
    else {
        res.status(400);
        throw new Error("User data is not valid...")
    }
});

// @desc LOGIN User
// @routes POST /api/user/login
// @access public
const loginUser = asyncHandler( async (req,res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are necessary!")
    }
    const user = await User.findOne({email});
    // console.log(user)
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn : "10m"}
        );
        console.log("accessToken : ",accessToken);
        res.status(200).json({accessToken});
    }
    else {
        res.status(401);
        throw new Error("Incorrect login credentials.")
    }
});

// @desc CURRENT User
// @routes POST /api/user/current
// @access private
const currentUser = asyncHandler( async (req,res) => {
    res.json(req.user)
});

const homePage = asyncHandler( async(req,res)=>{
    res.render('index');
})

module.exports = { registerUSer, loginUser, currentUser, homePage }