import mongoose from 'mongoose';

export const connectToDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log('DataBase is connected');
  } catch (error) {
    console.log(error);
  }
};
