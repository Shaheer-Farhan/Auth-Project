import mongoose from "mongoose";


const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
        console.log("  ✅ mongoDB connected");
        console.log(` mongoDB connected to ${connectionInstance.connection.host} 👤`);
        
    }catch(e){
        console.error(" ❌ MongoDB connection error ", e)
        process.exit(1)
    }
}

export default connectDB  