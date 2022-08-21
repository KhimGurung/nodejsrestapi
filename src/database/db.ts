import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectionString: string = process.env.DB_URI!;

const connectDB = () => {
    const connectOptions: ConnectOptions = {    
        useNewUrlParser: true,
        autoIndex: true,
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    } as ConnectOptions;
    try{
        mongoose.connect(connectionString, connectOptions);
    }catch(error){
        console.log("error khim", error);
    }

    mongoose.connection
        .once('open', () => console.log('connected to MongoDB!'))
        .on('error', err => console.error('connecting to MongoDB ' + err));
 
}

export default connectDB;