import mongoose from 'mongoose';
import { exit } from 'node:process';

async function connectMongoDB() {
  try {
    await mongoose.connect('uri/example_nosql');
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    exit(1);
  }
}

export default connectMongoDB;
