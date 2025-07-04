import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password:hashedPassword});
        res.status(201).json({message:'User created successfully'});
    }catch(err){
        res.status(500).json({message:err.message});

        }
};
export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});   
        if(!user){
            return res.status(400).json({message:'User does not exist'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid credentials'});
        }
        const token = jwt.sign({id:user._id}, JWT_SECRET);
         res.cookie('token', token, {httpOnly:true});
        res.status(200).json({
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email
          },
          message: 'User logged in successfully'
        });
       
    }catch(err){   
        res.status(500).json({message:err.message});
    }
}   

