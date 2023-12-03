import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export default async () => {
    try {
        mongoose.set('strictQuery', true);
        const conn = await mongoose.connect(process.env.MONGO);
        console.log('MongoDB Connected: ' + conn.connection.host);
    } catch (err) {
        console.log(err);
    }
};
