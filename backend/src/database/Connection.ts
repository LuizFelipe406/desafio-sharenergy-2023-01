import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_DB_URL = 'mongodb://db:27017/Sharenergy';

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI
    || MONGO_DB_URL,
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;