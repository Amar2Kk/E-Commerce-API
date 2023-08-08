import mongoose from "mongoose";

export const connectToDB = () => {
  mongoose.set('strictQuery', false);
  mongoose.connect(process.env.DB_CONNECTION)
  .then(() => console.log('Database connection established ✅\n'))
  .catch((err) => console.log('Database connection error ❗:', err))
}