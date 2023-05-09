import { User } from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = "MyKey";
export const signup = async (req, res, next) => {
    const { first_name, last_name, email, password } = req.body;
    let existUser;
    try{
        existUser = await User.findOne({ email: email});
    }catch(err){
        console.log(err);
    }
    if(existUser){
        return res
        .status(400)
        .json({ message: "User already exists! Login instead.." });
    };

    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
        first_name,
        last_name,
        email,
        password : hashedPassword,
    });

    try{
        await user.save();
    }catch(err){
        console.log(err);
    }
    return res.status(201).json({message:user});
};


export const login = async (req, res, next) => {
    const {email, password} = req.body;

    let existUser;
    try {
        existUser = await User.findOne({ email: email });
    }catch(err){
        return new Error(err);
    }
    if(!existUser){
        return res.status(400).json({message:"user not found. Signup please"});
    } 
    const isPasswordValid = bcrypt.compareSync(password, existUser.password);
    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid Email / password"});
    }
    const token = jwt.sign({id:existUser._id}, JWT_SECRET_KEY,{expiresIn:"1hr"});
    console.log("Generated Token\n", token);

    if (req.cookies[`${existUser._id}`]) {
      req.cookies[`${existUser._id}`] = "";
    }
    res.cookie(String(existUser._id), token, {
        path: '/',
        expires : new Date(Date.now() + 1000 * 60 * 60 * 24),
        httpOnly : true,
        sameSite: 'lax'
    });
    return res.status(200).json({message: "Successfully Logged In!", user:existUser, token});
};


export const verifyToken = (req,res,next) => {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    console.log(cookies);
    const headers = req.headers[`authorization`];
    if (!headers) {
        return res.status(404).json({ message: "Authorization header not found" });
    }
    // const token = headers.split(" ")[1];
    if(!token){
        res.status(404).json({message: "token not found"})
    }
    jwt.verify(String(token),JWT_SECRET_KEY,(err,user) =>{
        if(err){
          return  res.status(400).json({message:"Inavalid token"})
        }
        console.log(user.id);
        req.id = user.id; 
        next(); 
    });
    
    // console.log(headers);
};

export const getUSer = async(req,res, next)=>{
    const userId = req.id;
    let user;
    try {
        user = await User.findById(userId, "-password");
    }catch(err){
        return new Error(err)
    }
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    return res.status(200).json({ user })
};