import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();    
const connectDB = async()=>{
    try{
        const uri = process.env.MONGO_URI;
        console.log('MONGO_URI:', uri);
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    }catch(err){
        console.log(err);
    }
}
connectDB();

export default connectDB;