// Make connection to database
import mongoose, {Mongoose} from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// serverless~connect to db on every req or action so we gotta optimize that by caching our connections

let cached: MongooseConnection = (global as any).mongoose

if(!cached) {
    cached = (global as any).mongoose = {
        conn: null,
        promise: null
    }
}

export const connectToDB = async () => {
    //Everytime we connect to db we check if connection is already there
    if(cached.conn) return cached.conn

    if(!MONGODB_URL) throw new Error ("Missing MongoDB URL!")

    // If not then we make connection
    cached.promise = cached.promise || 
    mongoose.connect(MONGODB_URL,{
            dbName: "ImageinaryAI",
            bufferCommands: false
        })

    cached.conn = await cached.promise

    return cached.conn
}