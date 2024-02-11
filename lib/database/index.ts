import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI; 

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!MONGODB_URI) {
        throw new Error('MONGODB_URI is missing');
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName: 'evently',
            bufferCommands: false,
        }).then((mongoose) => {
            return mongoose;
        }).catch((error) => {
            // Handle initial connection errors here
            console.error('Initial MongoDB connection error:', error);
            cached.promise = null; // Reset the promise to allow retries
            throw error;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}